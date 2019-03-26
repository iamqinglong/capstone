import Vue from 'vue'
import VueMqtt from 'vue-mqtt';
if (process.browser) {
  // const mqtt = require('vue-mqttsocket').default
  // Vue.use(mqtt, {uri: 'ws://localhost:8000/mqtt'})
    
    Vue.use(VueMqtt, 'ws://localhost:8000');
}