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
                                        <h4 class="m-t-0 header-title">Events and actions</h4>
                                        <p class="text-muted font-14 m-b-20">
                                           Set different actions for specific events that might occure to this device
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
                                                <th>Condition</th>
                                                <th>Statement</th>
                                                <th>Value</th>
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

<script>

import style_ten from '@/static/css/style_ten.css'
import style_thirteen from '@/static/css/style_thirteen.css'

import axios from 'axios'

  export default {
    async asyncData ({ params, error }) {

      
      return await axios.get(`http://localhost:8000/api/getDeviceTechnician/${params.id}`)
        
    .then((res) => {
        // let temp = JSON.stringify(res.data)
        // JSON.parse(temp)
        console.log(res.data)
        return { device: res.data }

    })
    .catch((e) => {
        
        error({ statusCode: 404, message: 'This page is nowhere to be found' })
    })
    },
    head(){
        return {
            title:'Manage | ' + this.device[0].device_name
        }
    },
    mounted(){
      console.log(this.device)
    }
  }
  
</script>