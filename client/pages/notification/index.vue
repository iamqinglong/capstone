<template>
  <div>
  		<!-- <div class="wrapper">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <div class="btn-group pull-right">
                                <ol class="breadcrumb hide-phone p-0 m-0">
                                </ol>
                            </div>
                            <h4 class="page-title">Notifications</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-xl-3 col-lg-4">

                      <div class="p-20">
                          
                          <div class="list-group mail-list  m-t-20">
                              <nuxt-link to="/notification" class="list-group-item b-0 active"><i class="fa fa-download m-r-10"></i>Inbox <b class="ml-1">({{notification.messagesRec.length}})</b></nuxt-link>
                          </div>

                      </div>

                  </div>
                  <div class="card-box p-1 m-t-40">
                    <div class="panel-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mails m-0">
                                <tbody>
                                <tr  v-for="message in notification.messagesRec" :key="message._id" v-bind:class="[message.users.length == 0 ? 'unread':'read']">
                                      <td class="mail-select">
                                        
                                        <i class="fa fa-circle m-l-5 text-warning"></i>
                                    </td>
                                    <td class="hidden-xs">
                                      <nuxt-link to=""></nuxt-link>
                                        <nuxt-link :to="'/notification/' + message._id" class="email-msg">{{message.subject}}</nuxt-link>
                                    </td>
                                    
                                    <td class="text-right">
                                      {{message.created_at  | moment("from", "now", true)}} ago
                                    </td>
                                </tr>

                                
                                

                               



                                </tbody>
                            </table>
                        </div>

                    </div> 
                </div> 

                          
                </div>
          </div> 
      </div> -->
      
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
                            <h4 class="page-title">Notifications</h4>
                        </div>
                    </div>
                </div>
                <!-- end page title end breadcrumb -->


                <div class="row">

                    <!-- Left sidebar -->
                    <div class="col-xl-3 col-lg-4">

                        <div class="p-20">
                           
                            <nuxt-link to="/notification" class="list-group-item b-0 active"><i class="fa fa-download m-r-10"></i>Inbox <b class="ml-1">({{notification.unread}})</b></nuxt-link>
                            <!-- <button type="submit" @click="random">Random</button> -->

                        </div>

                    </div>
                    <!-- End Left sidebar -->

                    <!-- Right Sidebar -->
                    <div class="col-xl-9 col-lg-8">


                        <div class="row">
                            <div class="card-box p-1 m-t-20">
                            <div class="panel-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mails m-0">
                                      <thead class="font-13 bg-inverse text-muted">
                                        <tr>
                                            <th class="font-weight-medium"></th>
                                            <th class="font-weight-medium">Subject</th>
                                            <th class="font-weight-medium">Time ago</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                          <!-- <tr  v-for="message in notification.messagesRec" :key="message._id" v-bind:class="[message.users.length == 0 ? 'unread':'read']">
                                                <td class="mail-select">
                                                  <i class="fa fa-circle m-l-5 text-warning"></i>
                                              </td>
                                              <td class="hidden-xs">
                                                <nuxt-link to=""></nuxt-link>
                                                  <nuxt-link @click.native="createUserNotification(message._id)"  :to="'/notification/' + message._id" class="email-msg">{{message.subject}}</nuxt-link>
                                              </td>
                                              
                                              <td class="text-right">
                                                {{message.created_at  | moment("from", "now", true)}} ago
                                              </td>
                                          </tr> -->
                                           <tr  v-for="message in visibleNotif" 
                                           :key="message._id" 
                                           :class="[message.users.length == 0 ? 'unread':'read']"
                                           :visibleNotif="visibleNotif"
                                           :currentPage="currentPage">
                                              <td>
                                                  {{message._id}}
                                              </td>
                                                <td class="mail-select">
                                                  <i class="fa fa-circle m-l-5 text-warning"></i>
                                              </td>
                                              <td class="hidden-xs">
                                                <nuxt-link to=""></nuxt-link>
                                                  <nuxt-link @click.native="createUserNotification(message._id)"  :to="'/notification/' + message._id" class="email-msg">{{message.subject}}</nuxt-link>
                                              </td>
                                              
                                              <td class="text-right">
                                                {{message.created_at  | moment("from", "now", true)}} ago
                                              </td>
                                          </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div> <!-- panel body -->
                        </div>
                        </div>
                        <div v-if="notification.messagesRec.length > 0" class="row m-b-20">
                            <div class="col-7">
                                Showing {{ currentPage + 1 }} page of {{ Math.ceil( notification.messagesRec.length / pageSize ) }}
                            </div>
                            <div  class="col-0">
                                <div class="btn-group pull-right">
                                    <button :disabled="currentPage == 0" @click="updatePage(currentPage - 1)" type="button" class="btn btn-sm btn-secondary waves-effect"><i class="fa fa-chevron-left"></i></button>
                                    <button :disabled="currentPage == notification.messagesRec.length - 1 " @click="updatePage(currentPage + 1)" type="button" class="btn btn-sm btn-secondary waves-effect"><i class="fa fa-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div> <!-- end Col-9 -->

                </div><!-- End row -->

            </div> <!-- end container -->
        </div>
        <!-- end wrapper -->
        
  	</div>
</template>

<script >
  import Vue from 'vue'
  import { mapState } from 'vuex'
  // Vue.use(require('vue-moment'));
  // import VueIziToast from "vue-izitoast";
  // import "izitoast/dist/css/iziToast.css";

  // Vue.use(VueIziToast);
  // import Vue from 'vue';
  

  import redirect from '~/assets/js/redirect'
  export default {
    data() {
      return {
        currentPage: 0,
        pageSize: 10,
        visibleNotif: []
      }
    },
    computed : {
      // ...mapState({
        // notification : state => state.notification
      // })
    },
    async asyncData({store}) {
      await store.dispatch("notification/setUserMessagesRec")
    },
    created() {
      // this.$store.dispatch("notification/setUserMessagesRec")
      
    },
    async mounted() {
    // this.$store.dispatch("notification/setUserMessagesRec")
    // console.log(this.notification.messagesRec.length)
    // if(this.$auth.loggedIn)
    // {
        this.$mqtt = await this.$mqtt
        // this.$mqtt.subscribe('/notification')
        this.$mqtt.on('message', (topic, message,packet)  => {
            
            if(topic === '/notification')
            {
                let msg = JSON.parse( message.toString('utf8') )
                // this.$store.dispatch("notification/newMessageNotification", msg[0])
                this.$store.dispatch("notification/setUserMessagesRec")
                this.updateVisibleNotif()
            }
            
        })
    // }
    

 },
 async beforeMount() {
  //  this.$store.dispatch("notification/setUserMessagesRec")
  this.updateVisibleNotif()
 },
methods: {  
  async createUserNotification (id) {
    // console.log('user_id '+this.user._id)
    // console.log('notifId '+id)
    try {
        await this.$axios.post(`/api/createUserNotification/${this.user._id}`, {
          notifId: id
      })
      // console.log("SUCCESS")
    } catch (error) {
      console.log(error)
    }
  },
  async updatePage(pageNum) {
    this.currentPage = pageNum
    this.updateVisibleNotif()
  },
  async updateVisibleNotif () {
    
    this.visibleNotif = this.notification.messagesRec.slice((this.currentPage * this.pageSize), (this.currentPage * this.pageSize) + this.pageSize )
    // console.log(this.visibleNotif)
    if(this.visibleNotif.length == 0 && this.currentPage > 0){
      this.updatePage( this.currentPage -1 )
    }
  },
  async showPrevious() {
    // let temp = this.currentPage == 0 ? false : true
    // console.log(this.currentPage)
    // console.log(temp)
    let temp = false
    if(this.currentPage == 0)
    {
      temp = true
      // console.log(this.currentPage)
      
    }
    // console.log(temp)
    return temp
  },
  async showNext() {
    return this.currentPage == ( this.notification.messagesRec.length -1 ) ? false:true
  },
  async random()
  {
    this.$izitoast.warning({
      title: 'Caution',
      message: 'Temperature 1 is high',
      // buttons: [
      //         [
      //           "<button><b>View</b></button>", 'yes',
      //           function(instance, toast) {
      //             // this.$router.push('/devices');
      //             this.redirect.myFunction1()
      //             // instance.hide({ transitionOut: "fadeOut" }, toast, "Yes");
      //           },
      //           true
      //         ],
      //         [
      //           "<button>Close</button>",
      //           function(instance, toast) {
      //             instance.hide({ transitionOut: "fadeOut" }, toast, "No");
      //           }
      //         ]
      //       ],
            closeOnClick: true,
            onClosing: function(instance, toast, closedBy) {
              console.info("Closing | closedBy: " + closedBy);
            },
            onClosed: function(instance, toast, closedBy) {
              console.info("Closed | closedBy: " + closedBy);
            }
    })
  },
 
  // async redirect()
  // {
  //   this.$router.push('/devices');
  // }

  },
 async destroyed() {
    // this.$mqtt.unsubscribe('/notification')
  },

  }
</script>

<style scoped>
.mails td:last-of-type {
    width: 328px;
    padding-right: 20px;
}
</style>
