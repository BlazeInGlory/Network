<template>
  <div class="card elevation-5 p-2 m-2">

    <!-- <billboards :billboardsProp="b" /> -->
    <!-- {{ Billboards }}

    <Billboards /> -->

    <form @submit.prevent="createPosts()">
      <div class="mb-3">
        <label for="" class="form-label">Comment</label>
        <input v-model="editable.body" type="text" class="form-control" id="forms" aria-describedby="emailHelp">
      </div>
      <button type="submit" class="btn btn-primary">Post it!</button>
    </form>
  </div>
    <div class="p-2 row" >
      <div class="card m-2 col-12 elevation-5 bg-grey" v-for="p in posts" :key="p.id">

      <PostsCard :postsProp="p"/>
      <!-- <div class="row">
        <img class="img-fluid col-2" :src="p.imgUrl" alt="">
        <p class="col-2">{{p.createdAt}}</p>
        <p class="col-6 p-2">{{p.body}}</p>
        <p>likes</p>
      </div> -->

    </div>
  </div>

  <div class="p-4">
    <button :disabled="!previousUrl" @click="changePage(previousUrl)" class="btn btn-light">Previous</button>
    <button :disabled="!nextUrl" @click="changePage(nextUrl)" class="btn btn-light">Next</button>
  </div>

  <div v-for="(p, index) in posts" :key="index">
    <div class="m-3">
      <h3>
        {{ p.name }}

      </h3>
    </div>


  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import {postsService} from "../services/PostsService.js"
import PostsCard from "../components/PostsCard.vue"
// import { api } from "../services/AxiosService.js"
// import  Billboards  from "../models/Billboards.js"
// import { BillboardsService } from "../services/BillboardsService.js"



export default {
    setup() {
        async function getPosts() {
            try {
                await postsService.getPosts();
                // logger.log("getting posts");
            }
            catch (error) {
                logger.error(error);
                Pop.toast(error.message, "error");
            }
        }
        const editable = ref({})
        onMounted(() => {
            getPosts();
            // getBillboards();
        });

        return {
          editable,
            posts: computed(() => AppState.posts),
            previousUrl: computed(() => AppState.previousPageUrl),
            nextUrl: computed(() => AppState.nextPageUrl),

      async createPosts(){
        try {
          const newPost = editable.value
          // let form = window.event.target
          // let newPost = {
          //   body: form.imgUrl?.value
          // }
          await postsService.createPosts(newPost)
          Pop.success('Post successful')
          // form.reset()
        } catch (error) {
          Pop.error('Gotta log in bucko', error)
        }
      },

      async changePage(url) {
        try {
          await postsService.changePage(url)
          
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
        };
    components: { PostsCard }
    // components: {billboards}
</script>

<style scoped lang="scss">
</style>
