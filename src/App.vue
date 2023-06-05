<template>
  <header>
    <Navbar />
    <billboards />
  </header>
  <main>
    <router-view />
  </main>
   <footer class="bg-dark text-light">
    Made with 💖 by Jibbles
  </footer>

</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
// import Navbar from './components/Navbar.vue'
import Billboards from "./components/Billboards.vue"
import { logger } from "./utils/Logger.js"
import { postsService } from "./services/PostsService.js"
import Pop from "./utils/Pop.js"
import { billboardsService } from "./services/BillboardsService.js"
// import { api } from "./services/AxiosService.js"


export default {
  name: "App",
  setup() {
    async function getBillboards(){
        try {
          await billboardsService.getBillboards()
        } catch (error) {
          logger.error('Getting Billboards', error)
          Pop.error(error)
        }
      }

      onMounted(() => {
        getBillboards()
      })
        return {
            AppState: computed(() => AppState),
            Billboards: computed(() => AppState.billboards),
            
            // async createPost(){
            //   try {
            //     let form = window.event.target
            //     let newPost = {
            //       body: form.body.value,
            //       imgUrl: form.imgUrl.value
            //     }
            //     await postsService.createPost(newPost)
            //     form.reset()
            //   } catch (error) {
            //     logger.error('creating post?', error)
            //     Pop.error('Log in first bucko', error)
            //   }
            // }
    }
  },
  components: { Billboards }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
