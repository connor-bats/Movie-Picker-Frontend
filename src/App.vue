<template>
  
  <router-view/>
</template>

<style src="./assets/tailwind.css"/>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.toggle-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.toggle-label {
    font-family: Poppins, sans-serif;
    font-size: 1rem;
    color: black;
}
</style>
