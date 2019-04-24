import Vue from 'vue';
import VueMqtt from 'vue-mqtt';


if (process.browser) {
    const ip = require('ip')
    console.log(ip.address())
    // Vue.use(VueMqtt, `ws://${ip.address()}:8000`);
   Vue.use(VueMqtt, `ws://192.168.1.99:8000`);
    // Vue.use(VueMqtt, 'ws://localhost:8000');
}



// // import Vue from 'vue'
// // let add = ip.address()
// // console.log(add)
// // // if (process.browser) {
  
// //   const mqtt = require('vue-mqttsocket').default
// //   Vue.use(mqtt, {uri: `ws://${add}:8000/mqtt`})
// // // }
// import VueMqtt from 'vue-mqtt';
// import ip from 'ip';
// Vue.use(VueMqtt, `ws://${ip.address()}:8000`, {clientId: 'WebClient-' + parseInt(Math.random() * 100000)});