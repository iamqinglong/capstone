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
                                        <br>
                                        <div>
                                           <v-client-table :data="data" :columns="columns" :options="options"> </v-client-table>
                                        </div>
                                       
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
import Vue from 'vue'
import {ClientTable, Event} from 'vue-tables-2';
Vue.use(ClientTable);
import daterangepicker from 'daterangepicker';
//This is very important to used with the window object
// window.moment = require('moment')
import moment from 'moment'
export default {
  middleware: 'auth',
  components:{
      Devices
  },
  computed: {
    // ...mapGetters(['loggedInUser']),
  },
  data(){
            return {
                columns: [ 'id', 'fName','lName','phone',''],
                data: this.getData(),
                options: {
                    headings: {
                        fName: 'First Name',
                        lName: 'Last Name',
                        phone: 'Phone Number',
                        id: '#',
                      },
                    sortable: ['id', 'fName'],
                    texts: {
                      filter: ''
                    }, 
                    filterable:['id','fName'],
                }
            }
            
        },
    async asyncData ({ params, error }) {

        return await axios.get('http://localhost:8000/api/getAllDevice')

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
        getData() {
          return [
            {
              'id': 1,
              'fName': 'sample1',
              'lName': 'sample1',
              'phone': '12121'
            },
            {
              'id': 2,
              'fName': 'sample2',
              'lName': 'sample2',
              'phone': '12121'
            },

            {
              'id': 3,
              'fName': 'sample3',
              'lName': 'sample3',
              'phone': '12121'
            },
            {
              'id': 4,
              'fName': 'sample4',
              'lName': 'sample4',
              'phone': '12121'
            }
          ];
      }
    },
    
};
</script>

<style type="scss">
  .table {
    color: #f2f5f9;
}
</style>
