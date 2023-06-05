import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Posts } from "../models/Posts.js"
import { logger } from "../utils/Logger.js"

class PostsService{
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('[getting posts]', res.data)
    AppState.posts = res.data.posts
    AppState.nextPageUrl = res.data.next
    AppState.previousPageUrl = res.data.previous
  }

  async getPostsByCreatorId(creatorId){
    const res = await api.get('api/posts', {
      params: {
        creatorId
      }
    })
    AppState.profilePosts = res.data.posts
  }
  async changePage(url) {
    const res = await api.get(url)
    // logger.log(res.data);
    AppState.posts = res.data.posts
    AppState.nextPageUrl = res.data.older
    AppState.previousPageUrl = res.data.newer
  }

  async createPosts(postData){
    if(!AppState.account){
        throw new Error('Sign in first bucko')
    }
    const res = await api.post('api/posts', postData)
    AppState.posts.push(new Posts(res.data))
}

async likePost(postId){
  if(!AppState.account){
    throw new Error('Sign in first bucko')
  }
  const res = await api.post(`api/posts`)
  const index = AppState.posts.findIndex(p=>p.id == postId)
  AppState.posts.splice(index, 1, new Posts(res.data))
}

async getPostsBySearch(query){
  const res = await api.get('api/posts', {
    params: {
      query
    }
  })
  AppState.searchPosts = res.data.posts
}

}


export const postsService = new PostsService