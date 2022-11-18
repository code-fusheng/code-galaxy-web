<template>
  <div>
    <!-- 协同编辑页 -->
    <div class="online-edit-container">
      <span :style="{fontSize: '44px', marginLeft: '55px', lineHeight: '120px'}">工商注册</span>
      <a-card class="edit-card">
        <h1>审核未通过</h1>
      </a-card>
    </div>


    <p>Netty-Socket-GS</p>
    房间信息: {{ messageDto2S.roomId }}
    案件编号:<a-input v-model="caseDetailDto.caseNo.columnValue" />
    <br>
    在线用户列表:
    <span v-for="online in onlineUserList" :key="online.cId">
      {{ online.cid }}
    </span>
    <p>用户信息</p>
    cid:<a-input disabled v-model="currentOnlineUser.cid" />
    编号:<a-input v-model="currentOnlineUser.userId" />
    手机:<a-input v-model="currentOnlineUser.username" />
    姓名:<a-input v-model="currentOnlineUser.nickName" />
    <br>
    <hr>
    <p>案件信息</p>
    <!-- 案件编号:
    <span v-if="caseDetailDto.caseNo.currentEditUser.length > 0" >{{ caseDetailDto.caseNo.currentEditUser }}</span>
    <a-input
      v-model="caseDetailDto.caseNo.columnValue"
      @focus="focusColumn(caseDetailDto.caseNo.columnKey)"
      @blur="blurColumn(caseDetailDto.caseNo.columnKey)"
      :disabled="caseDetailDto.caseNo.editState == 'LOCKED' && !caseDetailDto.caseNo.currentEditUser.includes(currentOnlineUser.cid)"
    />
    业务类型:<a-input v-model="caseDetailDto.businessType.columnValue" />
    注册地区:<a-input v-model="caseDetailDto.regArea.columnValue" />
    组织类型:<a-input v-model="caseDetailDto.companyKind.columnValue" /> -->

    <div v-for="item in caseDetailDto" :key="item.columnKey">
      {{ item.columnKey }}:
      <a-input
        v-model="item.columnValue"
        @focus="focusColumn(item.columnKey)"
        @blur="blurColumn(item.columnKey)"
        :disabled="item.editState == 'LOCKED' && !item.currentEditUser.includes(currentOnlineUser.cid)"
      />
    </div>

    <br>
    <a-button @click="initRoom">分享案件</a-button>
    <a-button @click="joinRoom">加入房间</a-button>
    <a-button @click="exitRoom">退出房间</a-button>
    <a-button @click="saveCase">保存案件</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 在线用户列表
      onlineUserList: [],
      currentOnlineUser: {
        cid: "",
        userId: "1377040646879694850",
        username: "15115726712",
        nickName: "浮生",
        userRole: ""
      },
      // to Server 消息体
      messageDto2S: {
        eventType: "",
        roomId: "",
        roomType: "",
        messageBody: {},
        onlineUser: {}
      },
      columnDto: {
        columnKey: '',
        columnValue: {},
        editState: "NO_LOCKED",
        currentEditUser: []
      },
      columnDtoList: [
        {
          columnKey: '',
          columnValue: '',
          editState: "NO_LOCKED",
          currentEditUser: []
        }
      ],
      // 当前页面渲染数据结构
      caseDetailDto: {
        caseNo: {
          columnKey: "caseNo",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        businessType: {
          columnKey: "businessType",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        regArea: {
          columnKey: "regArea",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        companyKind: {
          columnKey: "companyKind",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        regAmount: {
          columnKey: "regAmount",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        amountUnit: {
          columnKey: "amountUnit",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        nameKey1: {
          columnKey: "nameKey1",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        nameKey2: {
          columnKey: "nameKey2",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        nameKey3: {
          columnKey: "nameKey3",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        nameKey4: {
          columnKey: "nameKey4",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        nameBaks: {
          columnKey: "nameBaks",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        nameStructure: {
          columnKey: "nameStructure",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        companyName: {
          columnKey: "companyName",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        regAddress: {
          columnKey: "regAddress",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        contactPerson: {
          columnKey: "contactPerson",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        contactPhone: {
          columnKey: "contactPhone",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
        contactEmail: {
          columnKey: "contactEmail",
          columnValue: "",
          editState: "NO_LOCKED",
          currentEditUser: []
        },
      }
    }
  },
  methods: {
    initRoom() {
      this.websocket = new WebSocket(
        `ws://localhost:12345/ws`
      );
      this.messageDto2S.eventType = "INIT_ROOM";
      this.messageDto2S.roomId = this.caseDetailDto.caseNo.columnValue;
      this.messageDto2S.roomType = "COMPANY_REG";
      this.messageDto2S.onlineUser = this.currentOnlineUser
      this.initWebSocket();
    },
    joinRoom() {
      this.websocket = new WebSocket(
        `ws://localhost:12345/ws`
      );
      this.messageDto2S.eventType = "JOIN_ROOM";
      this.messageDto2S.roomId = this.caseDetailDto.caseNo.columnValue;
      this.messageDto2S.roomType = "COMPANY_REG";
      this.messageDto2S.onlineUser = {};
      this.initWebSocket();
    },
    exitRoom() {
      this.closeWebSocket();
    },
    // 锁定字段
    focusColumn(val) {
      this.columnDto = this.caseDetailDto[val]
      this.columnDto.currentEditUser.push(this.currentOnlineUser.cid)
      this.columnDto.editState = "LOCKED";
      this.messageDto2S.eventType = "LOCK_COLUMN";
      let columnDtoList = [];
      columnDtoList.push(this.columnDto);
      this.messageDto2S.messageBody = columnDtoList;
      this.websocket.send(JSON.stringify(this.messageDto2S))
    },
    // 释放字段
    blurColumn(val) {
      this.columnDto = this.caseDetailDto[val]
      this.columnDto.currentEditUser = this.columnDto.currentEditUser.filter((item) => {
        return item != this.currentOnlineUser.cid
      })
      this.columnDto.editState = "UNLOCK";
      this.messageDto2S.eventType = "RELEASE_COLUMN";
      let columnDtoList = [];
      columnDtoList.push(this.columnDto);
      this.messageDto2S.messageBody = columnDtoList;
      this.websocket.send(JSON.stringify(this.messageDto2S))
    },
    saveCase(){},
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
    // 接收处理消息
    setOnmessageMessage(event) {
      const { eventType, roomId, messageBody, onlineUser } = JSON.parse(event.data)
      console.log(eventType)
      console.log(roomId)
      console.log(messageBody)
      switch(eventType) {
        case "INIT_ROOM":
          this.messageDto2S.roomId = roomId;
          this.onlineUserList = messageBody;
          break;
        case "JOIN_ROOM":
          this.onlineUserList = messageBody;
          break;
        case "EXIT_ROOM":
          this.onlineUserList = messageBody;
          break;
        case "INIT_COLUMN":
          this.columnDtoList = messageBody;
          this.columnDtoList.forEach((item) => {
            this.caseDetailDto[item.columnKey] = item
          })
          this.currentOnlineUser = onlineUser;
          break;
        case "LOCK_COLUMN":
          this.columnDtoList = messageBody;
          this.columnDtoList.forEach((item) => {
            this.caseDetailDto[item.columnKey] = item
          })
          break;
        case "RELEASE_COLUMN":
          this.columnDtoList = messageBody;
          this.columnDtoList.forEach((item) => {
            this.caseDetailDto[item.columnKey] = item
          })
          break;
      }
    },
    setErrorMessage() {
      console.log("WebSocket连接发生错误-状态码：" + this.websocket.readyState);
    },
    setOnopenMessage() {
      console.log("WebSocket连接成功-状态码：" + this.websocket.readyState);
      this.websocket.send(JSON.stringify(this.messageDto2S))
    },
    setOncloseMessage() {
      console.log("WebSocket连接关闭-状态码：" + this.websocket.readyState);
    },
    onbeforeunload() {
      this.closeWebSocket();
    },
    beforeDestroy() {
      this.onbeforeunload();
    },
    closeWebSocket() {
      this.messageDto2S.eventType = "EXIT_ROOM"
      this.websocket.send(JSON.stringify(this.messageDto2S))
      this.websocket.close();
    },
  }
}
</script>

<style scoped>
.edit-card {
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
}
</style>
