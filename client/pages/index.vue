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
                                <div class="row">
                                    <chart v-for="(device) in devices" 
                                    :key="device._id"
                                    :dev="device"
                                    > </chart>
                                </div>
                        </div>
                    </div>
                </div>
                <!-- end page title end breadcrumb -->
            </div> <!-- end container -->
      </div>
      <!-- Footer -->
      <footer class="footer">
          <div class="container">
              <div class="row">
                  <div class="col-12 text-center">
                      2016 - 2018 © Minton - Coderthemes.com
                  </div>
              </div>
          </div>
      </footer>
      <!-- End Footer -->
  	
  	</div>
</template>

<script >
import Chart from '@/components/Chart.vue'
export default {
    components: {
        chart: Chart
    },
    data() {
        return {
            // devices :{}
        //    devices: {
        //             key1: {
        //                     title: 'Temperature 1',
        //                     topic: '/temp1',
        //                     location: 'Tanker 1'
        //                 },
        //             key2: {
        //                     title: 'Temperature 2',
        //                     topic: '/temp2',
        //                     location: 'Tanker 2'
        //                 },
                    
        //         }
        }
    },
    async asyncData ({ params, error, $axios }) {

        return $axios.get('/getAllDevice')

        .then((res) => {
            // console.log(res.data)
            return { devices : res.data}

        })
        .catch((e) => {
            
            console.log(e)

        })
    },
    async mounted() {
      
       // this.$mqtt = await this.$mqtt
       //  console.log('Mounted')
    },
}
</script>