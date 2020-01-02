<template>
  <v-row class="mt-10" justify="center">
    <v-col cols="8">
      <v-list v-if="myList.length > 0">
        <v-card class="d-flex flex-row mb-2" v-for="item in myList" :key="item.id">
          <v-row>
            <v-col cols="4" class="d-flex align-center justify-center">
              <v-avatar size="64">
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="d-flex align-center justify-space-around">
              <h3>{{item.title}}</h3>
            </v-col>
            <v-col cols="2" class="d-flex align-center">
              <v-btn text :to="item.url">Visit</v-btn>
            </v-col>
            <v-col cols="2" class="d-flex align-center">
              <v-btn @click="remove(item.id)" text icon color="error">
                <v-icon>mdi-minus-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-list>
      <h3 v-if="!myList.length">No Animes found.</h3>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "List",
  computed: {
    ...mapState({
      myList: state => state.myList
    })
  },
  methods: {
    remove(id) {
      this.$store.dispatch("removeAnime", { id });
    },
    ...mapActions(["removeAnime"])
  }
};
</script>

<style>
</style>