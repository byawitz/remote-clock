<template>
  <header>
    <div>RemoteClock</div>
    <div>
      <router-link v-if="route.name !== 'dashboard'" to="dashboard">Dashboard</router-link>
      <router-link v-if="route.name === 'dashboard'" to="/">Home</router-link>
    </div>
  </header>

  <main>
    <RouterView/>
  </main>

  <footer>
    remote-clock 0.0.1 <a href="https://github.com/byawitz/remote-clock" target="_blank">source code</a>
  </footer>
</template>
<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'

const route = useRoute();

</script>
