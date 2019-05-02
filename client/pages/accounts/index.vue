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
                                          <h4 class="m-t-0 header-title">Accounts</h4>
                                          <p class="text-muted font-14 m-b-20">
                                             List of Accounts
                                          </p>
                                          <div >
                                            <nuxt-link to="/accounts/create">
                                              <button type="button" class="btn btn-primary waves-effect waves-light">New Account</button>
                                            </nuxt-link> 
                                          </div>
                                        </div>
                                        <br>
                                        <div>
                                           <v-client-table :data="data" :columns="columns" :options="options"> 
                                            
                                            <span slot="actions" slot-scope="{row}">
                                              
                                                
                                                <nuxt-link :to="'/accounts/' + row._id" href="" class="on-default edit-row" v-b-tooltip.hover title="Edit"><i class="fa fa-pencil"></i></nuxt-link>
                                                <a  @click.prevent="deleteAcct(row._id)" href="" class="on-default remove-row" v-b-tooltip.hover title="Delete"><i class="fa fa-trash-o"></i></a>
                                                
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
  	
  	</div>
</template>
<script>
import Vue from 'vue'
import {ClientTable, Event} from 'vue-tables-2';
Vue.use(ClientTable);

export default {
  middleware: 'auth',
  components:{
    //   Devices
  },
  computed: {
  },
  data(){
            return {
                  columns: [
                //   '_id',
                  'firstName',
                  'lastName',
                  'email',
                  'actions'
                  ],
                data: [],
                options: {
                  headings: {
                    // _id: {columnsDisplay: true},
                    firstName: 'First Name',
                    lastName: 'Last Name',
                    email: 'Email',
                    actions: 'Actions'
                  },
                  sortable: [
                    // '_id', 
                    'firstName', 'lastName'
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
    async asyncData ({ params, error, $axios, store }) {
        // await store.dispatch("notification/setUserMessagesRec")
        return await $axios.get('/api/getAllUsers')

    .then((res) => {
        return { users : res.data}

    })
    .catch((e) => {
        
        console.log(e)

    })
    },
    async mounted() {
        this.data = this.users
        // this.$mqtt = await this.$mqtt
        // this.$mqtt.subscribe('/notification')
        // this.$mqtt.on('message', async (topic, message,packet)  => {
            
        //     if(topic === '/notification')
        //     {
        //         let msg = JSON.parse( message.toString('utf8') )
        //         // this.$store.dispatch("notification/newMessageNotification", msg[0])
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
        
        async getData() {
            let res = await this.$axios.get('/api/getAllUsers');
            this.data = res.data;
        },
        
        async deleteAcct (id){
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
              
                      let res = await this.$axios.delete(`/api/deleteUser/${id}`)
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
                          this.getData()
                          this.$router.push('/accounts');
                      }

                  }
              

          } catch (error) {
              console.log(error)
          }
        
        },
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
