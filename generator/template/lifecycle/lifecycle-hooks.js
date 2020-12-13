import Vue from 'vue'
import axiosInterceptor from '/path/to/sub-auth/axios-interceputer-auth'

export function render(props = {}, component) {
  const { container } = props

  axiosInterceptor(props.reLogin, props.getToken)
  
  let instance = new Vue({
    render: h =>
      h(component, {
        props: {
          mainRouter: props.router,
        },
      }),
  }).$mount(container ? container.querySelector('#app') : '#app')

  return instance
}

let App = null
let instance = null

export function setApp(app) {
  App = app
  if (!window.__POWERED_BY_QIANKUN__) {
    instance = render({}, app)
  }
}

export async function bootstrap() {
  //    页面初始化
}

export async function mount(props) {
  //   页面加载
  instance = render(props, App)
}

export async function unmount() {
  //    页面卸载
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
