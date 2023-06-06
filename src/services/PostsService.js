import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Posts } from "../models/Posts.js"
import { logger } from "../utils/Logger.js"

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('[getting posts]', res.data)
    AppState.posts = res.data.posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older
  }

  async getPostsByCreatorId(creatorId) {
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
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }

  async createPosts(postData) {
    if (!AppState.account) {
      throw new Error('Sign in first bucko')
    }
    const res = await api.post('api/posts', postData)
    AppState.posts.push(new Posts(res.data))
  }

  async changePageProfile(url) {
    const res = await api.get(url)
    AppState.profilePosts = res.data.posts
    AppState.nextPageProfile = res.data.older
    AppState.previousPageProfile = res.data.newer
  }

  async likePost(postId) {
    if (!AppState.account) {
      throw new Error('Sign in first bucko')
    }
    const res = await api.post(`api/posts/${postId}/like`)
    const index = AppState.posts.findIndex(p => p.id == postId)
    AppState.posts.splice(index, 1, new Posts(res.data))
  }

  async getPostsBySearch(query) {
    const res = await api.get('api/posts', {
      params: {
        query
      }
    })
    AppState.searchPosts = res.data.posts
  }

  async deletePost(postId) {
    if (!AppState.account) {
      throw new Error('Did you make this?')
    }
    const res = await api.delete(`api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }

  async getPostsByCreatorId(creatorId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId
      }
    })
    AppState.profilePosts = res.data.posts
    AppState.nextPageProfile = res.data.older
    AppState.previousPageProfile = res.data.newer
  }

}


export const postsService = new PostsService