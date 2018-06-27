export default {
  install (Vue, options) {
    Vue.prototype.$base = {}

    let doc = document.documentElement // 获取屏幕尺寸
    let baseWidth = 750 // 设计图基准尺寸
    let baseFontSize = 100 // 基准字体大小

    let getSize = () => {
      let pageWidth = doc.clientWidth
      let pageHeight = doc.clientHeight
      doc.style.fontSize = pageWidth / baseWidth * baseFontSize + 'px'
      Vue.prototype.$base.pageWidth = pageWidth
      Vue.prototype.$base.pageHeight = pageHeight
    }

    getSize()

    window.onresize = () => {
      getSize()
    }

    const u = navigator.userAgent

    Vue.prototype.$base.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    Vue.prototype.$base.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    Vue.prototype.$base.isWeixin = !!u.match(/MicroMessenger/i)

    Vue.prototype.$bus = Vue.prototype.$bus || new Vue({data: {}})
    // 自定义title 用法 如<div v-title="'title'"></div>
    Vue.directive('title', {
      inserted (el, binding) {
        document.title = binding.value
      }
    })
  }
}
