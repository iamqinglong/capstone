<template>
    <div>
        <div class="wrapper">
            <div class="container-fluid">

                <!-- Page-Title -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="btn-group pull-right">
                                <ol class="breadcrumb hide-phone p-0 m-0">
                                </ol>
                            </div>
                                <div>
                                    <!-- <label class="typo__label">Tagging</label>
                                    <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect> -->
                                     <!-- Form row -->
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card-box">
                                                <h4 class="m-t-0 header-title">Report general information</h4>
                                                <!-- <p class="text-muted m-b-30 font-13">
                                                    Here you can modify display name or other general information
                                                </p> -->
                                                <!-- <div class="col-md-4">
                                                <label class="typo__label">Select Device names: </label>
                                                <multiselect 
                                                v-model="valueDevices"  
                                                placeholder="Search a name" 
                                                label="name" 
                                                track-by="code" 
                                                :options="optionsDevices" 
                                                :multiple="true" ></multiselect>
                                                <pre class="language-json"><code>{{ valueDevices  }}</code></pre>
                                                </div>
                                                 <div class="col-md-4">
                                                <label class="typo__label">Filter by: </label>
                                                <multiselect  
                                                v-model="valueFilter" 
                                                :options="optionsFilter" 
                                                :searchable="false" 
                                                :close-on-select="false" 
                                                :show-labels="false" 
                                                placeholder="Pick a value"></multiselect>
                                                <pre class="language-json"><code>{{ valueFilter  }}</code></pre>
                                                </div> -->

                                                 <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Select Device names:</label>
                                                            <multiselect 
                                                            v-model="selectedDevices"  
                                                            placeholder="Search a name" 
                                                            label="name" 
                                                            track-by="code" 
                                                            :options="optionsDevices" 
                                                            :multiple="true" ></multiselect>
                                                            <!-- <pre class="language-json"><code>{{ valueDevices  }}</code></pre> -->
                                                            <small class="form-text text-danger" v-if="errors.selectedDevices">{{errors.selectedDevices}}</small>
                                                        </div>
                                                       
                                                        <div class="form-group col-md-3">
                                                            <label for="" class="col-form-label">Select Date Time Range:</label>
                                                           
                                                            <date-range-picker
                                                                    :opens="opens"
                                                                    :startDate="startDate"
                                                                    :endDate="endDate"
                                                                    @update="updateValues"
                                                                    :locale-data="{ firstDay: 0, format: 'MM-DD-YYYY HH:mm:ss' }"
                                                                    :minDate="minDate" :maxDate="maxDate"
                                                                    :singleDatePicker="false"
                                                                    :timePicker="true"
                                                                    :timePicker24Hour="true"
                                                                    :showWeekNumbers="false"
                                                                    :showDropdowns="false"
                                                                    :autoApply="false"
                                                                    v-model="dateRange"
                                                                    :ranges="ranges"
                                                            >
                                                                <div slot="input" slot-scope="picker" style="min-width: 350px;">
                                                                    {{ picker.startDate | date }} - {{ picker.endDate | date }}
                                                                </div>
                                                            </date-range-picker>
                                                            <small class="form-text text-danger" v-if="errors.invalidDate">{{errors.invalidDate}}</small>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <!-- <highcharts v-if="status" ref="lineCharts" :options="chartOptions"></highcharts> -->
                                                        <no-ssr>
                                                        <vue-highcharts v-if="status" :options="chartOptions" :highcharts="Highcharts" ref="lineCharts"></vue-highcharts>
                                                        </no-ssr>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end page title end breadcrumb -->
                </div> <!-- end container -->
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
// import 'client/node_modules/vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
import moment from 'moment'

// import Vue from 'vue'
// import HighchartsVue from 'highcharts-vue'
// import {Chart} from 'highcharts-vue'
// import VueHighcharts from "vue2-highcharts";
import Exporting from "highcharts/modules/exporting";
import Highcharts from "highcharts";
// Exporting(Highcharts);
// import Vue from "vue";
// import HighchartsVue from "highcharts-vue";
// Vue.use(HighchartsVue);
// import { Chart } from "highcharts-vue";
// import Highcharts from "highcharts";
// import exportingInit from "highcharts/modules/exporting";
// // import stockInit from "highcharts/modules/stock";
// import stockInit from 'highcharts/modules/stock'

// stockInit(Highcharts);
// exportingInit(Highcharts);
// Exporting(Highcharts);
export default {
    middleware: 'auth',
    components: {
    Multiselect,
    DateRangePicker,
    // highcharts: Chart,
    // VueHighcharts
  },
   filters: {
      date (value) {
        let options = {year: 'numeric', month: 'long', day: 'numeric'};
        return Intl.DateTimeFormat('en-US', options).format(value)
      }
    },
    data () {
        return {
            Highcharts: Highcharts,
            selectedDevices: [],
            statistics: [],
            status: false,
            opens: 'center',
            startDate: '2010-01-01',
            endDate: moment().endOf('year'),
            minDate: '2010-01-01',
            maxDate: moment().endOf('year').toString(),
            dateRange: {
                startDate: moment().startOf('day'),
                endDate: moment().endOf('day'),
            },
            ranges: { //default value for ranges object (if you set this to false ranges will no be rendered)
                    'Today': [moment().startOf('day'), moment().endOf('day')],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'This month': [moment().startOf('month'), moment().endOf('month')],
                    'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    'This year': [moment().startOf('year'), moment().endOf('year')],
                    'Last year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                    'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                    'This week': [moment().startOf('week'), moment().endOf('week')]
                },
            chartOptions: {
                chart: {
                    events: {
                        // load: function (e) {
                        //     // if( this.$refs.lineCharts.getChart().series.length > 0)
                        //     // {
                        //     //     this.$refs.lineCharts.getChart().series[0].update({ name: "New name." });
                        //     // }
                        //     // this.$refs.lineCharts
                        // },
                        load: this.updateLegendLabel,
                        redraw: this.updateLegendLabel
                    }
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        format: '{value:%Y-%b-%e %l:%M %p }'
                    },
                    tooltip: {
                        xDateFormat: '%Y-%m-%d',
                        shared: true
                    },
                    dateTimeLabelFormats: {
                        // millisecond: '%H:%M:%S.%L',
                        // second: '%H:%M:%S',
                        // minute: '%H:%M',
                        // hour: '%H:%M',
                        day: '%e. %b',
                        // week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y',
                        
                    }
                    // minRange: 14 * 24 * 3600000
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Reports'
                },
                legend: {
                    enabled: true,
                    labelFormatter: function() {
                            return this.name + '<br>' + '<br>Max: ' + '0.0' + '<br>Min: ' + '0.0' + '<br>Avg: ' + '0.0';
                        }
                },
                // exporting: {
                //     // allowHTML: true,
                //     chartOptions: {
                //     legend: {

                //             enabled: true,
                //             // labelFormatter: this.updateExportLegendLabel
                //             // labelFormatter: 
                //             // function() {
                //             //     return 'Test' + '<br>' + '<br>Max: ' + '0.0' + '<br>Min: ' + '0.0' + '<br>Avg: ' + '0.0';
                //             // }
                //         },
                        
                //     },
                //     chart: {
                //     events: {
                //         // load: function (e) {
                //         //     // if( this.$refs.lineCharts.getChart().series.length > 0)
                //         //     // {
                //         //     //     this.$refs.lineCharts.getChart().series[0].update({ name: "New name." });
                //         //     // }
                //         //     // this.$refs.lineCharts
                //         // },
                //         load: this.updateExportLegendLabel,
                //         redraw: this.updateExportLegendLabel
                //     }
                // },
                // },
                 exporting: { //the export button
                    // type: 'image/jpeg', 'pdf',
                    chartOptions: {
                        chart: {
                            events: {
                                load: function () {
                                    var chart = this;
                                    let index = 0;
                                    // console.log(chart.series.legendItem)
                                        $.each(chart.series,function(i,serie) {
                                            if(!serie.visible) {
                                                serie.update({
                                                    showInLegend:false
                                                });
                                            }
                                            // console.log(serie.legendItem)
                                            let legendItem = serie.legendItem
                                            var i = 0;
                                            var avg = (serie.dataMax + serie.dataMin) / 2
                                            const stat = [
                                                serie.dataMax,
                                                serie.dataMin,
                                                (serie.dataMax + serie.dataMin) / 2
                                            ];
                                            // console.log(avg)
                                            // for(int)
                                            // console.log(this.statistics)
                                            // // let stat = this.statistics[index++]
                                            // var stat = [
                                            //     max++,
                                            //     min++,
                                            //     avg++
                                            // ] ;
                                            console.log(stat.length)
                                            if(stat.length != 0 || stat != null)
                                            {
                                                const text = legendItem.textStr.replace(/-?\d+\.\d/g, () => stat[i++]);
                                                legendItem.attr({
                                                    text: text
                                                });
                                            }

                                        });
                                }
                                // load: this.updateExportLegendLabel
                            },
                            
                        },
                        legend: {

                            enabled: true,
                            labelFormatter: 
                            function() {
                                return this.name + '<br>' + '<br>Max: ' + '0.0' + '<br>Min: ' + '0.0' + '<br>Avg: ' + '0.0';
                            }
                        },
                        
                    
                    },
                    height: 400, width: 1387,
                    sourceWidth: 1387,
                    sourceHeight: 400,

                },
                series: [{
                        name: "Winter 2014-2015",
                        data: [
                            [Date.UTC(1970, 10, 25), 0],
                            [Date.UTC(1970, 11,  6), 0.25],
                            [Date.UTC(1970, 11, 20), 1.41],
                            [Date.UTC(1970, 11, 25), 1.64],
                            [Date.UTC(1971, 0,  4), 1.6],
                            [Date.UTC(1971, 0, 17), 2.55],
                            [Date.UTC(1971, 0, 24), 2.62],
                            [Date.UTC(1971, 1,  4), 2.5],
                            [Date.UTC(1971, 1, 14), 2.42],
                            [Date.UTC(1971, 2,  6), 2.74],
                            [Date.UTC(1971, 2, 14), 2.62],
                            [Date.UTC(1971, 2, 24), 2.6],
                            [Date.UTC(1971, 3,  1), 2.81],
                            [Date.UTC(1971, 3, 11), 2.63],
                            [Date.UTC(1971, 3, 27), 2.77],
                            [Date.UTC(1971, 4,  4), 2.68],
                            [Date.UTC(1971, 4,  9), 2.56],
                            [Date.UTC(1971, 4, 14), 2.39],
                            [Date.UTC(1971, 4, 19), 2.3],
                            [Date.UTC(1971, 5,  4), 2],
                            [Date.UTC(1971, 5,  9), 1.85],
                            [Date.UTC(1971, 5, 14), 1.49],
                            [Date.UTC(1971, 5, 19), 1.27],
                            [Date.UTC(1971, 5, 24), 0.99],
                            [Date.UTC(1971, 5, 29), 0.67],
                            [Date.UTC(1971, 6,  3), 0.18],
                            [Date.UTC(1971, 6,  4), 0]
                        ]
                    }],
                
            }
        }
  },
     async asyncData({store, $axios}) {
      await store.dispatch("notification/setUserMessagesRec")
      let res = await $axios.get('/api/getAllDevice')
      let optionsDevices = []
      res.data.forEach( async (element)=> {
          optionsDevices.push( { name: element.device_name, code: element.data_source } )
      })
      return { optionsDevices }
    },

    methods: {
        async updateTest(){
           this.series[0].update({ name: "New name." });
        },
        async updateLegendLabel()
        {   
            // Exporting(Highcharts);
            if(this.status == true)
            {
                let index = 0;
                if(this.$refs.lineCharts.getChart() != null)
                {
                    this.$refs.lineCharts.getChart().series.forEach( async (element) => {
                        let legendItem = element.legendItem
                        let i = 0
                        // console.log(this.statistics)
                        let stat = this.statistics[index++]
                        

                        if(stat.length != 0 || stat != null)
                        {
                            const text = legendItem.textStr.replace(/-?\d+\.\d/g, () => stat[i++]);
                            legendItem.attr({
                                text: text
                            });
                        }
                        // console.log(legendItem)
                    })
                }
                
                // this.$refs.lineCharts.getChart().legend.allItems[0].update({ name: "New name." });
                // this.legend.update({
                //     symbolWidth: 0,
                //     labelFormatter: function() {
                //             return this.name + '<br>' + '<br>Max: ' + '0.0' + '<br>Min: ' + '0.0' + '<br>Avg: ' + '0.0';
                //         }
                // });
            }
            
        },
        async updateExportLegendLabel()
        {   
            // console.log(this.$refs.lineCharts.getChart())
            // Exporting(Highcharts);
            // if(this.status == true)
            // {
            //     let index = 0;
            //     if(this.$refs.lineCharts.getChart() != null)
            //     {
            //         this.$refs.lineCharts.getChart().exportSVGElements.forEach( async (element) => {
            //             let legendItem = element.text
            //             console.log(legendItem)
            //             let i = 0
            //             console.log(this.statistics)
            //             let stat = this.statistics[index++]
                        

            //             if(stat.length != 0 || stat != null)
            //             {
            //                 const text = legendItem.textStr.replace(/-?\d+\.\d/g, () => stat[i++]);
            //                 legendItem.attr({
            //                     text: text
            //                 });
            //             }
                        
            //         })
            //         return
            //     }
               
            // }
            // load: function () {
            //                         var chart = this;
            //                         let index = 0;
            //                         // console.log(chart.series.legendItem)
            //                             $.each(chart.series,function(i,serie) {
            //                                 if(!serie.visible) {
            //                                     serie.update({
            //                                         showInLegend:false
            //                                     });
            //                                 }
            //                                 console.log(serie.legendItem)
            //                                 let legendItem = serie.legendItem
            //                                 var i = 0
            //                                 console.log(this.statistics)
            //                                 // let stat = this.statistics[index++]
                                            

            //                                 // if(stat.length != 0 || stat != null)
            //                                 // {
            //                                 //     const text = legendItem.textStr.replace(/-?\d+\.\d/g, () => stat[i++]);
            //                                 //     legendItem.attr({
            //                                 //         text: text
            //                                 //     });
            //                                 // }

            //                             });
            //                     }
            
        },
       async updateValues (values) {
            // console.log(this.selectedDevices, this.dateRange)
            this.startDate = values.startDate.toISOString().slice(0, 10)
            this.endDate = values.endDate.toISOString().slice(0, 10)
            
            let topics = []
            if(this.selectedDevices.length != 0)
            {
                console.log(this.selectedDevices)
                this.selectedDevices.forEach( async(element) => {
                    topics.push(element.code)
                })
            }
            else
            {
                this.$store.dispatch("validation/setErrors", {selectedDevices : `Please select a device/s`})
                return
            }
            

            if(this.dateRange.endDate.getTime() > this.dateRange.startDate.getTime())
            {
                this.statistics = []
                this.status = true;
                let result = await this.$axios.post('/api/getByTopic', 
                {   topics: topics, 
                    from: this.dateRange.startDate.toISOString(), 
                    to: this.dateRange.endDate.toISOString()
                })
                Exporting(Highcharts);

                if(result.data != null || result.data.length != 0)
                {
                    this.$refs.lineCharts.removeSeries()
                    result.data.forEach(async(element) => {
                       let index  = this.selectedDevices.findIndex(x => x.code === element._id);
                       let name = this.selectedDevices[index].name
                       this.statistics.push([
                            element.max,
                            element.min,
                            element.avg
                        ] );
                        this.$refs.lineCharts.addSeries({name : name, data : element.reading})
                        
                        
                        // this.updateLegendLabel()
                    })
                        // console.log(this.$refs.lineCharts.getChart())
                        // this.updateLegendLabel()
                }
            }
            else{
                this.$store.dispatch("validation/setErrors", {invalidDate : `Invalid Date Time Range value`})
            }
           
        }
        
    },
    watch: {
        async value (){
        }
    },
    destroyed() {
        
        this.$store.dispatch("validation/clearErrors")

    },
    mounted() {
        
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
body {
    // background: #323b44;
    //     background-color: rgb(50, 59, 68);
    // margin: 0;
    // color: #98a6ad;
    // overflow-x: hidden !important;
    // font-size: 0.95rem;
    // font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    padding-bottom: 255px;
}

.daterangepicker .ranges li.active, .daterangepicker .ranges li:hover {

    background-color: #41b883;
    border: 1px solid #b2b3b4;

}

.daterangepicker .ranges li {

    border-radius: 2px;
    color: #5f5858;
    font-weight: 600;
    background-color: #fff;

}

.daterangepicker {

    color: #534a4a;
    font-size: 15px;
    line-height: 1em;

}
.form-control {
    height: calc(1.5em + 0.75rem + 7px);
}
</style>

