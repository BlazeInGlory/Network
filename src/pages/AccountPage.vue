<template>
  <div class="about text-center">
    <img class="coverImg" :src="account.coverImg" height=200>
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded profImg" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <AccountForm/>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>

.profImg{
  max-width: 100px;
}
.coverImg {
  width: 100%;
  background-position: center;
  object-fit: cover;
}
img {
  max-width: 100px;
}
</style>
