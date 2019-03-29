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
                                        <h4 class="m-t-0 header-title">Events and actions</h4>
                                        <p class="text-muted font-14 m-b-20">
                                           Set different actions for specific events that might occure to this device
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
                                                <th>Condition</th>
                                                <th>Statement</th>
                                                <th>Value</th>
                                                <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Actions" style="width: 223.2px;">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            
                                            </tbody>
                                        </table>
                                    </div>

                                </div>      
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                    <div class="card-box">
                                        <div>
                                          <h4 class="m-t-0 header-title">Technicians</h4>
                                          <p class="text-muted font-14 m-b-20">
                                             List of Technicians for this device
                                          </p>
                                          <div >
                                            
                                              <button  type="button" class="btn btn-primary waves-effect waves-light" @click="$modal.show('add-modal')">Add from Technician List </button>
                                            
                                          </div>
                                        </div>
                                        <br>
                                        <div>
                                           <v-client-table :data="data" :columns="columns" :options="options"> 
                                            
                                            <span slot="actions" slot-scope="{row}"> 
                                                <nuxt-link :to="'/technicians/' + row._id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link>
                                                <a  @click.prevent="deleteTech(row._id)" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></a>
                                            </span>

                                           </v-client-table>
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
  	<add-modal-modal/>
  	</div>

</template>

<script>
import Vue from 'vue'
import {ClientTable, Event} from 'vue-tables-2';
import vmodal from 'vue-js-modal'
Vue.use(ClientTable);
Vue.use(vmodal)
import style_ten from '@/static/css/style_ten.css'
import style_thirteen from '@/static/css/style_thirteen.css'
import AddModal from '@/components/modal/AddTechFromList.vue'
import axios from 'axios'

  export default {
      components: {
        AddModal
      },
      data(){
            return {
                  columns: [
                  // '_id',
                  'first_name',
                  'last_name',
                  'phone_number',
                  'actions'
                  ],
                data: [],
                options: {
                  headings: {
                    // _id: {columnsDisplay: true},
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    phone_number: 'Phone Number',
                    actions: 'Actions'
                  },
                  sortable: [
                    // '_id', 
                    'first_name', 'last_name'
                    ],
                  texts: {
                    filterPlaceholder: 'filter'
                  },
                  sortIcon: {
                    base : 'fa',
                    is: 'fa-sort',
                    up: 'fa-sort-asc',
                    down: 'fa-sort-desc'
                  },
                  texts: {
                    filter: ''
                  },
              },
            }   
        },
    async asyncData ({ params, error }) {

      
      return await axios.get(`http://localhost:8000/api/getDeviceTechnician/${params.id}`)
        
    .then((res) => {
        // let temp = JSON.stringify(res.data)
        // JSON.parse(temp)
        console.log(res.data)
        return { device: res.data.device[0] }

    })
    .catch((e) => {
        
        error({ statusCode: 404, message: 'This page is nowhere to be found' })
    })
    },
    head(){
        return {
            title:'Manage | ' + this.device.device_name
        }
    },
    mounted(){
        this.data = this.device.technicians
        console.log(this.data)
    },
     methods: {
         async deleteTech (id){
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
                    // if (result) {
                
                    //     let res = await this.$axios.delete(`http://localhost:8000/api/deleteTech/${id}`)
                    //     if(!res.data.status){

                    //         this.$swal.fire({
                    //             title: 'Error!',
                    //             text: `${res.data.message}`,
                    //             type: 'error',
                    //             confirmButtonText: 'Ok'
                    //         })

                    //     }
                    //     else{
                        
                    //         this.$swal.fire({
                    //             title: 'Deleted!',
                    //             text: `${res.data.message}`,
                    //             type: 'success',
                    //         })
                    //         this.$router.push('/technicians');
                    //         // console.log(result)
                    //     }

                        
                    // }
                
            } catch (error) {
                console.log(error)
            }
           
        },
    
    },

    
  }
  
</script>