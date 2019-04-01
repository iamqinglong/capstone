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
                                                    
                                            
                                                    <button @click.prevent="create" type="submit" class="btn btn-primary">Create Event</button>
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
            value: 1,
            selectedCondition: 'if',
            optionsCondition: [
            { value: 'if', text: 'If' },
            { value: 'if_not', text: 'If not' },
            ],
            selectedStatement: 'if',
            optionsStatement: [
            { value: 'if', text: 'If' },
            { value: 'if_not', text: 'If not' },
            ],
            selectedValue: 'if',
            optionsValue: [
            { value: 'if', text: 'If' },
            { value: 'if_not', text: 'If not' },
            ],
            selectedActions: 'if',
            optionsActions: [
            { value: 'if', text: 'If' },
            { value: 'if_not', text: 'If not' },
            ],
        }
    },
    async asyncData({params, error}) {
        return params.id
    },
    methods: {
        async create () {
            try {
                console.log(this.form)
                let result = await this.$axios.post('/createDevice',{

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
