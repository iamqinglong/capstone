<template>
<!-- Navigation Bar-->
    <no-ssr>
        <header id="topnav">
            <div class="topbar-main">
                <div class="container-fluid">

                    <!-- Logo container-->
                    <div class="logo">
                        <!-- Text Logo -->
                        
                        <nuxt-link to="/" class="logo">
                            <span class="logo-small"><i class="mdi mdi-radar"></i></span>
                            <span class="logo-large"><i class="mdi mdi-radar"></i> Water Quality Monitoring System</span>
                        </nuxt-link>
                        <!-- Image Logo -->
                        <!--<a href="index.html" class="logo">-->
                            <!--<img src="assets/images/logo_dark.png" alt="" height="24" class="logo-lg">-->
                            <!--<img src="assets/images/logo_sm.png" alt="" height="24" class="logo-sm">-->
                        <!--</a>-->

                    </div>
                    <!-- End Logo container-->


                    <div class="menu-extras topbar-custom">

                        <ul class="list-inline float-right mb-0">

                            <li class="menu-item list-inline-item">
                                <!-- Mobile menu toggle-->
                                <a class="navbar-toggle nav-link">
                                    <div class="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </a>
                                <!-- End mobile menu toggle-->
                            </li>
                            <li v-if="status" class="list-inline-item dropdown notification-list">
                                <a class="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i class="mdi mdi-bell noti-icon"></i>
                                    <span class="badge badge-pink noti-icon-badge">{{notification.unread}}</span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg" aria-labelledby="Preview">
                                  
                                    <div class="dropdown-item noti-title">
                                        <h5 class="font-16"><span class="badge badge-danger float-right">{{notification.unread}}</span>Notification</h5>
                                    </div>

                            
                                    
                                    <nuxt-link  v-for="(message,index) in notification.messagesRec.slice(0,5)" 
                                    :key="message._id" 
                                    @click.native="createUserNotification(message._id,index)"  
                                    :to="'/notification/' + message._id" 
                                    v-bind:class="[message.users.length == 0 ? 'unread':'read']"
                                    class="dropdown-item notify-item">
                                    <div class="notify-icon bg-success"><i class="mdi mdi-comment-account"></i></div>
                                    <p class="notify-details">{{message.subject}}<small class="text-muted">{{message.created_at  | moment("from", "now", true)}} ago</small></p>
                                    </nuxt-link>

                                    <nuxt-link to="/notification"  class="dropdown-item notify-item notify-all">
                                        View All
                                    </nuxt-link>
                             </div>
                            </li>
                            <li v-if="authenticated" class="list-inline-item dropdown notification-list">
                                <a class="nav-link dropdown-toggle waves-effect nav-user" data-toggle="dropdown" href="#" role="button"
                                   aria-haspopup="false" aria-expanded="false">
                                    <img src="/images/users/avatar-1.jpg" alt="user" class="rounded-circle">
                                </a>
                                <div class="dropdown-menu dropdown-menu-right profile-dropdown " aria-labelledby="Preview">
                                    <!-- item-->
                                    <div class="dropdown-item noti-title">
                                        <h5 class="text-overflow"><small class="text-white">Welcome, {{ user.lastName }}</small> </h5>
                                    </div>

                                    <!-- item-->
                                    <nuxt-link to="/profile"  class="dropdown-item notify-item">
                                        <i class="mdi mdi-account"></i> <span>Profile</span>
                                    </nuxt-link>

                                    <a href="" @click.prevent="logout" class="dropdown-item notify-item">
                                        <i class="mdi mdi-logout"></i> <span>Logout</span>
                                    </a>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <!-- end menu-extras -->

                    <div class="clearfix"></div>

                </div> <!-- end container -->
            </div>
            <!-- end topbar-main -->

            <div class="navbar-custom">
                <div class="container-fluid">
                    <div id="navigation">
                        
                        <ul v-if="status" class="navigation-menu">

                            <li class="nav-item">
                                <nuxt-link to="/">Dashboard</nuxt-link>
                            </li>

                            <li class="nav-item">
                                <nuxt-link to="/devices">Devices</nuxt-link>
                             </li>

                             <li class="nav-item">
                                <nuxt-link to="/technicians">Technician</nuxt-link>
                             </li>
                          
                             <li class="nav-item">
                                <nuxt-link to="/notification">Notifications</nuxt-link>
                             </li>
                            
                            <li class="nav-item">
                                <nuxt-link to="/accounts">Accounts</nuxt-link>
                            </li>

                            <li class="nav-item">
                                <nuxt-link to="/reports">Reports</nuxt-link>
                             </li>
                              <li class="nav-item">
                                <nuxt-link to="/modem">Modem Setting</nuxt-link>
                             </li>
                             
                        </ul>
                        <ul v-else class="navigation-menu">

                            <li class="has-submenu">
                                <nuxt-link to="/">Dashboard</nuxt-link>
                            </li>
                            
                            <li  class="has-submenu">
                                <nuxt-link to="/login">Login</nuxt-link>
                            </li>
                        </ul>
                        <!-- End navigation menu -->
                    </div> <!-- end #navigation -->
                </div> <!-- end container -->
            </div> <!-- end navbar-custom -->
        </header>
        <!-- End Navigation Bar-->
        </no-ssr>

</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  computed: {
    // ...mapGetters(['isAuthenticated', 'loggedInUser']),
    // ...mapGetters({
    //     loggedIn : "auth/authenticated"
    // }),
    // ...mapState({
        // notification : state => state.notification
    //   })
    status()
    {
      return  this.$store.state.auth.loggedIn
    }
  },
  async created() {
    // this.$store.dispatch("notification/setUserMessagesRec")
    // if(this.$loggedIn)
    // {
    //     this.$store.dispatch("notification/setUserMessagesRec")
    //     this.$nextTick(callback)
    // }
 },
 async asyncData({store}) {
      await store.dispatch("notification/setUserMessagesRec")
 },
 async mounted() {
     
    // console.log(this.authenticated)
    // if(this.$auth.loggedIn)
    // {
        this.$mqtt = await this.$mqtt
        this.$mqtt.subscribe('/notification')
        this.$mqtt.on('message', async (topic, message,packet)  => {
            
            if(topic === '/notification')
            {
                let msg = JSON.parse( message.toString('utf8') )
                console.log(msg)
                this.$store.dispatch("notification/newMessageNotification", msg[0])
                // await this.$store.dispatch("not  ification/setUserMessagesRec")

                this.$izitoast.warning({
                                    title: 'Caution',
                                    message: `${msg[0].subject}`,
                                    
                                        closeOnClick: true,
                                        onClosing: function(instance, toast, closedBy) {
                                        console.info("Closing | closedBy: " + closedBy);
                                        },
                                        onClosed: function(instance, toast, closedBy) {
                                        console.info("Closed | closedBy: " + closedBy);
                                        }
                                    })

            }
            
        })
    // }

 },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
    async createUserNotification (id,index) {
  
    try {
        await this.$axios.post(`/api/createUserNotification/${this.user._id}`, {
          notifId: id
      })
    //   console.log(result.data)
      this.$store.dispatch("notification/setReadMsg", index)

    } catch (error) {
      console.log(error)
    }
  }
  },
  async destroyed() {
      this.$mqtt.unsubscribe(this.dev.data_source)
  },
  
};
</script>

<style >
.dropdown-menu {

    background-color: #3d4853;
    border: 1px solid rgba(0, 0, 0, 0.15);

}

.unread {
    font-weight: 800;
    color: #ffffff;
}

</style>

