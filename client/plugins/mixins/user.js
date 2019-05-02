import Vue from 'vue'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
const User = {
    install (Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    user: 'auth/user',
                    authenticated: 'auth/authenticated'
                }),
                // ...mapState({
                //     user : state => state.auth.user
                //   }),
            }
        })
    }
}

Vue.use(User)