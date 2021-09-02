module.exports = {
  dev: {
    NODE_ENV: 'devlopment',
    baseURL: '',
    authURL: '//localhost:7000',
    uploadURL: 'localhost:9999/sys-server/api/upload/uploadImage',
    webSocketURL: 'ws://localhost:9999/sys-server/api/push/websocket'
  },
  prod: {
    NODE_ENV: 'production',
    baseURL: '',
    authURL: '//login.fusheng.xyz:7000',
    uploadURL: '47.111.158.6:9999/sys-server/api/upload/uploadImage',
    webSocketURL: 'ws://47.111.158.6:9999/sys-server/api/push/websocket'
  }
}
