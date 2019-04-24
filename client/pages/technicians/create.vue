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
                                                <h4 class="m-t-0 header-title">Device general information</h4>
                                                <p class="text-muted m-b-30 font-13">
                                                    Here you can modify display name or other general information
                                                </p>

                                                 <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">First Name</label>
                                                            <input  v-model.trim="form.first_name" class="form-control" id="" placeholder="First Name" >
                                                            <small class="form-text text-danger" v-if="errors.first_name">{{errors.first_name}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Last Name</label>
                                                            <input v-model.trim="form.last_name" type="text" class="form-control" id="" placeholder="Last Name">
                                                            <small class="form-text text-danger" v-if="errors.last_name">{{errors.last_name}}</small>   
                                                        </div>
                                                    </div>
                                                    <no-ssr>
                                                    <div class="form-group">
                                                        <label for="" class="col-form-label">Phone</label>
                                                        <vue-phone-number-input v-model="form.phone_number" 
                                                        :only-countryies="onlyCountries"
                                                        :default-country-code="defaultCountry"
                                                        @update="onUpdate"
                                                        />
                                                        <small class="form-text text-danger" v-if="errors.phoneNumber">{{errors.phoneNumber}}</small> 
                                                        <!-- <input v-model.trim="form.phone_number" type="number" class="form-control" id="" placeholder="Phone"> -->
                                                    </div>
                                                    </no-ssr>
                                                   
                                                    <button @click.prevent="create" type="submit" class="btn btn-primary">Create Technician</button>
                                                    <button @click.prevent="cancel" type="submit" class="btn btn-warning">Cancel</button>
                                                    <!-- {{ results }} -->
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
import Vue from 'vue'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
 
Vue.component('vue-phone-number-input', VuePhoneNumberInput);
export default {
    middleware: 'auth',
    // components: {VuePhoneNumberInput},
    data() {
        return {
            form : {
                first_name: '',
                last_name: '',
                phone_number: '',
            },
            onlyCountries: ['PH'],
            defaultCountry: 'PH',
            results: {},
        }
    },
     async asyncData({store}) {
      await store.dispatch("notification/setUserMessagesRec")
    },
    async mounted() {
      this.data = this.technician
      
    //   this.$mqtt = await this.$mqtt
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
    methods: {
        async create () {
            try {
                
                if(this.results.isValid & this.results.countryCode == 'PH'){
                    console.log(this.results.formattedNumber)
                    let result = await this.$axios.post('/api/createTech/',{

                    first_name: this.form.first_name,
                    last_name: this.form.last_name,
                    phone_number: this.results.formattedNumber

                    })
                
                    this.$swal.fire({
                            title: 'Created!',
                            text: `${result.data.message}`,
                            type: 'success',
                            confirmButtonText: 'Ok'
                        })

                    this.$router.push('/technicians');
                }
                else{
                    this.$store.dispatch("validation/setErrors", {phoneNumber : `Invalid input`})
                }
                
            } catch (error) {
                console.log(error)
            }
        },
        onUpdate(payload) {
            this.results = payload
        },
        async cancel (){
            try {
                 this.$router.push('/technicians');
            } catch (error) {
                console.log(error)
            }
           
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
    width: 45%;
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
