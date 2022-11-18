<template>
  <div>
<div id=app></div>
	<script src=./crypto-js.js></script>
	<script src=./pad-pkcs7.js></script>


	<h1>AES加密解密测试</h1>

	<h2>AES加密 模式:ECB 填充:Pkcs7</h2>
	秘钥 &nbsp;<input id="key" type="text" style="width: 400px; height: 20px;" value="7bf749ebcf767632b9b63e40c26ff45d" />
	<br><br>

	<br>
	<input id="plain" type="text" style="width: 500px; height: 20px;" />
	<button type="button" @click="encryptText">加密</button>
	<input id="encrypted" type="text" style="width: 500px; height: 20px;" />
	<br>
	<br>
	<br>
	<input id="todecrypt" type="text" style="width: 500px; height: 20px;" />
	<button type="button" @click="decryptText">解密</button>
	<input id="decrypted" type="text" style="width: 500px; height: 20px;" />
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import { Encrypt, Decrypt } from "../../../plugins/secret"
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    encryptText() {
      var decryptKey = document.getElementById("key").value;
		  var plain = document.getElementById("plain").value;
		  console.log("plain: " + plain);
		  var encrypted = Encrypt(plain,decryptKey);
		  console.log("encrypted: " + encrypted);
		  document.getElementById("encrypted").value = encrypted;
    },
    decryptText() {
      var decryptKey = document.getElementById("key").value;
		  var encrypted = document.getElementById("todecrypt").value;
		  console.log("encrypted: " + encrypted);
		  var decrypted = Decrypt(encrypted,decryptKey);
		  console.log("decrypted: " + decrypted);
		  document.getElementById("decrypted").value = decrypted;
    },
    encrypt(text, key) {
      if (typeof text !== 'string') {
        text = JSON.stringify(text)
      }
      const _key = this.CryptoJS.enc.Utf8.parse(key)// token 只能16位
      const srcs = this.CryptoJS.enc.Utf8.parse(text)
      const encrypted = this.CryptoJS.AES.encrypt(srcs, _key, {
        mode : this.CryptoJS.mode.ECB,
        padding : this.CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
	  },
    decrypt(text) {
      var decryptKey = document.getElementById("key").value;
      if (typeof text !== 'string') {
        text = JSON.stringify(text)
      }
      const _key = CryptoJS.enc.Utf8.parse(decryptKey)
      const decrypt = CryptoJS.AES.decrypt(text, _key, {
        mode : CryptoJS.mode.ECB,
        padding : CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(decrypt).toString()
	  }
  }
}
</script>
