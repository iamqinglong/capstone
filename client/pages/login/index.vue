<template>
  <div>
    
    <div class="wrapper-page">

            <div class="text-center">
                <a href="" class="logo-lg"><i class="mdi mdi-radar"></i> <span>Welcome Back!</span> </a>
            </div>
            <Notification :message="error" v-if="error"/>
            <form class="form-horizontal m-t-20" action="" method="post" @submit.prevent="login">

                <div class="form-group row">
                    <div class="col-12">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="mdi mdi-account"></i></span>
                            </div>
                            <input name="email" v-model="email" class="form-control" required="" type="email" placeholder="Email">
                        </div>
                        <small class="form-text text-danger" v-if="errors.email">{{errors.email}}</small>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-12">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="mdi mdi-key"></i></span>
                            </div>
                            <input name="password" v-model="password" class="form-control" required="" type="password" placeholder="Password">
                        </div>
                        <small class="form-text text-danger" v-if="errors.password">{{errors.password}}</small>
                    </div>
                </div>
    
                <div class="form-group text-right m-t-20">
                    <div class="col-xs-12">
                        <button class="btn btn-primary btn-custom w-md waves-effect waves-light" type="submit">Log In
                        </button>
                    </div>
                </div>
                
                
                <div class="form-group row m-t-30">
                    <div class="col-sm-7">
                        
                         <nuxt-link to="/register">Create an account</nuxt-link>
                    </div>
                </div>
            </form>
        </div>
  </div>
</template>

<script>
import Notification from '~/components/Notification';
export default {
  middleware: 'guest',
  components: {
    Notification,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        let res = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        // console.log(res)
        // this.$router.push('/');
      } catch (e) {
        console.log(e)
      }
    },
  },
  destroyed() {
    this.$store.dispatch("validation/clearErrors")
  },
};
</script>