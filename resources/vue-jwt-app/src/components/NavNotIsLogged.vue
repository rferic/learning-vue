<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">

      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#nav-collapse"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Vue.js 2</a>
      </div>

      <div
        class="collapse navbar-collapse"
        id="nav-collapse"
      >
        <ul class="nav navbar-nav navbar-right">
         <li>
           <router-link to="login">Login</router-link>
         </li>
          <li>
            <router-link to="register">Registro</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {}
</script>
