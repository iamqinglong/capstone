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
            
                        </div>

                    </div>
                    <!-- End Left sidebar -->

                    <!-- Right Sidebar -->
                    <div class="col-xl-9 col-lg-8">


                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card-box m-t-20">
                                    <h4 class="m-t-0 font-18"><b>{{notification.message.subject}}</b></h4>

                                    <hr/>

                                    <div class="media m-b-30">
                                        <div class="media-body">
                                            <span class="media-meta pull-right">{{notification.message.created_at  | moment("from", "now", true)}}</span>
                                        </div>
                                    </div>

                                    <p>{{notification.message.message}}</p>
                                    <p>Please do something, Call all available technicians!</p>
                                    <hr/>


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

<script>
// import { mapState } from 'vuex'
export default {
    //  computed : {
    //   ...mapState({
    //     notification : state => state.notification
    //   })
    // },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
      await store.dispatch("notification/setUserMessagesRec")
    },
    created() {
        this.$store.dispatch('notification/getNotificationById', this.$route.params.id)
        this.$store.dispatch("notification/setUserMessagesRec")
    },
    destroyed() {
        this.$store.dispatch('notification/clearMessage')
    },
    async mounted() {

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
}
</script>
