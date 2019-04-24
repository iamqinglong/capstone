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
                                    <div class="row" @submit.prevent="create">
                                        <div class="col-md-12">
                                            <div class="card-box">
                                                <h4 class="m-t-0 header-title">Device general information</h4>
                                                <p class="text-muted m-b-30 font-13">
                                                    Here you can modify display name or other general information
                                                </p>

                                                <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Device Name</label>
                                                            <input v-model.trim="form.device_name" type="text" required="true" class="form-control" id="" placeholder="Device Name">
                                                            <small class="form-text text-danger" v-if="errors.device_name">{{errors.device_name}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Data Source</label>
                                                            <input v-model.trim="form.data_source" type="text" required="true" class="form-control" id="" placeholder="Data Source">
                                                            <small class="form-text text-danger" v-if="errors.data_source">{{errors.data_source}}</small>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="" class="col-form-label">Location</label>
                                                        <input v-model.trim="form.location" type="text" required="true" class="form-control" id="" placeholder="Set device location">
                                                        <small class="form-text text-danger" v-if="errors.location">{{errors.location}}</small>
                                                    </div>
                                                   
                                                    <!-- <button @click.prevent="create" type="submit" class="btn btn-primary">Create Device</button> -->
                                                    <button type="submit" class="btn btn-primary">Connect Device</button>
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
            form : {
                device_name: '',
                data_source: '',
                location: '',
            }
        }
    },
    async asyncData({store}) {
        await store.dispatch("notification/setUserMessagesRec")
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
                console.log(this.form)
                let result = await this.$axios.post('/api/createDevice',{

                    device_name: this.form.device_name,
                    data_source: this.form.data_source,
                    location: this.form.location

                })
                
                this.$swal.fire({
                        title: 'Created!',
                        text: `${result.data.message}`,
                        type: 'success',
                        confirmButtonText: 'Ok'
                    })

                this.$router.push('/devices');
            } catch (error) {
                console.log(error)
            }
        },
        async cancel (){
            try {
                 this.$router.push('/devices');
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
