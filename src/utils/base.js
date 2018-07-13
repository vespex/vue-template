export default {
  install (Vue, options) {
    Vue.prototype.$base = {}

    const doc = document.documentElement // 获取屏幕尺寸
    const baseWidth = 750 // 设计图基准尺寸
    const baseFontSize = 100 // 基准字体大小

    const getSize = () => {
      const clientWidth = doc.clientWidth
      const clientHeight = doc.clientHeight
      doc.style.fontSize = clientWidth / baseWidth * baseFontSize + 'px'
      Vue.prototype.$base.clientWidth = clientWidth
      Vue.prototype.$base.clientHeight = clientHeight
      Vue.prototype.$base.pageHeight = doc.offsetHeight
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
      update (el, binding) {
        document.title = binding.value
      }
    })

    let posy = 0
    Vue.directive('scroll', {
      bind (el, binding) {
        posy = binding.value
        el.onclick = (e) => {
          e.preventDefault()
          if (typeof posy === 'number') {
            if (typeof window.scrollY === 'number') {
              let now = window.scrollY
              let step = (now - posy) / 15
              let timer = setInterval(() => {
                now -= step
                let isOver = step > 0 ? now <= posy : now >= posy
                if (isOver) {
                  now = posy
                  clearInterval(timer)
                }
                window.scrollTo(0, now)
              }, 17)
            } else {
              window.scrollTo(0, posy)
            }
          } else {
            window.scrollTo(0, 0)
          }
        }
      },
      update (el, binding) {
        posy = binding.value
      },
      unbind (el, binding) {
        posy = null
        el.onclick = null
      }
    })
  }
}

const verifyRule = {
  mobile (val) {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)
  }
}

export function verify (type, val) {
  return (typeof verifyRule[type] === 'function') && verifyRule[type](val)
}
