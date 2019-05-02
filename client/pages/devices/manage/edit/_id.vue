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
                                                <h4 class="m-t-0 header-title">Event general information</h4>
                                                <p class="text-muted m-b-30 font-13">
                                                    Here you can modify/set your action or other general information
                                                </p>

                                                <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-3">
                                                            <label for="" class="col-form-label">Condition</label>
                                                            <b-form-select v-model="selectedCondition" :options="optionsCondition"></b-form-select>
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                            <label for="" class="col-form-label">Statement</label>
                                                            <b-form-select v-model="selectedStatement" :options="optionsStatement"></b-form-select>
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                            <label for="" class="col-form-label">Value</label>
                                                            <input v-model="value" type="number" required="" class="form-control" id="" placeholder="">
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                            <label for="" class="col-form-label">Actions</label>
                                                            <b-form-select v-model="selectedActions" :options="optionsActions"></b-form-select>
                                                        </div>
                                                    </div>
                                                    
                                            
                                                    <button @click.prevent="update" type="submit" class="btn btn-primary">Update Event</button>
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
        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        2016 - 2018 © Minton - Coderthemes.com
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer -->
    </div>
</template>

<script>

export default {
    middleware: 'auth',
    data() {
        return {
            value: null,
            selectedCondition: null,
            optionsCondition: [
                { value: 'if', text: 'If' },
                { value: 'if not', text: 'If not' },
            ],
            selectedActions: 'Send a text message',
            optionsActions: [
                { value: 'Send a text message', text: 'Send a text message' },
            ],
            selectedStatement: null,
            optionsStatement: [
                // { value: 'goes more than', text: `${res.data.device[0].device_name} goes more than` },
                // { value: 'goes less than', text: `${res.data.device[0].device_name} goes less than` },
                // { value: 'idle for', text: `${res.data.device[0].device_name} is idle for` },
            ],
        }
    },
    async asyncData({params, error, $axios, store }) {
        // let res = await $axios.get(`/getEvent/${params.id}`)
        // await store.dispatch("notification/setUserMessagesRec")
        const [evId, devId ] = params.id.split('_')

        let [event, device] =  await Promise.all([ 
                                 $axios.get(`/api/getEvent/${evId}`),
                                 $axios.get(`/api/getDevice/${devId}`),
                              ])
        return {
            devId: devId,
            id: evId,
            event: event.data,
            oldEvent: event.data,
            device: device.data.device[0],
            
        }
    },
    head(){
        return {
            title:'Edit | ' + this.device.device_name
        }
    },
    async mounted() {
        // console.log(this.event.result)
        this.value = this.event.result.value
        this.selectedCondition = this.event.result.condition
        this.selectedStatement = this.event.result.statement,
        this.optionsStatement.push(
                { value: 'goes more than', text: `${this.device.device_name} goes more than` },
                { value: 'goes less than', text: `${this.device.device_name} goes less than` },
                // { value: 'idle for', text: `${this.device.device_name} is idle for` },
                )


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
               
                let result = await this.$axios.post(`/api/createEvent/${this.id}`,{

                    condition: this.selectedCondition,
                    statement: this.selectedStatement,
                    value: this.value,
                    action: this.selectedActions

                })
                if(result.data.status)
                {
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
                    this.$swal.fire({
                                title: 'Error!',
                                text: `${result.data.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })
                }
                
            } catch (error) {
                console.log(error)
            }
        },
        async cancel (){
        
            this.$router.back(); 
        },
        async update(){
        try {
            
            let event = {
                _id: this.id,
                condition: this.selectedCondition,
                statement: this.selectedStatement,
                value: parseInt(this.value),
                action: this.selectedActions,
            }
            let old = {
                _id: this.id,
                condition: this.oldEvent.result.condition,
                statement: this.oldEvent.result.statement,
                value: parseInt(this.oldEvent.result.value),
                action: this.oldEvent.result.action,
            }

            let result = JSON.stringify(event) === JSON.stringify(old)
            // console.log(result)
           if(result)
           {
                this.$swal.fire({
                    title: 'Unchange!',
                    text: 'No changes was detected',
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
           }
           else
           {
                
                let res = await this.$axios.post(`/api/updateEvent/${this.devId}`, {
                    id: this.id,
                    condition: this.selectedCondition,
                    statement: this.selectedStatement,
                    value: this.value,
                    action: this.selectedActions,
                })
                
                if(res.data.status)
                    {
                        this.$swal.fire({
                                title: 'Updated!',
                                text: `${res.data.message}`,
                                type: 'success',
                        })
                        this.$router.back()
                    }
                    else
                    {
                         this.$swal.fire({
                            title: 'Unchange!',
                            text: `${res.data.message}`,
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
              
           }
           
        } catch (error) {
            
        }
    },
    async cancel(){
        this.$router.back()
    }
    },
    
    destroyed() {
        this.$store.dispatch("validation/clearErrors")
    },
}
</script>
