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
                                <div class="col-xl-3 col-lg-4">
                                    <div class="text-center card-box">
                                        <div class="member-card">
                                            <div class="thumb-xl member-thumb m-b-10 center-block">
                                                <img src="/images/users/avatar-1.jpg" class="rounded-circle img-thumbnail" alt="profile-image">
                                            </div>

                                            <div class="">
                                                <h5 class="m-b-5">{{user.firstName}} {{user.lastName}}</h5>
                                            </div>


                                            <div class="text-left m-t-40">
                                                <p class="text-muted font-13"><strong>Full Name :</strong> <span class="m-l-15">{{user.firstName}} {{user.lastName}}</span></p>

                                                <p class="text-muted font-13"><strong>Mobile :</strong><span class="m-l-15">{{user.number}}</span></p>

                                                <p class="text-muted font-13"><strong>Email :</strong> <span class="m-l-15">{{user.email}}</span></p>

                                            </div>

                                         
                                        </div>

                                    </div> <!-- end card-box -->

                                </div> <!-- end col -->


                                <div class="col-lg-8 col-xl-9">
                                    <div class="">
                                        <div class="card-box">
                                            <ul class="nav nav-tabs tabs-bordered">
                                             
                                                <li class="nav-item">
                                                    <a href="#settings" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                                        SETTINGS
                                                    </a>
                                                </li>
                                            </ul>
                                            <div class="tab-content">
                                                
                                                <div class="tab-pane active" id="settings">
                                                    <form @submit.prevent="update">
                                                        <div class="form-group">
                                                            <label for="FullName">First Name</label>
                                                            <input type="text" v-model="fName" required class="form-control">
                                                            <small class="form-text text-danger" v-if="errors.firstName">{{errors.firstName}}</small>
                                                        </div>
                                                         <div class="form-group">
                                                            <label for="FullName">Last Name</label>
                                                            <input type="text" v-model="lName" required class="form-control">
                                                            <small class="form-text text-danger" v-if="errors.lastName">{{errors.lastName}}</small>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="Email">Email</label>
                                                            <input type="email" v-model="email"   required class="form-control">
                                                            <small class="form-text text-danger" v-if="errors.email">{{errors.email}}</small>
                                                        </div>
                                                         <no-ssr>
                                                        <div class="form-group">
                                                            <label for="" class="col-form-label">Phone</label>
                                                            <vue-phone-number-input v-model="phone_number" 
                                                            :only-countryies="onlyCountries"
                                                            :default-country-code="defaultCountry"
                                                            @update="onUpdate"
                                                            />
                                                            <small class="form-text text-danger" v-if="errors.phoneNumber">{{errors.phoneNumber}}</small> 
                                                            <!-- <input v-model.trim="form.phone_number" type="number" class="form-control" id="" placeholder="Phone"> -->
                                                        </div>
                                                        </no-ssr>
                                                        <div class="form-group">
                                                            <label for="Password">Password</label>
                                                            <input type="password" v-model="password" placeholder="Password" required class="form-control">
                                                            <small class="form-text text-danger" v-if="errors.password">{{errors.Password}}</small>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="RePassword">Re-Password</label>
                                                            <input type="password" v-model="repassword" placeholder="Retype password" required class="form-control">
                                                            <small class="form-text text-danger" v-if="errors.confirm">{{errors.confirm}}</small>
                                                        </div>
                                                        
                                                        <button class="btn btn-primary waves-effect waves-light w-md" type="submit">Save</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div> <!-- end col -->
                            </div>
                            <!-- end row -->

                            </div>
                        </div>
                    </div>
                    <!-- end page title end breadcrumb -->
                </div> <!-- end container -->
        </div>
        <!-- Footer -->
        <!-- <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        2016 - 2018 © Minton - Coderthemes.com
                    </div>
                </div>
            </div>
        </footer> -->
        <!-- End Footer -->
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
 
Vue.component('vue-phone-number-input', VuePhoneNumberInput);
export default {
  middleware: 'auth',
  data() {
      return {
        //   oldUser: {},
          password: '',
          repassword:'',
          fName: '',
          lName: '',
          email: '',
          phone_number: '',
          onlyCountries: ['PH'],
          defaultCountry: 'PH',
          results: {},
      }
  },
  mounted() {
      this.fName = this.user.firstName
      this.lName = this.user.lastName
      this.email = this.user.email
      this.phone_number = this.user.number
  },
  methods: {
      async update() {

            
                try {
                    if(this.password === this.repassword)
                    {
                        // console.log(this.user._id)
                         if(this.results.isValid & this.results.countryCode == 'PH'){
                            let result = await this.$axios.put(`/api/updateUser/${this.user._id}`, {

                                firstName: this.fName,
                                lastName: this.lName,
                                email: this.email, 
                                password: this.password,
                                number: this.results.formattedNumber

                            })
                            if(result.data.status)
                            {
                                this.$store.dispatch("auth/setUser", result.data.user)
                                this.$swal.fire({
                                    title: 'Created!',
                                    text: `${result.data.message}`,
                                    type: 'success',
                                    confirmButtonText: 'Ok'
                                })
                                this.fName = result.data.user.firstName
                                this.lName = result.data.user.lastName
                                this.email = result.data.user.email 
                                this.phone_number = result.data.number
                                this.password = ''
                                this.repassword = ''
                                // this.$router.back();
                            }
                            else
                            {
                                this.$swal.fire({
                                            title: 'Error!',
                                            text: `${result.data.message}`,
                                            type: 'error',
                                            confirmButtonText: 'Ok'
                                        })
                            }
                         }else{
                             this.$store.dispatch("validation/setErrors", {phoneNumber : `Invalid input`})
                         }
                    }
                    else{
                        // let data = {
                        //     confirm : `Confirm Password didn't match`
                        // }
                    this.$store.dispatch("validation/setErrors", {confirm : `Confirm Password didn't match`})
                    }
                } catch (error) {

                    console.log(error.message)

                }
           

        },
        onUpdate(payload) {
            this.results = payload
        },
  },
  destroyed() {
        this.$store.dispatch("validation/clearErrors")
    },
}
</script>

<style>
.field .field-input[data-v-55b51f4d] {
    cursor: pointer;
    background-color: #fff;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    position: relative;
    width: 100%;
    height: 42px;
    min-height: 42px;
    padding: 0 12px;
    font-weight: 400;
    -webkit-appearance: none;
    outline: none;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 4px;
    font-size: 14px;
    z-index: 0;
}
.country-selector .field-input[data-v-7e349bb5] {
    background-color: #fff;
    position: relative;
    width: 100%;
    height: 42px;
    min-height: 42px;
    padding-right: 18px;
    font-weight: 400;
    -webkit-appearance: none;
    border-radius: 4px;
    font-size: 13px;
    z-index: 0;
}

body {
    color: #bbb5b5;
}

.vue-phone-number-input .input-phone-number:not(.is-dark):not(.is-disabled) input {
    background-color: #fff!important;
}
</style>