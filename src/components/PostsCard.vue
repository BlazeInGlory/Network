<template>
  <!-- hello from the post card -->
  
 <div class="d-flex">
        <img class="img-fluid col-2" :src="postsProp?.imgUrl" alt="">
        <p class="col-2">{{ postsProp?.creator.name }}</p>
        <p class="col-2">{{postsProp?.createdAt}}</p>
        <p class="col-6 p-2">{{postsProp?.body}}</p>
        <button @click="likePost(postProp)" class="btn btn-primary">Like</button>
        <p class="col-1">{{ postsProp?.likeIds.length }}</p>
        
      </div>
</template>

<script>
import { Posts } from '../models/Posts.js';
import { AppState } from "../AppState.js";
import { logger } from '../utils/Logger.js'
import { postsService } from "../services/PostsService.js";
import { computed } from "vue";
import Pop from "../utils/Pop.js";
export default {
  props: {
      postsProp: { type: Object, required: true }
  },
  setup() {
      return {
        account: computed (()=> AppState.account),

        async likePost(postProp){
          try {
            if(!AppState.account){
              throw new Error('Gotta log in bucko')
            }
            await postsService.likePost(postProp?.id)
          } catch (error) {
            logger.error(error)
            Pop.error('Gotta log in Bucko', error)
          }
        }
      };
  },
};
</script>

<style></style>