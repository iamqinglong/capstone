import Vue from 'vue'
import { mapState } from 'vuex'
// import redirect from '~/assets/js/redirect'
const Notification = {
    install (Vue, options) {
        Vue.mixin({
            computed: {
                ...mapState({
                    notification : state => state.notification
                  }),
                // ...mapGetters({
                //     notification : 'notification/msgRec'
                //   })
            },
            // method : {
            //     redirect() {
            //         redirect.myFunction1()
            //     }
            // }
        })
    }
}

Vue.use(Notification)