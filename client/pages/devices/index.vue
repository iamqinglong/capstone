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
                                                <th>Data Source</th>
                                                <th>Location</th>
                                                <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Actions" style="width: 223.2px;">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(device, index) in devices" :key="device._id">
                                                <th scope="row">{{index + 1}}</th>
                                                <td>{{device.device_name}}</td>
                                                <td>{{device.data_source}}</td>
                                                <td>{{device.location}}</td>
                                                 <td class="actions">
                                                    <nuxt-link :to="'/devices/' + device._id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link>
                                                    <!-- <nuxt-link :to="'/devices/delete/' + device._id" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></nuxt-link> -->
                                                    <a  @click.prevent="deleteDevice(device._id)" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></a>
                                                    <nuxt-link :to="'/devices/manage/' + device._id" href="" class="hidden on-editing cancel-row" v-b-tooltip.hover title="Manage"><i class="fa fa-times"></i></nuxt-link>
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
      <footer class="footer">
          <div class="container">
              <div class="row">
                  <div class="col-12 text-center">
                       © Capstone Project
                  </div>
              </div>
          </div>
      </footer>
      <!-- End Footer -->
  	
  	</div>
</template>

<script>
// import { mapGetters } from 'vuex';
import Devices from '@/components/Devices.vue'
// import style_devices from '@/static/css/style_device.css'
import style_ten from '@/static/css/style_ten.css'
import style_thirteen from '@/static/css/style_thirteen.css'

import axios from 'axios'

export default {
  middleware: 'auth',
  components:{
      Devices
  },
  computed: {
    // ...mapGetters(['loggedInUser']),
  },
   asyncData ({ params, error }) {

        return axios.get('http://localhost:8000/api/getAllDevice')

    .then((res) => {
        console.log(res.data)
        return { devices : res.data}

    })
    .catch((e) => {
        
        console.log(e)

    })
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
                
                        let res = await this.$axios.delete(`http://localhost:8000/api/deleteDevice/${id}`)
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
                            this.$router.push('/devices');
                            // console.log(result)
                        }

                        // this.$swal.fire(
                        // 'Deleted!',
                        // 'Your file has been deleted.',
                        // 'success'
                        // )
                    }
                
            } catch (error) {
                console.log(error)
            }
           
        },
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
