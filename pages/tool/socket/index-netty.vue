<template>
  <div>
    <p>Netty 协同</p>
    在线用户列表:
    <div v-for="online in onlineUserList" :key="online.cId">
      {{ online.userId }}
    </div>
    <br>
    案件编号:<a-input v-model="currentRoomInfo.roomId"></a-input>
    用户编号:<a-input v-model="currentRoomInfo.userId"></a-input>
    <a-button @click="openWebSocket">建立连接</a-button>
    <a-button @click="closeWebSocket">断开连接</a-button>
    <a-button @click="joinRoom">加入房间</a-button>
    <p>***************************编辑区域******************************</p>
    交易内容:
    <span v-if="transRecord.transContent.currentUser.length > 0" >{{ transRecord.transContent.currentUser }}</span>
    <a-input
      v-model="transRecord.transContent.columnValue"
      @blur="blurColumn('transContent')"
      @focus="focusColumn('transContent')"
      :disabled="transRecord.transContent.editState == 'LOCKING' && !transRecord.transContent.currentUser.includes(currentRoomInfo.userId)" />
    交易描述:<a-input v-model="transRecord.transDesc.columnValue"></a-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnDtoList: [
        {
          columnKey: '',
          columnValue: '',
          editState: "NO_LOCKED",
          currentUser: []
        }
      ],
      onlineUserList: [],
      currentRoomInfo: {
        eventType: "INIT_ROOM",
        roomId: "RC001",
        roomType: "COMPANY_REG",
        userId: "1001"
      },
      messageDto: {
        eventType: "LOCKING_COLUMN",
        roomType: '',
        roomId: '',
        messageBody: {}
      },
      columnDto: {
        columnKey: '',
        columnValue: {},
        editState: "NO_LOCKED",
        currentUser: []
      },
      transRecord: {
        transContent: {
          columnKey: "transContent",
          columnValue: "",
          editState: "NO_LOCKED",
          currentUser: []
        },
        transDesc: {
          columnKey: "transDesc",
          columnValue: "",
          editState: "NO_LOCKED",
          currentUser: []
        },
      }
    }
  },
  mounted() {

  },
  methods: {
    openWebSocket() {
      this.websocket = new WebSocket(
        `ws://localhost:12345/ws`
      );
      this.initWebSocket();
    },
    joinRoom() {
      this.websocket = new WebSocket(
        `ws://localhost:12345/ws`
      );
      this.currentRoomInfo.eventType = "JOIN_ROOM"
      this.initWebSocket();
    },
    // 释放
    blurColumn(val) {
      console.log(val);
      this.columnDto = this.transRecord[val]
      this.columnDto.currentUser = this.columnDto.currentUser.filter((i) => {
        return i != this.currentRoomInfo.userId
      })
      this.columnDto.editState = "NO_LOCKED"
      this.messageDto.eventType = "RELEASE_COLUMN"
      this.messageDto.roomId = this.currentRoomInfo.roomId
      this.messageDto.roomType = this.currentRoomInfo.roomType,
      this.messageDto.messageBody = this.columnDto
      console.log(this.messageDto);
      this.websocket.send(JSON.stringify(this.messageDto))
    },
    // 锁定
    focusColumn(val) {
      console.log(val);
      this.columnDto = this.transRecord[val]
      this.columnDto.currentUser.push(this.currentRoomInfo.userId)
      this.columnDto.editState = "LOCKING"
      this.messageDto.eventType = "LOCKING_COLUMN",
      this.messageDto.roomId = this.currentRoomInfo.roomId,
      this.messageDto.roomType = this.currentRoomInfo.roomType,
      this.messageDto.messageBody = this.columnDto
      console.log(this.messageDto);
      this.websocket.send(JSON.stringify(this.messageDto))
    },
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage;

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage;

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage;

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage;

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload;
    },
    beforeDestroy() {
      this.onbeforeunload();
    },
    setOnmessageMessage(event) {
      // console.log(event)
      const { eventType, messageBody } = JSON.parse(event.data)
      console.log(eventType)
      console.log(messageBody)
      switch(eventType) {
        case "INIT_ROOM":
          this.onlineUserList.push(messageBody);
          break;
        case "JOIN_ROOM":
          this.onlineUserList = messageBody;
          break;
        case "EXIT_ROOM":
          this.onlineUserList = messageBody;
          break;
        case "LOCKING_COLUMN":
          this.columnDto = messageBody;
          this.transRecord[this.columnDto.columnKey] = messageBody
          break;
        case "RELEASE_COLUMN":
          this.columnDto = messageBody;
          this.transRecord[this.columnDto.columnKey] = messageBody
          break;
        case "INIT_COLUMN":
          this.columnDtoList = messageBody;
          this.columnDtoList.forEach((item) => {
            this.transRecord[item.columnKey] = item
          })
      }
    },
    setErrorMessage() {
      console.log("WebSocket连接发生错误-状态码：" + this.websocket.readyState);
    },
    setOnopenMessage() {
      console.log("WebSocket连接成功-状态码：" + this.websocket.readyState);
      this.websocket.send(JSON.stringify(this.currentRoomInfo))
    },
    setOncloseMessage() {
      alert("已断开连接");
      console.log("WebSocket连接关闭-状态码：" + this.websocket.readyState);

    },
    onbeforeunload() {
      this.closeWebSocket();
    },
    closeWebSocket() {
      // console.log();
      this.currentRoomInfo.eventType = "EXIT_ROOM"
      this.websocket.send(JSON.stringify(this.currentRoomInfo))
      this.websocket.close();
      // websocket.onclonse()
    },
  }
}
</script>
