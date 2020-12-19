<template>
    <div id="app">

        <div class="nav d-flex justify-content-between" v-if="$store.state.token">
            <!-- groceries -->
            <router-link class="nav-item no_border" to="/groceries">
              <font-awesome-icon icon="shopping-bag" />
            </router-link>
            <!-- meal plan -->
            <router-link class="nav-item no_border" to="/meals">
              <font-awesome-icon icon="utensils" />
            </router-link>
            <!-- stock items -->
            <!-- <router-link class="nav-item no_border" to="/stock">
              <font-awesome-icon icon="carrot" />
            </router-link> -->
            <!-- shopping lists -->
            <router-link class="nav-item" to="/lists">
              <font-awesome-icon icon="list-ol" />
            </router-link>
            <span class="nav-item" @click="logout">
                <font-awesome-icon icon="sign-out-alt" />
            </span>
        </div>

        <div class="container">
            <router-view/>
        </div>

        <ErrorBox :errors="$store.state.errors" />

        <div class="success" v-if="success">{{ success }}</div>

    </div>
</template>

<script>
  
  import ErrorBox from './components/ErrorBox.vue';

  export default {
    name: 'App',
    components: {
      ErrorBox
    },
    methods: {
      logout() {
        this.$store.commit('logout');
        this.$router.push('/login');
      }
    },
    computed: {
      success() {
        return this.$store.state.success;
      }
    }
  }

</script>

<style lang="scss">

    body {
        background: #b4ffb0 !important;
    }

    #app {
        padding-top: 68px;
        background: #b4ffb0;
    }

    h1 {
        font-weight: 100 !important;
        font-size: 32px !important;
        margin-bottom: 20px !important;
    }

    label {
      display: block;
      font-weight: 200;
    }

    .nav {
        background: #fff;
        position: fixed;
        top: 0px;
        z-index: 10;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.63);
        width: 100%;
        left: 0px;
    }

    .nav-item {
        background: #fff;
        padding: 10px 15px;
        flex: 1;
        text-align: center;
        border-left: solid 4px #eaeaea;
        color: #333;
        &:hover {
          color: #fff;
        }
    }

    .router-link-exact-active,
    .router-link-active {
        background: #22a25d;
        color: #fff;
    }

    .flex-1 {
      flex: 1;
    }

    .no_border {
      border: none;
    }

    .icon_btn {
      background: #52afd4;
      color: #fff;
      display: inline-block;
      width: 32px;
      height: 32px;
      text-align: center;
      padding-top: 4px;
      border-radius: 4px;
      &--big {
        width: auto;
        padding: 4px 10px;
      }
    }

    .icon_star {
      background: transparent;
      color: #d8d8d8;
      &.is_selected {
        color: #DAC420;
      }
    }

    .floating-action-button {
      position: fixed;
      bottom: 15px;
      background: #16673a;
      right: 15px;
      border-radius: 100%;
      width: 56px;
      height: 56px;
      text-align: center;
      line-height: 1.35em;
      font-size: 38px;
      color: white;
      z-index: 5;
    }

    .button {
      border: none;
      padding: 6px 24px;
      background: #a54b63;
      border-radius: 3px;
      color: #fff;
      &--blue {
        background: #59bdc3;
      }
    }

    .form-modal {
      display: block;
      background: rgba(0,0,0,0.8);
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      padding: 15px;
    }

    .form-modal .inner {
      background: #fff;
      padding: 45px 15px 15px 15px;
      border-radius: 5px;
      height: auto;
    }

    .form-modal .action-close {
      line-height: 0.85em;
    }

    .info-box {
        background: #a54b63;
        padding: 15px;
        border-radius: 5px;
        color: #fbe2e9;
        margin-bottom: 20px;
        font-weight: 200;
        font-size: 14px;
    }

    .info-box .item:last-child {
        margin: 0px !important;
    }

    .panel p {
      margin: 0px;
    }

    .loading {
      position: relative;
    }

    .loading:before {
      content: '';
      display: block;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      background-image: url('../public/loading.gif'); // #b4ffb0;
      background-color: rgba(180, 255, 176, 0.76);
      background-repeat: no-repeat;
      background-size: 30px;
      background-position: center;
      height: 100%;
      z-index: 3;
      text-align: center;
      color: #093a0b;
    }

    .success {
      position: fixed;
      background: #4aff7b;
      width: 100%;
      text-align: center;
      bottom: 0px;
      padding: 16px 0px;
      color: aliceblue;
      color: #077725;
    }

    .bg-red {
      background: #d85151;
    }

    input, select {
      padding: 8px 14px;
      border-radius: 5px;
      border: 2px solid #a7a7a7;
      width: 100%;
    }

    @-ms-keyframes spin {
        from { -ms-transform: rotate(0deg); }
        to { -ms-transform: rotate(360deg); }
    }
    @-moz-keyframes spin {
        from { -moz-transform: rotate(0deg); }
        to { -moz-transform: rotate(360deg); }
    }
    @-webkit-keyframes spin {
        from { -webkit-transform: rotate(0deg); }
        to { -webkit-transform: rotate(360deg); }
    }
    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
    
</style>
