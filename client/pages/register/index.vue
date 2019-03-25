<template>
  <div>

   <div class="wrapper-page">

          <div class="text-center">
              <a href="index.html" class="logo-lg"><i class="mdi mdi-radar"></i> <span>Minton</span> </a>
          </div>
          <Notification :message="error" v-if="error"/>
          <form class="form-horizontal m-t-20" action="" method="post" @submit.prevent="register">

              <div class="form-group row">
                  <div class="col-12">
                      <div class="input-group">
                          <div class="input-group-prepend">
                              <span class="input-group-text"><i class="mdi mdi-email"></i></span>
                          </div>
                          <input name="email" v-model="email" class="form-control" type="email"  placeholder="Email">
                          
                      </div>
                      <small class="form-text text-danger" v-if="errors.email">{{errors.email}}</small>
                  </div>
              </div>

              <div class="form-group row">
                  <div class="col-12">
                      <div class="input-group">
                          <div class="input-group-prepend">
                              <span class="input-group-text"><i class="mdi mdi-account"></i></span>
                          </div>
                          <input name="firstName" v-model="firstName"  class="form-control" type="text"  placeholder="First Name">
                          
                      </div>
                      <small class="form-text text-danger" v-if="errors.firstName">{{errors.firstName}}</small>
                  </div>
              </div>


              <div class="form-group row">
                  <div class="col-12">
                      <div class="input-group">
                          <div class="input-group-prepend">
                              <span class="input-group-text"><i class="mdi mdi-account"></i></span>
                          </div>
                          <input name="lastName" v-model="lastName"  class="form-control" type="text" placeholder="Last Name">
                          
                      </div>
                      <small class="form-text text-danger" v-if="errors.lastName">{{errors.lastName}}</small>
                  </div>
              </div>

              <div class="form-group row">
                  <div class="col-12">
                      <div class="input-group">
                          <div class="input-group-prepend">
                              <span class="input-group-text"><i class="mdi mdi-key"></i></span>
                          </div>
                           <input name="password" v-model="password" class="form-control" type="password" placeholder="Password">
                           
                      </div>
                      <small class="form-text text-danger" v-if="errors.password">{{errors.password}}</small>
                  </div>
              </div>

              <div class="form-group text-right m-t-20">
                  <div class="col-xs-12">
                      <button class="btn btn-primary btn-custom waves-effect waves-light w-md" type="submit">Register</button>
                  </div>
              </div>

              <div class="form-group row m-t-30">
                  <div class="col-12 text-center">
                       Already got an account? <nuxt-link to="/login">Login</nuxt-link>
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$router.push('/');
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },
  destroyed() {
    this.$store.dispatch("validation/clearErrors")
  },
};
</script>
