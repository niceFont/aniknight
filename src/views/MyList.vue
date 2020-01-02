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
          <v-row justify="end">
            <v-col cols="3">
              <span>{{myList.length + " Entries"}}</span>
            </v-col>
          </v-row>
          <ListForm v-if="adding" />
          <v-divider v-if="adding" class="mt-10"></v-divider>
          <List />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ListForm from "../components/MyList/ListForm";
import List from "../components/MyList/List";

export default {
  data: () => ({
    adding: false
  }),
  methods: {
    toggleAdding() {
      this.adding = !this.adding;
    },
    ...mapActions(["addAnime"])
  },
  computed: {
    ...mapState({
      myList: state => state.myList
    })
  },
  components: {
    ListForm,
    List
  }
};
</script>

<style>
</style>