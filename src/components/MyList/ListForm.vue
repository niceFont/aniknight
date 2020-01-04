<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-alert elevation="1" type="error" border="left" v-if="duplicateError">Entry already exists</v-alert>
      </v-col>
    </v-row>
    <v-row class="mt-10" justify="center">
      <v-col cols="8">
        <v-form>
          <v-autocomplete
            id="t1"
            :items="items"
            :loading="loading"
            :search-input.sync="search"
            v-model="anime.title"
            outlined
            clearable
            @focus="resetError"
            hint="Enter the Anime you want to add."
            label="Title"
          ></v-autocomplete>
          <v-text-field
            id="t2"
            v-model="anime.url"
            outlined
            hint="Enter a Url to quickly access your new anime."
            label="Url"
          ></v-text-field>
          <v-btn id="t3" @click="submitAnime" dark color="indigo" depressed block>Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ListForm",
  data: () => ({
    anime: {
      title: "",
      url: "",
      id: 0
    },
    loading: false,
    suggestions: [],
    search: null,
    duplicateError: null
  }),
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
        const selection =
          suggestion.title.userPreferred ===
          this.anime.title.slice(0, this.anime.title.length - 6).trim();

        return selection;
      })[0];
    }
  },
  methods: {
    ...mapActions(["addAnime"]),
    resetError() {
      this.duplicateError = null;
    },
    checkForDuplicate(arr) {
      return arr.every(anime => anime.id !== this.selected.id);
    },
    formatUrl(url) {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      return "http://" + url;
    },
    submitAnime() {
      const notduplicate = this.checkForDuplicate(this.myList);
      if (notduplicate) {
        this.$store.dispatch("addAnime", {
          title: this.selected.title.userPreferred,
          url: this.formatUrl(this.anime.url),
          id: this.selected.id,
          src: this.selected.coverImage.medium
        });
        this.clearAll();
      } else {
        this.duplicateError = true;
      }
    },
    clearAll() {
      this.adding = false;
      this.anime.title = "";
      this.anime.url = "";
    }
  },
  watch: {
    search(value) {
      this.loading = true;
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
        })
        .catch(err => console.error(err))
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>
#error {
  color: red;
}
</style>