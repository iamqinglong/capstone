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
                                          <nuxt-link :to="'/devices/manage/create/' + id">
                                            <button type="button" class="btn btn-primary waves-effect waves-light">Add New Event</button>
                                          </nuxt-link> 
                                        </div>
                                        </div>
                                        <br>
                                        <div>
                                          <v-client-table :data="event" :columns="columnEvent" :options="optionEvent"> 
                                            <span slot="edit_delete" slot-scope="{row}">
                                              
                                                <!-- <button v-on:click="edit(row.id)">Edit</button> -->
                                                <nuxt-link :to="'/devices/manage/edit/' + row._id +'_' + id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link>
                                                <a  @click.prevent="deleteEvent(row._id)" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></a>
                                                <!-- <nuxt-link :to="'/' + row.id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link> -->
                                            </span>
                                            </v-client-table>
                                        </div>
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
                                            
                                              <button  type="button" class="btn btn-primary waves-effect waves-light" @click="showModal">Assign a Technician</button>
                                            
                                          </div>
                                        </div>
                                        <br>
                                        <div>
                                           <v-client-table :data="tech" :columns="columns" :options="options"> 
                                            <span slot="actions" slot-scope="{row}"> 
                                                <!-- <nuxt-link :to="'/technicians/' + row._id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link> -->
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
  	<!-- <add-modal/> -->
    <b-modal 
    ref="add-modal" 
    size="lg" 
    centered 
    title="Available Technicians"
    ok-title="Save Changes"
    @ok="save"
    :ok-disabled="status">
      <div class="d-block text-center">
        <v-client-table :data="avail" :columns="colModal" :options="optModal"> 
          <input slot="selected" slot-scope="{row}" type="checkbox" :checked="row.selected" v-model="checkedRows" :value="row._id">
        </v-client-table>
      </div>
      
    </b-modal>
  	</div>

</template>

<script>
import Vue from 'vue'
import {ClientTable, Event} from 'vue-tables-2';
// import vmodal from 'vue-js-modal'
Vue.use(ClientTable);
// Vue.use(vmodal)
import style_ten from '@/static/css/style_ten.css'
import style_thirteen from '@/static/css/style_thirteen.css'
// import AddModal from '@/components/modal/AddTechFromList.vue'
// import axios from 'axios'

  export default {
      components: {
        // AddModal
      },
      data(){
            return {
                status: true,
                  columns: [
                  // 'selected',
                  'first_name',
                  'last_name',
                  'phone_number',
                  'actions'
                  ],
                event: [],
                tech: [],
                avail: [],
                checkedRows:[],
                options: {
                  headings: {
                    // _id: {columnsDisplay: true},
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    phone_number: 'Phone Number',
                    actions: 'Actions'
                  },
                  sortable: [
                    'first_name', 'last_name'
                    ],
                  // texts: {
                  //   filterPlaceholder: 'filter'
                  // },
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
              colModal: [
                  'selected',
                  'first_name',
                  'last_name',
                  'phone_number',
                  // 'actions'
                  ],
              optModal: {
                  headings: {
                    // _id: {columnsDisplay: true},
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    phone_number: 'Phone Number',
                    // actions: 'Actions'
                  },
                  filterable: false
              },
              columnEvent: [
                  'condition',
                  'statement',
                  'value',
                  'action',
                  'edit_delete'
                  ],
              optionEvent: {
                  headings: {
                    condition: 'Condition',
                    statement: 'Statement',
                    value: 'Value',
                    action: 'Actions',
                    edit_delete: 'Edit/Delete'
                  },
                  sortable: [
                    'condition','statement', 'value'
                    ],
                  // texts: {
                  //   filterPlaceholder: 'filter'
                  // },
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
    async asyncData ({ params, error, $axios, store }) {
      await store.dispatch("notification/setUserMessagesRec")
      
      let [device, technician, events] =  await Promise.all([ $axios.get(`/api/getDeviceTechnician/${params.id}`),
                                 $axios.get(`/api/getAllNotDeviceTechnician/${params.id}`),
                                 $axios.get(`/api/getDeviceEvent/${params.id}`)
                              ])
      // console.log(technician.data)
      // console.log(events.data)
      return {
          id: params.id,
          device: device.data,
          availTechnicians: technician.data,
          events: events.data
      }
    // .then((res) => {
    //     // let temp = JSON.stringify(res.data)
    //     // JSON.parse(temp)
    //     console.log(res.data)
    //     return { device: res.data.device[0] }

    // })
    // .catch((e) => {
        
    //     error({ statusCode: 404, message: 'This page is nowhere to be found' })
    // })
    },
    head(){
        return {
            // title:'Manage | ' + this.device.device_name
        }
    },
    async mounted(){
      //  console.log(this.device.device.length)
       if(this.device.device.length != 0 ) this.tech = this.device.device[0].technicians
       if(this.events.length != 0) this.event = this.events[0].events
        this.avail = this.availTechnicians.technician

        
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
       async getData(){
         let [device, technician] =  await Promise.all([ this.$axios.get(`/api/getDeviceTechnician/${this.id}`),
                                 this.$axios.get(`/api/getAllNotDeviceTechnician/${this.id}`)
                              ])
        
          if(device.data.device.length != 0 ) this.tech = device.data.device[0].technicians
          else this.tech = []
          
        this.avail = technician.data.technician
       },
      showModal() {
        this.$refs['add-modal'].show()
      },
      async save() {

        let res = await this.$axios.post(`/api/createDevTech/${this.id}`,{
             techIds: this.checkedRows
        })
        this.getData();
           this.$swal.fire({
                                title: 'Added!',
                                text: `${res.data.message}`,
                                type: 'success',
                            })

        this.checkedRows = []
      },
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
                        
                        let res = await this.$axios.post(`/api/deleteDevTech`,{
                          devId: this.id,
                          techId: id
                        })
                        if(!res.data.status){

                            this.$swal.fire({
                                title: 'Error!',
                                text: `${res.data.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })

                        }
                        else{
                            this.getData()
                            this.$swal.fire({
                                title: 'Deleted!',
                                text: `${res.data.message}`,
                                type: 'success',
                            })
                        }

                        
                    }
                
            } catch (error) {
                console.log(error)
            }
           
        },
        async deleteEvent (param){
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
                        
                        let res = await this.$axios.post('/api/deleteEvent',{

                          devId: this.id,
                          evId: param,

                        })
                       
                        this.getEventData()

                        if(res.data.status){

                            this.getData()
                            this.$swal.fire({
                                title: 'Deleted!',
                                text: `${res.data.message}`,
                                type: 'success',
                            })

                        }
                        

                        
                    }
                
            } catch (error) {
                console.log(error)
            }
           
        },
        
        async getEventData()
        {
          let res = await this.$axios.get(`/api/getDeviceEvent/${this.id}`)
          if(res.data.length != 0) this.event = res.data[0].events
          else this.event = []
          console.log(res.data.length)
        }
    
    },
    watch: {
      checkedRows: function (val){
        if(val.length != 0) this.status = false;
        else return this.status = true;
      }
    },
    
  }
  
</script>
<style scope>
.modal .modal-dialog .modal-content {
    border-color: #1b2025;
    box-shadow: none;
    background-color: #27313a;
}
.modal-header {
   
    border-bottom: 1px solid #2c353e;
}
.modal-footer {

    border-top: 1px solid #2c353e;
}
</style>

