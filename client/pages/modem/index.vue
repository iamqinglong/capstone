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
                                        <div class="col-md-6">
                                            <div class="card-box">
                                                <h4 class="m-t-0 header-title">Modem general information</h4>
                                                <p class="text-muted m-b-30 font-13">
                                                    Here you can view displayed information or other general information
                                                </p>

                                                <form @submit.prevent="connect" >
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Modem</label>
                                                            <b-form-input :disabled="status == true" v-model="modemPort" type="text" required="" class="form-control" id="" placeholder="Enter modem port"></b-form-input>
                                                            <small class="form-text text-danger" v-if="errors.modemPort">{{errors.modemPort}}</small>
                                                        </div>
                                                    </div>
                                                    <button :disabled="status == true" type="submit" class="btn btn-primary">Connect Modem</button>
                                                </form>

                                                
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="card-box">
                                                <h4 class="m-t-0 header-title">Modem status</h4>
                                                <p class="text-muted m-b-30 font-13">
                                                    Refresh to view the current status
                                                </p>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Number</label>
                                                            <b-form-input disabled v-model="modemNumber" type="text" required="" class="form-control" id="" placeholder="Modem Number Unavaible"></b-form-input>
                                                            <small class="form-text text-danger" v-if="errors.modemPort">{{errors.modemPort}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Signal Strength</label>
                                                            <b-form-input disabled v-model="signalStr" type="text" required="" class="form-control" id="" placeholder="Modem Signal Strength Unavaible"></b-form-input>
                                                            <small class="form-text text-danger" v-if="errors.modemPort">{{errors.modemPort}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Com Port</label>
                                                            <b-form-input disabled v-model="modemPort" type="text" required="" class="form-control" id="" placeholder="Modem Com Port Unavaible"></b-form-input>
                                                            <small class="form-text text-danger" v-if="errors.modemPort">{{errors.modemPort}}</small>
                                                        </div>
                                                    </div>
                                         

                                                
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
    data(){
        return {
            modemPort: '',
            comPort: '',
            modemNumber:'',
            signalStr: '',
            status: ''
        }
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
        
        return await $axios.get('/getModemDetails')

    .then((res) => {
        // console.log(res.data)
        return { modemDetails : res.data}

    })
    .catch((e) => {
        
        console.log(e)

    })
    },
    mounted() {
        if(this.modemDetails.status){
            this.status = this.modemDetails.status
            this.modemPort = this.modemDetails.comPort
            this.modemNumber = this.modemDetails.number
            this.signalStr = this.modemDetails.sigStrength
            console.log(this.modemDetails)
        }else{
            console.log(this.modemDetails)
        }
    },
    methods: {
        async connect(){
        //    let modem = await this.$axios.post('/openModem',{
        //         modemPort: this.modemPort
        //     })
        //     const api = this.$axios.post('/openModem',{
        //         modemPort: this.modemPort
        //     })
            this.$swal({
                title: 'Connecting may take a while!',
                allowOutsideClick: () => !this.$swal.isLoading()
            });
            this.$swal.showLoading();
            let modem = await this.$axios.post('/openModem',{
                modemPort: this.modemPort
            })
            
            if(modem.data.status){
                let details = await this.$axios.get('/getModemDetails')
                this.status = details.data.status
                this.modemPort = details.data.comPort
                this.modemNumber = details.data.number
                this.signalStr = details.data.sigStrength
                this.$swal.close();
            }
            else{
                console.log(modem.data)
                 this.$swal.fire({
                                title: 'Error!',
                                text: `${modem.data.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                })
                    // this.$swal.close();
            }
  
            
            // this.$swal.fire({
            //     title: 'This may take a while',
            //     // input: 'text',
            //     // inputAttributes: {
            //     //     autocapitalize: 'off'
            //     // },
            //     // showCancelButton: true,
            //     // confirmButtonText: 'Look up',
            //     // showLoaderOnConfirm: true,
            //     onOpen: async () => {
            //         return await this.$axios.post('/openModem',{
            //             modemPort: this.modemPort
            //         })
            //         .then(response => {
            //             console.log(response)
            //             if (!response.data.status) {
            //                 throw new Error(response.data.message)
            //             }
            //             else{

            //             }
            //             // this.$swal.close();
            //         })
            //         .catch(error => {
            //             this.$swal.showValidationMessage(
            //             `Request failed: ${error}`
            //             )
            //             // this.$swal.close();
                        
            //         })
            //     },
                
            //     allowOutsideClick: () => !this.$swal.isLoading()
            //     })
            //     this.$swal.showLoading();
            //     .then(async (result) => {
            //         console.log(result)
            //     // if (result.value.status) {
            //     //     console.log(result)
            //     //     let details = await this.$axios.get('/getModemDetails')
            //     //     this.status = details.data.status
            //     //     this.modemPort = details.data.comPort
            //     //     this.modemNumber = details.data.number
            //     //     this.signalStr = details.data.sigStrength

            //     //     console.log(details.data)
            //     // }
            // })
        //    if(modem.data.status){
        //         let details = await this.$axios.get('/getModemDetails')
        //         this.status = details.data.status
        //         this.modemPort = details.data.comPort
        //         this.modemNumber = details.data.number
        //         this.signalStr = details.data.sigStrength
        //    }else{
               
        //    }
        },
    },
}
</script>
