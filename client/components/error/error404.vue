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
<!--                             
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card-box">
                                               
                                                <div class="error-404">
                                                    <h1>This page doesn’t exist</h1>
                                                    <p>The link you clicked on may be broken or no longer exist.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                                    <!-- end row -->
                                    <div class="container">
                                     <div class="error-404">
                                        <h1>This page doesn’t exist</h1>
                                        <p>The link you clicked on may be broken or no longer exist.</p>
                                    </div>
                                    </div>
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
  name: 'error-404',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>