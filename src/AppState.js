import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},


  /** @type {import('./models/Posts.js').Posts[]} */
  posts: [],

  /** @type {import('./models/Account.js').Account[]} */
  previousPageUrl: [],

  /** @type {import('./models/Account.js').Account[]} */
  nextPageUrl: [],

  /**@type {import('./models/.Billboards.js').Billboards[]} */
  billboards: [],

  /**@type {import('./models/Posts.js').Posts[]} */
  profilePosts: [],

    /**@type {import('./models/Posts.js').Post[]} */
    searchPosts: [],

     /**@type {import('./models/Profile.js').Profile} */
  activeProfile: null,

 /**@type {import('./models/Posts.js').Posts[]} */
  nextPageProfile: null,

  /**@type {import('./models/Posts.js').Posts[]} */
  previousPageProfile: null,

});
