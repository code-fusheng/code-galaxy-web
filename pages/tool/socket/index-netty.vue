<template>
  <div>
    <p>Netty 协同</p>
    <br>
    案件编号:<a-input v-model="currentRoomInfo.roomNo"></a-input>
    用户编号:<a-input v-model="currentRoomInfo.userId"></a-input>
    <a-button @click="openWebSocket">建立连接</a-button>
    <a-button @click="closeWebSocket">断开连接</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoomInfo: {
        roomNo: "RC001",
        userId: "zh"
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
      console.log(event)
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
      this.websocket.close();
      // websocket.onclonse()
    },
  }
}
</script>
