<template>
  <div>
    
      
    <Navbar/>
    
            <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                       © Capstone  Project 
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer -->
    <nuxt/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  },
  async asyncData({store}) {
      await store.dispatch("notification/setUserMessagesRec")
 },
//  async beforeCreate() {
//       await this.$store.dispatch("notification/setUserMessagesRec")
//  },
//  async created() {
//    await this.$store.dispatch("notification/setUserMessagesRec")
//  },
//  async beforeMount() {
//    await this.$store.dispatch("notification/setUserMessagesRec")
//  },
 async mounted() {
   
    await this.$store.dispatch("notification/setUserMessagesRec")
    // if(this.$auth.loggedIn)
    // {
    //   this.$mqtt = await this.$mqtt
    //   this.$mqtt.subscribe('/notification')
    //   this.$mqtt.on('message', async (topic, message,packet)  => {
          
    //       if(topic === '/notification')
    //       {
    //           let msg = JSON.parse( message.toString('utf8') )
    //           this.$store.dispatch("notification/newMessageNotification", msg[0])
    //           await this.$store.dispatch("notification/setUserMessagesRec")


    //       }
    // })
//  }

 },
  
}
</script>

<style>
body {
    color: #f3f3f3;
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
