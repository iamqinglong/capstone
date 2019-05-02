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
                                    <div class="col-lg-12">
                                    <div class="card-box">
                                        <div>
                                        <h4 class="m-t-0 header-title">Devices</h4>
                                        <p class="text-muted font-14 m-b-20">
                                           List of Devices
                                        </p>
                                        <div >
                                          <nuxt-link to="/devices/create">
                                            <button type="button" class="btn btn-primary waves-effect waves-light">Connect a new device</button>
                                          </nuxt-link> 
                                        </div>
                                        </div>
                                        <table class="table">
                                            <thead class="thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Device Name</th>
                                                <th>Device ID</th>
                                                <th>Location</th>
                                                <th>Symbol</th>
                                                <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Actions" style="width: 223.2px;">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(device, index) in devices" :key="device._id">
                                                <th scope="row">{{index + 1}}</th>
                                                <td>{{device.device_name}}</td>
                                                <td>{{device.data_source}}</td>
                                                <td>{{device.location}}</td>
                                                <td>{{device.symbol}}</td>
                                                 <td class="actions">
                                                    <nuxt-link :to="'/devices/' + device._id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link>
                                                    <!-- <nuxt-link :to="'/devices/delete/' + device._id" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></nuxt-link> -->
                                                    <a  @click.prevent="deleteDevice(device._id)" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></a>
                                                    <nuxt-link :to="'/devices/manage/' + device._id" href="" class="hidden on-editing cancel-row" v-b-tooltip.hover title="Manage"><i class="mdi mdi-av-timer"></i></nuxt-link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>      
                                </div>
                        </div>
                    </div>
                </div>
                <!-- end page title end breadcrumb -->
            </div> <!-- end container -->
      </div>
      <!-- Footer -->
      <!-- <footer class="footer">
          <div class="container">
              <div class="row">
                  <div class="col-12 text-center">
                       © Capstone Project
                  </div>
              </div>
          </div>
      </footer> -->
      <!-- End Footer -->
  	
  	</div>
</template>

<script>
// import { mapGetters } from 'vuex';
import Devices from '@/components/Devices.vue'
// import style_devices from '@/static/css/style_device.css'
import style_ten from '@/static/css/style_ten.css'
import style_thirteen from '@/static/css/style_thirteen.css'

// import axios from 'axios'

export default {
  middleware: 'auth',
  components:{
      Devices
  },
  computed: {
    // ...mapGetters(['loggedInUser']),
  },
   async asyncData ({ params, error , $axios, store}) {
    //    await store.dispatch("notification/setUserMessagesRec")
        return await $axios.get('/api/getAllDevice')

    .then((res) => {
        return { devices : res.data}

    })
    .catch((e) => {
        
        this.$swal.fire({
                                title: 'Error!',
                                text: `${e.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })

    })
    },
    async mounted() {

        // this.$mqtt = await this.$mqtt
        // this.$mqtt.subscribe('/notification')
        // this.$mqtt.on('message', async (topic, message,packet)  => {
            
        //     if(topic === '/notification')
        //     {
        //         let msg = JSON.parse( message.toString('utf8') )
        //         await this.$store.dispatch("notification/setUserMessagesRec")

        //         this.$izitoast.warning({
        //                             title: 'Caution',
        //                             message: `${msg[0].subject}`,
                                    
        //                                 closeOnClick: true,
        //                                 onClosing: function(instance, toast, closedBy) {
        //                                 console.info("Closing | closedBy: " + closedBy);
        //                                 },
        //                                 onClosed: function(instance, toast, closedBy) {
        //                                 console.info("Closed | closedBy: " + closedBy);
        //                                 }
        //                             })

        //     }
            
        // })
    },
    methods: {
         async deleteDevice (id){
            try {
               
              
                 const {value: result}  = await this.$swal.fire({

                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'

                    })
                    if (result) {
                
                        let res = await this.$axios.delete(`/api/deleteDevice/${id}`)
                        if(!res.data.status){

                            this.$swal.fire({
                                title: 'Error!',
                                text: `${res.data.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })

                        }
                        else{
                        
                            this.$swal.fire({
                                title: 'Deleted!',
                                text: `${res.data.message}`,
                                type: 'success',
                            })
                            this.getData();
                            this.$router.push('/devices');
                        }

                        
                    }
                
            } catch (error) {
                this.$swal.fire({
                                title: 'Error!',
                                text: `${error.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })
            }
           
        },
        async getData() {
            let res = await this.$axios.get('/api/getAllDevice')
            this.devices = res.data
        }
    },
    
};
</script>

<style scoped>
.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #fafafa;
}
</style>
