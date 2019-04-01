import Vue from 'vue'
import VueMqtt from 'vue-mqtt';
if (process.browser) {
    
    Vue.use(VueMqtt, 'ws://localhost:8000');
}