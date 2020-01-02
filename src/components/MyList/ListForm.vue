<template>
  <v-container>
    <v-row>
      <v-col>
        <span v-if="duplicateError">Entry already exists</span>
      </v-col>
    </v-row>
    <v-row v-show="expand" class="mt-10" justify="center">
      <v-col cols="8">
        <v-form>
          <v-autocomplete
            :items="items"
            :loading="loading"
            :search-input.sync="search"
            cache-items
            v-model="anime.title"
            outlined
            @focus="resetError"
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
  methods: {
    ...mapActions(["addAnime"]),
    resetError() {
      this.duplicateError = null;
    },
    formatUrl(url) {
      console.log(typeof url);
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      return "http://" + url;
    },
    submitAnime() {
      const notduplicate = this.myList.every(
        anime => anime.id !== this.selected.id
      );
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
      //console.log(this.items);
      //if (this.items.+length > 0) return;
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