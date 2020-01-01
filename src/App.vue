<template>
  <v-app id="app">
    <v-app-bar color="white" elevate-on-scroll app>
      <v-toolbar flat>
        <v-toolbar-title>AniKnight</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn height="10" small text to="/">Home</v-btn>
          <v-btn height="10" small text to="/mylist">My list</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer></v-footer>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
