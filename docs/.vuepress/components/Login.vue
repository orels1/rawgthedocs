<template>
  <div class="wrapper">
    <div class="backdrop" @click="hide" />
    <div class="login">
      <h3>RAWG.io log in</h3>
      <div class="warning custom-block">
        <p>This will allow you to perform authorized requests against RAWG api.</p>
        <p>Please note that it will interface with real production data! </p>
        <p>A use of spare testing account is advised. <code>rawgthedocs</code> does not store any authentication/authorization info on its servers.</p>
      </div>
      <div class="status" v-if="loaded">
        <div :class="['custom-block', statusClass]">
          <p>{{resultText}}</p>
        </div>
      </div>
      <div class="form">
        <input type="email" name="email" validat v-model="email" placeholder="email" required>
        <input type="password" name="password" v-model="password" placeholder="password" required>
        <button @click="login" type="button">Login</button>
      </div>
      <div class="test" v-if="loaded && !failed">
        <div class="custom-block info" v-if="!apiTest.loaded">
          <p>Testing api access...</p>
        </div>
        <div class="custom-block tip" v-if="apiTest.loaded && !apiTest.failed">
          <p>Api test successful! Welcome, {{apiTest.result}}</p>
          <p></p>
        </div>
        <div class="custom-block danger" v-if="apiTest.loaded && apiTest.failed">
          <p>Oh no! Api test failed :( Here's the error</p>
          <p>{{apiTest.result}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const HEADERS = {
  'Content-Type': 'application/json',
  'User-Agent': 'rawgthedocs.orels.sh',
};

export default {
  data: () => ({
    loaded: false,
    failed: false,
    token: '',
    email: '',
    password: '',
    apiTest:  {
      result: '',
      loaded: false,
      failed: false,
    }
  }),
  computed: {
    resultText() {
      if (!this.loaded) {
        return '';
      }

      if (this.loaded && !this.failed) {
        return 'Logged in successfully!';
      }
      return 'Login failed';
    },
    statusClass() {
      if (!this.loaded) {
        return '';
      }
      if (this.loaded && !this.failed) {
        return 'tip';
      }
      return 'danger';
    }
  },
  methods: {
    async login() {
      if (!this.email.length || !this.password.length) {
        return;
      }

      const resp = await fetch('https://rawg.io/api/auth/login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email: this.email, password: this.password })
      });

      this.loaded = true;
      if (resp.status !== 200) {
        this.failed = true;
        this.password = '';
        return;
      }

      const json = await resp.json();
      this.token = json.key;
      window.localStorage.setItem('rawgToken', json.key);
      this.testAPI();
    },
    async testAPI() {
      if (!this.token.length) {
        return;
      }

      const resp = await fetch('https://rawg.io/api/users/current', {
        headers: {
          ...HEADERS,
          token: `Token ${this.token}`,
        }
      });
      this.apiTest.loaded = true;
      const json = await resp.json();
      if (resp.status !== 200) {
        this.apiTest.failed = true;
        this.apiTest.result = json.detail;
        return;
      }
      this.apiTest.result = json.username;
      setTimeout(() => {
        this.$emit('authorized');
      }, 1000);
    },
    hide() {
      this.$emit('hide')
    }
  },
}
</script>

<style scoped lang="stylus">
@import '../styles/pallete.styl'
.wrapper
  width 100vw
  height 100vh
  position fixed
  display flex
  flex-direction column
  justify-content center
  align-items center
  top 0
  left 0
  z-index 100
  background-color hsla(0, 0%, 10%, 60%)

.backdrop
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  z-index 1
  cursor pointer

.login
  padding 0px 20px 20px 20px
  border-radius 4px
  background-color $selectionBg
  margin 20px
  max-width 600px
  box-shadow 0 0 30px hsla(0, 0%, 10%, 60%)
  position relative
  z-index 2

  .form
    display flex
    flex-direction column

    input
      margin-bottom 10px
      border none
      padding 5px 7px
      font-size 14px
      background-color $consoleBg
      color $textBright
      outline none !important
    
    button
      background-color $blue
      text $darkBg
      border none
      font-size 14px
      padding 5px 15px
      border-radius 4px
      cursor pointer
      outline none !important
</style>


