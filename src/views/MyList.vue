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
          <v-row v-if="adding" class="mt-10" justify="center">
            <v-col cols="8">
              <v-form>
                <v-autocomplete
                  :items="items"
                  :loading="loading"
                  :search-input.sync="search"
                  cache-items
                  v-model="anime.title"
                  outlined
                  hint="Enter the Anime you want to add."
                  label="Title"
                ></v-autocomplete>
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
                    <v-col cols="3" class="d-flex align-center">
                      <v-btn text :to="item.url">Visit</v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-list>
              <h3 v-if="!myList.length">No Animes found.</h3>
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
    loading: false,
    search: null,
    suggestions: [],
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
        title: this.selected.title.userPreferred,
        url: this.anime.url,
        id: this.selected.id,
        src: this.selected.coverImage.medium
      });
      this.clearAll();
    },
    clearAll() {
      this.adding = false;
      this.anime.title = "";
      this.anime.url = "";
    },
    ...mapActions(["addAnime"])
  },
  computed: {
    ...mapState({
      myList: state => state.myList
    }),
    items() {
      return this.suggestions.map(suggestion => {
        return `${suggestion.title.userPreferred} (${suggestion.startDate.year})`;
      });
    },
    selected() {
      return this.suggestions.filter(suggestion => {
        console.log(
          suggestion.title.userPreferred,
          this.anime.title.slice(0, -6).trim()
        );
        const selection =
          suggestion.title.userPreferred ===
          this.anime.title.slice(0, this.anime.title.length - 6).trim();

        return selection;
      })[0];
    }
  },
  watch: {
    search(value) {
      //console.log(this.items);
      //if (this.items.length > 0) return;
      this.loading = true;
      const t1 = performance.now();
      fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: `query ($page: Int = 1, $search: String) {
  Page(page: $page, perPage: 5) {
    ANIME: media(search: $search) {
      id
      title {
        userPreferred
      }
      coverImage {
        medium
      }
      startDate {
        year
      }
      type
    }
  }
}`,
          variables: { search: value }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.data.Page) this.suggestions = [...res.data.Page.ANIME];
          const t2 = performance.now();
          console.log(t2 - t1);
        })
        .catch(err => console.error(err))
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>
</style>