<template>
  <div>
        <header id="topnav">
            <div class="topbar-main">
                <div class="container-fluid">

                    <!-- Logo container-->
                    <div class="logo">
                        <!-- Text Logo -->
                        <a href="index.html" class="logo">
                            <span class="logo-small"><i class="mdi mdi-radar"></i></span>
                            <span class="logo-large"><i class="mdi mdi-radar"></i> Capstone Project</span>
                        </a>

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
                            <li class="list-inline-item dropdown notification-list">
                                <a class="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i class="mdi mdi-bell noti-icon"></i>
                                    <span class="badge badge-pink noti-icon-badge">4</span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg" aria-labelledby="Preview">
                                    <!-- item-->
                                    <div class="dropdown-item noti-title">
                                        <h5 class="font-16"><span class="badge badge-danger float-right">5</span>Notification</h5>
                                    </div>

                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                                        <div class="notify-icon bg-success"><i class="mdi mdi-comment-account"></i></div>
                                        <p class="notify-details">Robert S. Taylor commented on Admin<small class="text-muted">1 min ago</small></p>
                                    </a>

                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                                        <div class="notify-icon bg-info"><i class="mdi mdi-account"></i></div>
                                        <p class="notify-details">New user registered.<small class="text-muted">1 min ago</small></p>
                                    </a>

                                    <!-- item-->
                                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                                        <div class="notify-icon bg-danger"><i class="mdi mdi-airplane"></i></div>
                                        <p class="notify-details">Carlos Crouch liked <b>Admin</b><small class="text-muted">1 min ago</small></p>
                                    </a>

                                    <!-- All-->
                                    <a href="javascript:void(0);" class="dropdown-item notify-item notify-all">
                                        View All
                                    </a>

                                </div>
                            </li>
                            <li v-if="authenticated" class="list-inline-item dropdown notification-list">
                            <!-- <li v-if="isAuthenticated" class="list-inline-item dropdown notification-list"> -->
                                <a class="nav-link dropdown-toggle waves-effect nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <img src="/images/users/avatar-1.jpg" alt="user" class="rounded-circle">
                                </a>
                                <div  class="dropdown-menu dropdown-menu-right profile-dropdown " aria-labelledby="Preview">
                                    <!-- item-->
                                    <div class="dropdown-item noti-title">
                                        <h5 class="text-overflow"><small class="text-white">Welcome ! {{ user.lastName }}</small> </h5>
                                    </div>

                                    <!-- item-->
                                     <nuxt-link class="dropdown-item notify-item" to="/profile">
                                      <i class="mdi mdi-account"></i> <span>Profile</span>
                                     </nuxt-link>
                                  
                                    <!-- item-->
                                    <a href="" @click.prevent="logout" class="dropdown-item notify-item">
                                        <i class="mdi mdi-logout"></i> <span>Logout</span>
                                    </a>
                                </div>
                                <!-- <template v-else>
                                  <nuxt-link class="navbar-item" to="/register">Register</nuxt-link>
                                  <nuxt-link class="navbar-item" to="/login">Log In</nuxt-link>
                                </template> -->
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
                        <!-- Navigation Menu-->
                        <ul class="navigation-menu">

                            <li class="has-submenu">
                                <!-- <a href=""><i class="ti-home"></i>Dashboard</a> -->
                                <nuxt-link to="/">Dashboard</nuxt-link>
                            </li>
                            <li v-if="authenticated" class="has-submenu">
                             <!-- <li v-if="isAuthenticated" class="has-submenu">     -->
                                <!-- <a href="/devices"><i class="ti-home"></i>Devices</a> -->
                                <nuxt-link to="/devices">Devices</nuxt-link>
                             </li>
                                <li v-if="authenticated" class="has-submenu">
                                <nuxt-link to="/technicians">Technician</nuxt-link>
                             </li>
                             </li>
                                <li v-if="authenticated" class="has-submenu">
                                <nuxt-link to="/notification">Notifications</nuxt-link>
                             </li>
                             <li v-if="!authenticated" class="has-submenu">
                             <!-- <li  v-if="!isAuthenticated" class="has-submenu">     -->
                                <!-- <a href="/devices"><i class="ti-home"></i>Devices</a> -->
                                <nuxt-link to="/register">Register</nuxt-link>
                             </li>
                             <li v-if="!authenticated" class="has-submenu">
                             <!-- <li v-if="!isAuthenticated" class="has-submenu">     -->
                                <!-- <a href="/devices"><i class="ti-home"></i>Devices</a> -->
                                <nuxt-link to="/login">Login</nuxt-link>
                             </li>
                        </ul>
                        
                        <!-- End navigation menu -->
                    </div> <!-- end #navigation -->
                </div> <!-- end container -->
            </div> <!-- end navbar-custom -->
        </header>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  computed: {
    // ...mapGetters(['isAuthenticated', 'loggedInUser']),
    // ...mapGetters({
    //     loggedIn : "auth/authenticated"
    // }),
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style scoped>
.dropdown-menu {

    background-color: #3d4853;
    border: 1px solid rgba(0, 0, 0, 0.15);

}
</style>

