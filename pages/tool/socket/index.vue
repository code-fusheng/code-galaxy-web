<template>
  <div>
    <router-link to="/tool/socket/index-netty">
      <a-button>协同-Netty</a-button>
    </router-link>
    <p>协同编辑-在线用户</p>
    <span v-for="userItem in roomObj.userList" :key="userItem.userId">{{ userItem.userId }}</span>
    <br />
    <br />案件编号:
    <a-input v-model="caseNo"></a-input>用户编号:
    <a-input v-model="userId"></a-input>
    <a-button @click="openWebSocket">建立连接</a-button>
    <a-button @click="closeWebSocket">断开连接</a-button>
    <br />字段1:
    <a-input
      v-model="editObj.column1"
      @blur="blurColumn('column1')"
      @focus="focusColumn('column1')"
    ></a-input>字段2:
    <a-input
      v-model="editObj.column2"
      @blur="blurColumn('column2')"
      @focus="focusColumn('column2')"
    ></a-input>字段3:
    <a-input
      v-model="editObj.column3"
      @blur="blurColumn('column3')"
      @focus="focusColumn('column3')"
    ></a-input>字段4:
    <a-input
      v-model="editObj.column4"
      @blur="blurColumn('column4')"
      @focus="focusColumn('column4')"
    ></a-input>字段5:
    <a-input
      v-model="editObj.column5"
      @blur="blurColumn('column5')"
      @focus="focusColumn('column5')"
    ></a-input>字段6:
    <a-input
      v-model="editObj.column6"
      @blur="blurColumn('column6')"
      @focus="focusColumn('column6')"
    ></a-input>
    {{ roomObj }}
  </div>
</template>

<script>
import env from "@/env";
import Axios from 'axios'
export default {
  data() {
    return {
      roomObj: {
        userList: [
          {
            userId: "zh",
          },
        ]
      },
      caseNo: "RC001",
      userId: "zh",
      editObj: {
        column1: '1',
        column2: '2',
        column3: '3',
        column4: '4',
        column5: '5',
        column6: '6'
      }
    };
  },
  watch: {},
  mounted() {},
  methods: {
    syncRoom() {
      let sendRoomObj = {
        userList: this.userList,
        caseNo: this.caseNo,
        editObj: this.editObj
      };
      let config = {
        method: 'post',
        url: 'http://localhost:10002/websocket/sync',
        headers: {
          'Content-Type': 'application/json'
        },
        data : sendRoomObj
      };
      Axios(config).then(res => {
        // console.log(res)
      })
    },
    blurColumn(val) {
      // console.log(val);
      this.syncRoom();
    },
    focusColumn(val) {
      // console.log(val);
      this.syncRoom();
    },
    openWebSocket() {
      // websocket 连接
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(
          `ws://localhost:10002/push/websocket?caseNo=${this.caseNo}&userId=${this.userId}`
        );
        // alert("连接成功");
        this.initWebSocket();
      } else {
        // alert("当前浏览器不支持");
      }
    },
    setOnmessageMessage(event) {
      let roomObj = event.data.replace("\\", "");
      this.roomObj = JSON.parse(roomObj);
      let { column1, column2, column3, column4, column5, column6 } = this.roomObj.editObj
      this.editObj = {
        column1: column1,
        column2: column2,
        column3: column3,
        column4: column4,
        column5: column5,
        column6: column6,
      }
      // this.editObj = editObj
      // this.editObj = editObj
      // console.log('xxxx' + editObj)
    },
    beforeDestroy() {
      this.onbeforeunload();
    },
    setErrorMessage() {
      console.log("WebSocket连接发生错误-状态码：" + this.websocket.readyState);
    },
    setOnopenMessage() {
      console.log("WebSocket连接成功-状态码：" + this.websocket.readyState);
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
      this.websocket.close();
      // websocket.onclonse()
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
  },
};
</script>


