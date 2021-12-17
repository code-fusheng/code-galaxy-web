<template>
    <div class="forum-container">
        社区论坛
        <div v-for="(item, index) in code" :key="index">{{ item }}</div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      code:  [ "09 科学仪器", "15 乐器", "16 办公用品", "28 健身器材", "41 教育娱乐" ]
    }
  }
}
</script>
