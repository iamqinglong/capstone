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
                                                <h4 class="m-t-0 header-title">Technician general information</h4>
                                                <p class="text-muted m-b-30 font-13">
                                                    Here you can modify display name or other general information
                                                </p>

                                                <form>
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">First Name</label>
                                                            <input  v-model.trim="tech.first_name" class="form-control" id="" placeholder="First Name" >
                                                            <small class="form-text text-danger" v-if="errors.first_name">{{errors.first_name}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Last Name</label>
                                                            <input v-model.trim="tech.last_name" type="text" class="form-control" id="" placeholder="Last Name">
                                                            <small class="form-text text-danger" v-if="errors.last_name">{{errors.last_name}}</small>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="" class="col-form-label">Phone</label>
                                                        <input v-model.trim="tech.phone_number" type="number" class="form-control" id="" placeholder="Phone">
                                                    </div>
                                                   
                                                    <button @click.prevent="update" type="submit" class="btn btn-primary">Update Technician</button>
                                                    <button @click.prevent="deleteTech" type="submit" class="btn btn-danger">Delete Technician</button>
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
import axios from 'axios'
export default {
    data() {
        return {
           
        }
    },
    // validate ({ params }) {
    //     // Must be a number
    //     return params.id
    // },
    async asyncData ({ params, error, $axios, store }) {
        
      await store.dispatch("notification/setUserMessagesRec")
      return  await $axios.get(`/getTechnician/${params.id}`)
        
    .then((res) => {
        return { 
                tech: {
                    id : res.data.technician[0]._id,
                    first_name: res.data.technician[0].first_name,
                    last_name: res.data.technician[0].last_name,
                    phone_number: res.data.technician[0].phone_number, 
                    },
                oldTech: {
                    id : res.data.technician[0]._id,
                    first_name: res.data.technician[0].first_name,
                    last_name: res.data.technician[0].last_name,
                    phone_number: res.data.technician[0].phone_number, 
                    },
                    
                }

    })
    .catch((e) => {
        
        error({ statusCode: 404, message: 'Technician not found' })
    })
    },
    head(){
        return {
            title:'Edit | ' + this.tech.first_name
        }
    },
    
    async mounted() {
      this.data = this.technician
      
      this.$mqtt = await this.$mqtt
        this.$mqtt.subscribe('/notification')
        this.$mqtt.on('message', async (topic, message,packet)  => {
            
            if(topic === '/notification')
            {
                let msg = JSON.parse( message.toString('utf8') )
                // this.$store.dispatch("notification/newMessageNotification", msg[0])
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
        async update (){

           let result = JSON.stringify(this.tech) === JSON.stringify(this.oldTech) 
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

                    await this.$axios.put(`/updateTechnician/${this.tech.id}`, {

                        first_name: this.tech.first_name,
                        last_name: this.tech.last_name,
                        phone_number: this.tech.phone_number, 

                    })

                    this.$router.back()
                } catch (error) {

                    console.log(error.message)

                }
           }
           
        },

        async deleteTech (){
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
                
                        let res = await this.$axios.delete(`/deleteTech/${this.tech.id}`)
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
                            this.$router.back()
                        }

                    }
               

            } catch (error) {
                console.log(error)
            }
           
        },
        async cancel (){
            try {
                 this.$router.back()
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
