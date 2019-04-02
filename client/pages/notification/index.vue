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
                                        <h4 class="m-t-0 header-title">Notifcations</h4>
                                        <p class="text-muted font-14 m-b-20">
                                           List of Notifications
                                        </p>
                                        <div >
                                          <!-- <nuxt-link to="/devices/create">
                                            <button type="button" class="btn btn-primary waves-effect waves-light">Connect a new device</button>
                                          </nuxt-link> 
 -->                                        </div>
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
  	</div>
</template>

<script >
  import { mapState } from 'vuex'

  export default {
    computed : {
      ...mapState({
        notification : state => state.messagesRec
      })
    },
    created() {
      this.$store.dispatch("notification/setUserMessagesRec")
    }
  }
</script>
