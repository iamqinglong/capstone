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

                                                <form @submit.prevent="update">
                                                    <div class="form-row">
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">First Name</label>
                                                            <input v-model.trim="account.firstName" type="text" required class="form-control" id="" placeholder="First Name">
                                                            <small class="form-text text-danger" v-if="errors.firstName">{{errors.firstName}}</small>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label for="" class="col-form-label">Last Name</label>
                                                            <input v-model.trim="account.lastName" type="text" required class="form-control" id="" placeholder="Last Name">
                                                            <small class="form-text text-danger" v-if="errors.lastName">{{errors.lastName}}</small>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="" class="col-form-label">Email</label>
                                                        <input v-model.trim="account.email" type="email" required class="form-control" id="" placeholder="Email">
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
                                                   
                                                    <button  type="submit" class="btn btn-primary">Update Account</button>
                                                    <button @click.prevent="deleteAcct" type="submit" class="btn btn-danger">Delete Account</button>
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
            password : '',
            confirm : ''
        }
    },
    async asyncData({ store, params, $axios}) {
        try {
            await store.dispatch("notification/setUserMessagesRec")
            let result = await $axios.get(`/api/getUserById/${params.id}`)
            return {
                    id: result.data.user._id,
                    account :{ 
                        firstName : result.data.user.firstName,
                        lastName :  result.data.user.lastName,
                        email : result.data.user.email},
                    oldAcct : {
                        firstName : result.data.user.firstName,
                        lastName :  result.data.user.lastName,
                        email : result.data.user.email}
            }
        } catch (error) {
            console.log(error)
        }
        
    },
    head(){
        return {
            title:'Edit | ' + this.account.firstName 
        }
    },
    async mounted() {

        // this.$mqtt = await this.$mqtt
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
        async update() {

            let result = JSON.stringify(this.account) === JSON.stringify(this.oldAcct) 
           console.log(this.account)
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
                    if(this.confirm === this.password)
                    {
                        let result = await this.$axios.put(`/api/updateUser/${this.id}`, {

                            firstName: this.account.firstName,
                            lastName: this.account.lastName,
                            email: this.account.email, 
                            password: this.password

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
           }

        },
        async deleteAcct (){
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
                
                        let res = await this.$axios.delete(`/api/deleteUser/${this.id}`)
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
                            this.$router.push('/accounts');
                        }

                    }
               

            } catch (error) {
                console.log(error)
            }
           
        },
        async cancel (){
        
            this.$router.back(); 
        },
    },
}
</script>
