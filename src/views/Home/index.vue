<!-- 主页 -->
<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <v-icon name="beer" />
  </div>
</template>

<script>
import homeApi from '@/api/home'
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},

  watch: {},

  methods: {
    getHome() {
      homeApi.getHome().then(res => {
        console.log(res)
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getHome()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
