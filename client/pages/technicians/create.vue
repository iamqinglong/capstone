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
                                                    <div class="form-group">
                                                        <label for="" class="col-form-label">Phone</label>
                                                        <input v-model.trim="form.phone_number" type="number" class="form-control" id="" placeholder="Phone">
                                                    </div>
                                                   
                                                    <button @click.prevent="create" type="submit" class="btn btn-primary">Create Technician</button>
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

export default {
    middleware: 'auth',
    data() {
        return {
            form : {
                first_name: '',
                last_name: '',
                phone_number: '',
            }
        }
    },
    //testing cloning git branch
    methods: {
        async create () {
            try {
                console.log(this.form)
                let result = await this.$axios.post('/createTech/',{

                    first_name: this.form.first_name,
                    last_name: this.form.last_name,
                    phone_number: this.form.phone_number

                })
                
                this.$swal.fire({
                        title: 'Created!',
                        text: `${result.data.message}`,
                        type: 'success',
                        confirmButtonText: 'Ok'
                    })

                this.$router.push('/technicians');
            } catch (error) {
                console.log(error)
            }
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
