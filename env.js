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
    uploadURL: '42.192.222.62:9999/sys-server/api/upload/uploadImage',
    webSocketURL: 'ws://42.192.222.62:9999/sys-server/api/push/websocket'
  }
}
