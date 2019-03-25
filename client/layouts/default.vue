<template>
  <div>
    <Navbar/>
    
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
