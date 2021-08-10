<template>
  <div>
    文章内容详情页 {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  // 校验参数值

  // 查询数据
  asyncData({ params }) {
    const id = params.id
    console.log(id)
  }
}
</script>
