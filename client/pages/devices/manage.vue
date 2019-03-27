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
                                <div class="row">
                                    <div class="col-lg-12">
                                    <div class="card-box">
                                        <div>
                                        <h4 class="m-t-0 header-title">Devices</h4>
                                        <p class="text-muted font-14 m-b-20">
                                           List of Devices
                                        </p>
                                        <div >
                                          <nuxt-link to="/devices/create">
                                            <button type="button" class="btn btn-primary waves-effect waves-light">Connect a new device</button>
                                          </nuxt-link> 
                                        </div>
                                        </div>
                                        <table class="table">
                                            <thead class="thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Device Name</th>
                                                <th>Data Source</th>
                                                <th>Location</th>
                                                <th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Actions" style="width: 223.2px;">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            
                                            </tbody>
                                        </table>
                                    </div>

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
                       © Capstone Project
                  </div>
              </div>
          </div>
      </footer> -->
      <!-- End Footer -->
  	
  	</div>
</template>