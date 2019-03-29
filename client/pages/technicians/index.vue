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
                                          <h4 class="m-t-0 header-title">Technicians</h4>
                                          <p class="text-muted font-14 m-b-20">
                                             List of Technicians
                                          </p>
                                          <div >
                                            <nuxt-link to="/technicians/create">
                                              <button type="button" class="btn btn-primary waves-effect waves-light">New Technician</button>
                                            </nuxt-link> 
                                          </div>
                                        </div>
                                        <br>
                                        <div>
                                           <v-client-table :data="data" :columns="columns" :options="options"> 
                                            <!--  <a slot="email" slot-scope="props" :href="`mailto:${props.row.email}`">
                                              {{props.row.email}}
                                            </a> -->
                                            <span slot="actions" slot-scope="{row}"> 
                                                <!-- <button v-on:click="edit(row.id)">Edit</button> -->
                                                <nuxt-link :to="'/technicians/' + row._id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link>
                                                <a  @click.prevent="deleteTech(row._id)" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></a>
                                                <!-- <nuxt-link :to="'/' + row.id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link> -->
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
// import daterangepicker from 'daterangepicker';
//This is very important to used with the window object
// window.moment = require('moment')
// import moment from 'moment'

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

        return await axios.get('http://localhost:8000/api/getAllTechnician')

    .then((res) => {
        console.log(res.data)
        return { technician : res.data}

    })
    .catch((e) => {
        
        console.log(e)

    })
    },
    async mounted() {
      this.data = this.technician
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
                    if (result) {
                
                        let res = await this.$axios.delete(`http://localhost:8000/api/deleteTech/${id}`)
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
                            this.$router.push('/technicians');
                            // console.log(result)
                        }

                        
                    }
                
            } catch (error) {
                console.log(error)
            }
           
        },
        
        getData() {
          const arr = []
          for (var i = 0; i < 20; i++) {
            arr.push({
              '_id': i,
              'first_name': `first sample${i}`,
              'last_name': `last sample${i}`,
              'phone_number': `${i}`
            });
          }
          return arr;
        }
    },
    
};
</script>

<style type="scss">
#app {
  width: 95%;
  margin-top: 50px; 
}
  .table {
    color: #f2f5f9;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

.table .thead-dark th {
    color: #fff;
    background-color: #343a40;
    border-color: #454d55;
}


</style>
