<template>
  <v-container class="mt-10" fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-toolbar dark color="indigo" flat>
            <v-toolbar-title>My Anime List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              @click="toggleAdding"
              small
              depressed
              class="ma-2"
              :color="!adding ? 'success' : 'error'"
            >{{adding ? "cancel" : "add"}}</v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-row v-if="adding" class="mt-10" justify="center">
            <v-col cols="8">
              <v-form>
                <v-text-field
                  v-model="anime.title"
                  outlined
                  hint="Enter the Anime you want to add."
                  label="Title"
                ></v-text-field>
                <v-text-field
                  v-model="anime.url"
                  outlined
                  hint="Enter a Url to quickly access your new anime."
                  label="Url"
                ></v-text-field>
                <v-btn @click="submitAnime" dark color="indigo" depressed block>Submit</v-btn>
              </v-form>
            </v-col>
          </v-row>
          <v-divider v-if="adding" class="mt-10"></v-divider>
          <v-row class="mt-10" justify="center">
            <v-col cols="8">
              <v-list elevation="1">
                <v-list-item v-for="item in myList" :key="item.id">
                  <v-list-item-avatar>
                    <v-img src="../assets/2.jpg"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="ma-5" v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    adding: false,
    anime: {
      title: "",
      url: "",
      id: 5
    }
  }),
  methods: {
    toggleAdding() {
      this.adding = !this.adding;
    },
    submitAnime() {
      this.$store.dispatch("addAnime", {
        title: this.anime.title,
        url: this.anime.url,
        id: this.anime.id++
      });
      this.clearAll();
    },
    clearAll() {
      this.anime.id = this.anime.id++;
      this.adding = false;
      this.anime.title = "";
      this.anime.url = "";
    },
    ...mapActions(["addAnime"])
  },
  computed: {
    ...mapState({
      myList: state => state.myList
    })
  }
};
</script>

<style>
</style>