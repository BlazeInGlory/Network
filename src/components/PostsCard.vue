<template>
  <!-- hello from the post card -->
  
 <div class="d-flex row">
   <!-- <img class="col-2 img-fluid" :src="postsProp?.creator.picture" alt=""> -->
        <img class="img-fluid col-2" :src="postsProp?.imgUrl" alt="">
        <p>{{ postsProp?.creator.name }}</p>
        <span class="">- {{new Date(postsProp?.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            })}}</span>
        <p>{{postsProp?.body}}</p>
        <button @click="likePost(postsProp)" class="btn btn-primary col-2">Likes:{{ postsProp?.likeIds.length }}</button>
        <div class="text-center" v-if="postsProp?.creator.id == account.id">
                <button class="btn btn-danger mb-3" @click="deletePost(postsProp)">Delete</button>
            </div>
            <div>
            <router-link :to="{ name: 'Profile', params: { profileId: postsProp?.creator.id } }">
            <img class="profile-img selectable rounded-circle" :src="postsProp?.creator.picture">
            </router-link>
          </div>
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

        async deletePost(post){
        try {
          logger.log('deleting post', post)
            if(post.creator.id !== AppState.account.id){
                throw new Error('Did you create this?')
            }
            const yes = await Pop.confirm('Delete The Post?')
            if(!yes) {return}
            await postsService.deletePost(post.id)
        } catch (error) {
            logger.error('[Deleting Post]', error)
            Pop.error(error)
        }
    },
        async likePost(postsProp){
          try {
            if(!AppState.account){
              throw new Error('Gotta log in')
            }
            await postsService.likePost(postsProp?.id)
          } catch (error) {
            logger.log('liking post')
            Pop.error('Gotta log in', error)
          }
        }
      };
  },
};
</script>
<style>
.post-img {
    width: 100%;
    max-height: 400px;
}

.profile-img {
    width: 40px;
    height: 40px;
}
</style>