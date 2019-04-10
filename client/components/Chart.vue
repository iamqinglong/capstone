<template>
            <div _ngcontent-c8="" class="col-xl-4 col-lg-6 col-md-4 col-sm-6 ng-star-inserted" >
                <div _ngcontent-c8="" class="box-wrapper">
                    <div _ngcontent-c8="" _nghost-c10="" ng-reflect-id="1">
                        <div _ngcontent-c10="" class="row ng-star-inserted">
                        <div _ngcontent-c10="" class="box-title">
                            <h2 _ngcontent-c10="" title="Hall temperature"> {{dev.device_name}}</h2>
                            <p _ngcontent-c10="" title="Show Today Live Statistics">Show Today Live Statistics</p>
                        </div>
                        </div>
                        <div _ngcontent-c10="" class="d-flex widget-value ng-star-inserted">
                        <div _ngcontent-c10="" class="d-2 widget-lable">
                            <p _ngcontent-c10="">Current: </p>
                        </div>
                        <div _ngcontent-c10="" class="d-2 current-value" >
                            <p _ngcontent-c10="" v-bind:value="current" >{{current}}<sup _ngcontent-c10="">°C</sup></p>
                        </div>
                        </div>
                        <div class="containerMe" >
                            <highcharts  :options="chartOptions"  class="highcharts-container" ref="chart" :updateArgs="[false,false]"></highcharts>
                        </div>

                    
                        <div _ngcontent-c10="" class="row ng-star-inserted">
                        <div _ngcontent-c10="" class="d-flex st-bar">
                            <div _ngcontent-c10="" class="d-2 col-sm-4" >
                            10<sup _ngcontent-c10="">°</sup>
                            <p _ngcontent-c10="">Average</p>
                            </div>
                            <div _ngcontent-c10="" class="d-2 col-sm-4" >
                            10<sup _ngcontent-c10="">°</sup>
                            <p _ngcontent-c10="">Highest</p>
                            </div>
                            <div _ngcontent-c10="" class="d-2 col-sm-4" >
                            10<sup _ngcontent-c10="">°</sup>
                            <p _ngcontent-c10="">Lowest</p>
                            </div>
                        </div>                          
                    </div>
                    </div>
                </div>
            </div>
</template>

<style scoped="">
  .containerMe {
    height: 200px;
  }
</style>

<script>
import Vue from 'vue'
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
Vue.use(HighchartsVue);

// // import Vue from 'vue'
// import VueMqtt from 'vue-mqtt';
// Vue.use(VueMqtt, 'ws://localhost:8000');

// import mqtt from 'mqtt'
import style_ten from '@/static/css/style_ten.css'
import style_thirteen from '@/static/css/style_thirteen.css'


export default {
    props: ['dev'],
    components:{
        // highcharts: Chart 
    },
    data()
    {
        return {
            // client: mqtt.connect('ws:127.0.0.1:8000'),
            current: 10,
            chartOptions: {
            chart: {
                type: 'spline',
                marginRight: 10,
                backgroundColor: null,
                height: 200,
                events: {
                        load: function () 
                        {
                        }
                    }
            },
            time: {
                useUTC: false
            },
            credits: false,
            title: {
                text: null
            },
            yAxis: {
                visible: false
            },

            xAxis: {
                visible: false
            },
            plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            },
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
             series: [{
                    name: 'Random data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y:  Math.random() * 10,
                            });
                        }
                        return data;
                    }())
                }]
            },
        }
    },
    beforeCreate() 
    {
        
    
    },
    created()
    {
       
       
    },
    beforeMount() {
 
    },
    async mounted () {
        this.$mqtt = await this.$mqtt
        // this.load();
        this.$mqtt.subscribe(this.dev.data_source, 'Hello MQTT from NUXT')
        const series = this.$children[0].chart.series[0];
      
        // console.log(this.dev)
        // this.$mqtt.on('message', (topic, message,packet)  => {
        //     // message is Buffer
        //     console.log('Topic: ',topic)
        //     if(topic == this.dev.topic)
        //     {
        //         let msg = message.toString()
        //         this.test(msg)
        //         let time =  (new Date()).getTime();
        //         series.addPoint([time, parseInt(msg)],true,true);
        //     }
        //     // console.log('Message: ', message.toString())
        //     // this.current = parseInt(message);
        //     // let value = Math.random() * 10;
        //     // this.test(message.toString())
        // })
         // this.client.on('connect', function () {
        // //subscribe to listen to the channels in which arduinos will be publishing
        //     console.log('Connected successfully to MQTT Broker')
            
        // })    

        // this.client.subscribe(this.dev.data_source, () =>{
        //     console.log(
        //         `Successfully subscribe to ${this.dev.data_source}`
        //     )
        // })

        // this.client.on('message', (topic, message) => {
        //     console.log('Topic: ',topic,' Value: ',message)
        //     // if(topic == this.dev.topic)
        //     // {
        //         let msg = message.toString()
        //         this.test(msg)
        //         let time =  (new Date()).getTime();
        //         series.addPoint([time, parseInt(msg)],true,true);
            // }
            // console.log('Message: ', message.toString())
            // this.current = parseInt(message);
            // let value = Math.random() * 10;
            // this.test(message.toString())
            
        // })
        

    },
  
    computed: 
    {
       
    },
    watch: {
    
    },
    methods: {
            async load() 
            {
                const self = this;
                const series = this.$children[0].chart.series[0];
                setInterval(() =>{
                let time =  (new Date()).getTime();
                let value = Math.random() * 10;
                series.addPoint([time, value],true,true);
                this.current = value.toFixed(2);
                console.log(this.current)
                }, 1000);
            },
            test: function(value) {
                this.current = value;
            }
           
    },
    destroyed() {
        // this.$mqtt.unsubscribe(this.dev.topic)
        // this.$mqtt.end()
        // this.$forceUpdate();
        // this.client.end()
        this.$mqtt.unsubscribe(this.dev.data_source)
    },
}
</script>
