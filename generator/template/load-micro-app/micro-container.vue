<template>
    <div :ref="name"/>
</template>

<script>
import { loadMicroApp } from 'qiankun';

/**
 * 'path/to/auth' 需替换为主应用中，导出reLogin/getToken的文件
 */
import { reLogin, getToken } from 'path/to/auth';

let microApp = null;

export default {
    props: {

      /**
       * 微应用，名字（同时用作锚点）
       */
      name: {
        type: String,
        default: '',
      },

      /**
       * 微应用，服务路径
       */
      entry: {
        type: String,
        default: '',
      },

      /**
       * 主应用，重登陆函数
       */
      reLogin: {
        type: Function,
        default: () => {},
      },

      /**
       * 主应用，获取token函数
       */
      getToken: {
        type: Function,
        default: () => {},
      },
    },
    updated () {
        microApp.update();
    },
    mounted () {
        microApp = loadMicroApp(
            { 
                name: this.name,
                entry: this.entry,
                container: this.$refs[this.name],
                props: { reLogin: this.reLogin, getToken: this.getToken, router: this.$router }
            }
        );
    },
    beforeDestroy () {
        microApp.unmount();
    }
};
</script>