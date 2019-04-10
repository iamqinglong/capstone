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

                                                <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">First Name</label>
                                                            <input v-model="firstName" type="text" required="" class="form-control" id="" placeholder="First Name">
                                                            <small class="form-text text-danger" v-if="errors.firstName">{{errors.firstName}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Last Name</label>
                                                            <input v-model="lastName" type="text" required="" class="form-control" id="" placeholder="Last Name">
                                                            <small class="form-text text-danger" v-if="errors.lastName">{{errors.lastName}}</small>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="" class="col-form-label">Email</label>
                                                        <input v-model="email" type="email" required="" class="form-control" id="" placeholder="Email">
                                                        <small class="form-text text-danger" v-if="errors.email">{{errors.email}}</small>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Password</label>
                                                            <input v-model="password" type="password" required="" class="form-control" id="" placeholder="Password">
                                                            <small class="form-text text-danger" v-if="errors.password">{{errors.Password}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Confirm Password</label>
                                                            <input v-model="confirm" type="password" required="" class="form-control" id="" placeholder="Confirm">
                                                            <small class="form-text text-danger" v-if="errors.confirm">{{errors.confirm}}</small>
                                                        </div>
                                                    </div>
                                                   
                                                    <button @click.prevent="create" type="submit" class="btn btn-primary">Create Account</button>
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

export default {
    middleware: 'auth',
    data() {
        return {

            firstName: '',
            lastName:'',
            email:'',
            password:'',
            confirm:'',
        }
    },
    async asyncData({store}) {
        await store.dispatch("notification/setUserMessagesRec")
    },
    async mounted() {

        this.$mqtt = await this.$mqtt
        this.$mqtt.subscribe('/notification')
        this.$mqtt.on('message', async (topic, message,packet)  => {
            
            if(topic === '/notification')
            {
                let msg = JSON.parse( message.toString('utf8') )
                await this.$store.dispatch("notification/setUserMessagesRec")

                this.$izitoast.warning({
                                    title: 'Caution',
                                    message: `${msg[0].subject}`,
                                    
                                        closeOnClick: true,
                                        onClosing: function(instance, toast, closedBy) {
                                        console.info("Closing | closedBy: " + closedBy);
                                        },
                                        onClosed: function(instance, toast, closedBy) {
                                        console.info("Closed | closedBy: " + closedBy);
                                        }
                                    })

            }
            
        })
    },
    methods: {
        async create () {
            try {
                
                if(this.confirm === this.password)
                {
                    let result = await this.$axios.post('/createUser',{

                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password

                    })
                    
                    this.$swal.fire({
                            title: 'Created!',
                            text: `${result.data.message}`,
                            type: 'success',
                            confirmButtonText: 'Ok'
                        })

                    this.$router.back();
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
        
    },
    destroyed() {
        this.$store.dispatch("validation/clearErrors")
    },
}
</script>
