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
                            <!-- Form row -->
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card-box">
                                                <h4 class="m-t-0 header-title">Account general information</h4>
                                                <p class="text-muted m-b-30 font-13">
                                                    Here you can modify display name or other general information
                                                </p>

                                                <form @submit.prevent="create">
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">First Name</label>
                                                            <b-form-input v-model="firstName" type="text" required="" class="form-control" id="" placeholder="First Name"></b-form-input>
                                                            <small class="form-text text-danger" v-if="errors.firstName">{{errors.firstName}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Last Name</label>
                                                            <input v-model="lastName" type="text" required="true" class="form-control" id="" placeholder="Last Name">
                                                            <small class="form-text text-danger" v-if="errors.lastName">{{errors.lastName}}</small>
                                                        </div>
                                                    </div>
                                                     <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Email</label>
                                                            <!-- <input name="email" v-model="email" class="form-control" type="email" placeholder="Email"> -->
                                                            <input v-model="email" type="email" required="true" class="form-control" id="" placeholder="Email">
                                                            <small class="form-text text-danger" v-if="errors.email">{{errors.email}}</small>
                                                        </div>
                                                        <no-ssr>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Phone</label>
                                                            <vue-phone-number-input v-model="number" 
                                                            :only-countryies="onlyCountries"
                                                            :default-country-code="defaultCountry"
                                                            @update="onUpdate"
                                                            />
                                                            <small class="form-text text-danger" v-if="errors.phoneNumber">{{errors.phoneNumber}}</small> 
                                                            <!-- <input v-model.trim="form.phone_number" type="number" class="form-control" id="" placeholder="Phone"> -->
                                                        </div>
                                                        </no-ssr>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Password</label>
                                                            <input v-model="password" type="password" required="true" class="form-control" id="" placeholder="Password">
                                                            <small class="form-text text-danger" v-if="errors.password">{{errors.Password}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Confirm Password</label>
                                                            <input v-model="confirm" type="password" required="true" class="form-control" id="" placeholder="Confirm">
                                                            <small class="form-text text-danger" v-if="errors.confirm">{{errors.confirm}}</small>
                                                        </div>
                                                    </div>
                                                   
                                                    <button type="submit" class="btn btn-primary">Create Account</button>
                                                    <button @click.prevent="cancel" type="submit" class="btn btn-warning waves-effect waves-light">Cancel</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </div>
                        </div>
                    </div>
                    <!-- end page title end breadcrumb -->
                </div> <!-- end container -->
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
 
Vue.component('vue-phone-number-input', VuePhoneNumberInput);
export default {
    middleware: 'auth',
    data() {
        return {

            firstName: '',
            lastName:'',
            email:'',
            password:'',
            confirm:'',
            number: '',
            onlyCountries: ['PH'],
            defaultCountry: 'PH',
            results: {},
        }
    },
    async asyncData({store}) {
        // await store.dispatch("notification/setUserMessagesRec")
    },
    async mounted() {

        // this.$mqtt = await this.$mqtt
        // this.$mqtt.subscribe('/notification')
        // this.$mqtt.on('message', async (topic, message,packet)  => {
            
        //     if(topic === '/notification')
        //     {
        //         let msg = JSON.parse( message.toString('utf8') )
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
    methods: {
        async create () {
            try {
                
                if(this.confirm === this.password)
                {
                    if(this.results.isValid & this.results.countryCode == 'PH'){
                        let result = await this.$axios.post('/api/createUser',{

                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            password: this.password,
                            number: this.results.formattedNumber

                        })
                        
                        this.$swal.fire({
                                title: 'Created!',
                                text: `${result.data.message}`,
                                type: 'success',
                                confirmButtonText: 'Ok'
                            })

                        this.$router.back();
                    }else{
                        this.$store.dispatch("validation/setErrors", {phoneNumber : `Invalid input`})
                    }
                }
                else
                {
                    let data = {
                        confirm : `Confirm Password didn't match`
                    }
                    this.$store.dispatch("validation/setErrors", data)
                    // this.errors.confirm = `Confirm Password didn't match`
                }
            } catch (error) {
                console.log(error)
            }
        },
        async cancel (){
            try {
                 this.$router.push('/accounts');
            } catch (error) {
                console.log(error)
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
    color: #fafafa;
}

.vue-phone-number-input .input-phone-number:not(.is-dark):not(.is-disabled) input {
    background-color: #fff!important;
}
</style>