<template>
  <div>
    <Navbar/>
            <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                       © Capstone  Project 
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer -->
    <nuxt/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
body {
    color: #f3f3f3;
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
