<template>
  <div class="container-fluid">
      <section class="row">
          <div class="col-6" v-for="a in ads" :key="a.id">
              <img class="billboards" :src="a.banner"/>
          </div>
      </section>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
// import { Billboards } from "../models/Billboards.js";
// import { billboardsService } from "../services/BillboardsService.js";

export default {
setup() {
return {
  ads: computed(() => AppState.billboards)
};
},
};
</script>

<style>
.billboards {
  width: 100%;
}
</style>