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

                                                <form @submit.prevent="update">
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Device Name</label>
                                                            <input  v-model.trim="device.device_name" required="true" class="form-control" id="" placeholder="Device Name" >
                                                            <small class="form-text text-danger" v-if="errors.device_name">{{errors.device_name}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Device ID</label>
                                                            <input disabled v-model.trim="device.data_source" required="true" type="text" class="form-control" id="" placeholder="Data Source">
                                                            <small class="form-text text-danger" v-if="errors.data_source">{{errors.data_source}}</small>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Location</label>
                                                            <input v-model.trim="device.location" required="true" type="text" class="form-control" id="" placeholder="Set device location">
                                                        </div>
                                                        <div class="form-group col-md-3">
                                                            <label for="" class="col-form-label">Unit</label>
                                                            <b-form-select v-model.trim="device.selectedUnit" :options="optionsUnit"></b-form-select>
                                                        </div>
                                                    </div>
                                                    <!-- <button @click.prevent="update" type="submit" class="btn btn-primary">Update Device</button> -->
                                                    <button  type="submit" class="btn btn-primary">Update Device</button>
                                                    <button @click.prevent="deleteDevice" type="submit" class="btn btn-danger">Delete Device</button>
                                                    <button @click.prevent="cancel" type="submit" class="btn btn-warning">Cancel</button>
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
// import axios from 'axios'
export default {
    middleware: 'auth',
    data() {
        return {
            // name : 'Test',
            // data_source : '',
            // location : '',
            // error : ''
            optionsUnit: [
                { value: '°C', text: `°C` },
                { value: 'mg/L', text: `mg/L` },
            ],
        }
    },
    validate ({ params }) {
        // Must be a number
        return params.id
    },
    async asyncData ({ params, error, $axios, store}) {
        // await store.dispatch("notification/setUserMessagesRec")
      return await $axios.get(`/api/getDevice/${params.id}`)
        
    .then((res) => {
        // console.log(res.data.device[0]._id)
        return { 
                device: {
                    id : res.data.device[0]._id,
                    device_name: res.data.device[0].device_name,
                    data_source: res.data.device[0].data_source,
                    location: res.data.device[0].location,
                    // symbol: res.data.device[0].symbol,
                    selectedUnit: res.data.device[0].symbol,
                   
                    },
                oldDevice: {
                    id : res.data.device[0]._id,
                    device_name: res.data.device[0].device_name,
                    data_source: res.data.device[0].data_source,
                    location: res.data.device[0].location, 
                    // symbol: res.data.device[0].symbol,
                    selectedUnit: res.data.device[0].symbol,
                    },
                }

    })
    .catch((e) => {
        
        // console.log(e)
        error({ statusCode: 404, message: 'Device not found' })
    })
    },
    head(){
        return {
            title:'Edit | ' + this.device.device_name
        }
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
        async update (){

           let result = JSON.stringify(this.device) === JSON.stringify(this.oldDevice) 
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
                try {

                    let res = await this.$axios.put(`/api/updateDevice/${this.device.id}`, {

                         device_name: this.device.device_name,
                        data_source: this.device.data_source,
                        location: this.device.location,
                        symbol: this.device.selectedUnit

                    })
                    this.$swal.fire({
                                title: 'Updated!',
                                text: `${res.data.message}`,
                                type: 'success',
                            })
                    this.$router.push('/devices');
                } catch (error) {

                    console.log(error.message)

                }
           }
           
        },

        async deleteDevice (){
            try {
               
                 const {value: result}  = await this.$swal.fire({

                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'

                    })
                    if (result) {
                
                        let res = await this.$axios.delete(`/api/deleteDevice/${this.device.id}`)
                        if(!res.data.status){

                            this.$swal.fire({
                                title: 'Error!',
                                text: `${res.data.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })

                        }
                        else{
                        
                            this.$swal.fire({
                                title: 'Deleted!',
                                text: `${res.data.message}`,
                                type: 'success',
                            })
                            this.$router.push('/devices');
                            // console.log(result)
                        }

                        // this.$swal.fire(
                        // 'Deleted!',
                        // 'Your file has been deleted.',
                        // 'success'
                        // )
                    }
               

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
