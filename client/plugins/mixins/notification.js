import Vue from 'vue'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
const Notification = {
    install (Vue, options) {
        Vue.mixin({
            computed: {
                ...mapState({
                    notification : state => state.notification
                  }),
                // ...mapGetters({
                //     // notification : 'notification/msgRec'
                //   })
            },
        })
    }
}

Vue.use(Notification)