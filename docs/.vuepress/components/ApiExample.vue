<template>
  <div class="example">
    <Login v-if="unauthorized" @authorized="authorized" @hide="hideLogin" />
    <div class="bar">
      <button class="show fetch" @click="loadData" :disabled="!loaded">Fetch</button>
      <input
        title="click to copy"
        type="text"
        class="url"
        :class="['copy', copied && 'copied']"
        :value="requestUrl"
        @click="copyUrl"
        readonly
      >
      <button
        v-if="result.length"
        class="show"
        @click="toggleVisibility"
      >{{visible ? 'Hide' : 'Show' }}</button>
    </div>
    <div class="params" v-if="mappedPathParams.length">
      <h3>Path Parameters</h3>
      <div class="param" v-for="param in mappedPathParams" :key="param">
        <div class="paramLabel">
          <code>{{param}}</code>
        </div>
        <input
          type="text"
          :name="param"
          class="paramInput"
          v-model="pathParams[param].value"
          :placeholder="pathParams[param].placeholder"
          @keydown.enter="loadData"
        >
      </div>
    </div>
    <div class="params" v-if="mappedQueryParams.length">
      <h3>Query Parameters</h3>
      <div class="param" v-for="param in mappedQueryParams" :key="param">
        <div class="paramLabel">
          <div
            :class="['check', queryParams[param].enabled && 'checked']"
            @click="queryParams[param].enabled = !queryParams[param].enabled"
          />
          <code>{{param}}</code>
        </div>
        <input
          type="text"
          :name="param"
          class="paramInput"
          v-model="queryParams[param].value"
          :placeholder="queryParams[param].placeholder"
          @keydown.enter="loadData"
        >
      </div>
    </div>
    <div class="params" v-if="mappedBodyParams.length">
      <h3>Body</h3>
      <div class="param" v-for="param in mappedBodyParams" :key="param">
        <div class="paramLabel">
          <div
            :class="['check', bodyParams[param].enabled && 'checked']"
            @click="bodyParams[param].enabled = !bodyParams[param].enabled"
          />
          <code>{{param}}</code>
        </div>
        <input
          :type="param === 'password' ? 'password' : 'text'"
          :name="param"
          class="paramInput"
          v-model="bodyParams[param].value"
          :placeholder="bodyParams[param].placeholder"
          @keydown.enter="loadData"
        >
      </div>
    </div>
    <div v-if="result.length && visible" class="result">
      <div class="status" :style="statusStyle">{{status}} {{method}}</div>
      <pre v-highlightjs="result" class="code">
          <code class="json"></code>
        </pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { setTimeout } from 'timers';

const PAGINATION_PARAMS = [
  { label: 'page', placeholder: 'Pagination parameter', value: '', enabled: false },
  { label: 'page_size', placeholder: 'Items per page', value: '', enabled: false },
];

const DEFAULT_PATH_PARAMS = {
  user: { default: 'orels1', placeholder: 'User slug to request the data for' },
  gameId: { default: 4200, placeholder: 'Game ID to request the data for' },
  gameSlug: { default: 'portal-2', placeholder: 'Game slug to request the data for' },
  collectionSlug: { default: 'must-play', placeholder: 'Collections slug to request the data for' }
}

export default {
  props: {
    path: String,
    method: { type: String, default: 'GET' },
    body: { type: Array, default: () => ([]) },
    headers: { type: Object },
    pagination: { type: Boolean, default: false },
    query: { type: Array, default: () => ([]) },
  },
  data: () => ({
    loaded: true,
    result: '',
    unapproved: false,
    hidden: false,
    status: null,
    visible: true,
    copied: false,
    version: 3,
    base: 'https://rawg.io/api',
    queryParams: {},
    pathParams: {},
    unauthorized: false,
    token: '',
    bodyParams: {}
  }),
  computed: {
    mappedQueryParams() {
      return Object.entries(this.queryParams).map(p => p[0]);
    },
    queryString() {
      const queryString = [];
      Object.entries(this.queryParams).forEach(([param, data]) => {
        if (data.enabled) {
          queryString.push(`${param}=${data.value}`);
        }
      });
      if (queryString.length) {
        return `?${queryString.join('&')}`;
      }
      return '';
    },
    mappedPathParams() {
      return Object.entries(this.pathParams).map(p => p[0]);
    },
    processedPath() {
      let processedPath = this.path;
      Object.entries(this.pathParams).forEach(([param, data]) => {
        processedPath = processedPath.replace(`:${param}`, data.value);
      });
      return processedPath;
    },
    requestUrl() {
      return `${this.base}${this.processedPath}${this.queryString}`;
    },
    mappedBodyParams() {
      return Object.entries(this.bodyParams).map(p => p[0]);
    },
    requestHeaders() {
      return ({
        'User-Agent': 'rawgthedocs.orels.sh',
        'Content-Type': 'application/json',
        'token': this.token ? `Token ${this.token}` : '',
        ...this.headers,
      });
    },
    requestBody() {
      if (!this.body.length) {
        return;
      }

      const body = {};
      Object.entries(this.bodyParams).forEach(([param, data]) => {
        if (data.enabled) {
          body[param] = JSON.parse(data.value);
        }
      });
      return JSON.stringify(body);
    },
    statusStyle() {
      return {
        backgroundColor: this.status === 200 ? '#b8da7b' : '#df6185',
      };
    }
  },
  methods: {
    async loadData() {
      this.loaded = false;
      if (!this.token) {
        this.saveToken();
      }
      const hasBody = !!Object.keys(this.body).length;
      const resp = await fetch(this.requestUrl, {
        method: this.method,
        headers: this.requestHeaders,
        body: this.requestBody,
      });
      if (resp.status === 401) {
        this.unauthorized = true;
        this.loaded = true;
        return;
      }

      const json = await resp.json();
      this.status = resp.status;
      const trimmed = {
        ...json,
        results: json.results ? json.results.slice(0, 1) : undefined
      };

      if (trimmed.key) {
        trimmed.key = 'removed-for-security-reasons'
      }

      this.visible = true;
      this.result = JSON.stringify(trimmed, null, 2);
      this.loaded = true;
    },
    toggleVisibility() {
      this.visible = !this.visible;
    },
    toggleUnapproved() {
      this.unapproved = !this.unapproved;
    },
    toggleHidden() {
      this.hidden = !this.hidden;
    },
    async copyUrl() {
      await navigator.clipboard.writeText(this.requestUrl);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
    setVersion(v) {
      this.version = v;
    },
    generateQueryParams() {
      if (this.query.length) {
        this.query.forEach(param => {
          Vue.set(this.queryParams, param.label, {
            value: param.value,
            placeholder: param.placeholder,
            enabled: false
          })
        });
      }

      if (this.pagination) {
        PAGINATION_PARAMS.forEach(param => {
          Vue.set(this.queryParams, param.label, {
            value: param.value,
            placeholder: param.placeholder,
            enabled: param.enabled
          });
        });
      }
    },
    generatePathParams() {
      this.path.split('/').forEach(part => {
        if (part.startsWith(':')) {
          const param = part.substr(1);
          const paramData = DEFAULT_PATH_PARAMS[param];
          Vue.set(this.pathParams, part.substr(1), {
            value: paramData ? paramData.default : '',
            placeholder: paramData ? paramData.placeholder : ''
          });
        }
      })
    },
    generateBodyParams() {
      if (this.body.length) {
        this.body.forEach(param => {
          Vue.set(this.bodyParams, param.label, {
            value: param.value,
            placeholder: param.placeholder,
            enabled: param.enabled
          })
        });
      }
    },
    saveToken() {
      this.token = window.localStorage.getItem('rawgToken');
    },
    authorized() {
      this.unauthorized = false;
      this.token = window.localStorage.getItem('rawgToken');
    },
    hideLogin() {
      this.unauthorized = false
    }
  },
  async mounted() {
    this.saveToken();
    this.generateQueryParams();
    this.generatePathParams();
    this.generateBodyParams();
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/pallete.styl'

.example {
  margin-top: 10px;
  width: 100%;
}

.bar {
  display: flex;
}

.show {
  border: none;
  padding: 15px 20px;
  background-color: $blue;
  color: $bgDark;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  outline: none;
  flex: 1;

  &.fetch:disabled {
    background-color: $textDim;
    color: $textBright;
  }
}

.url {
  flex: 4;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  border: 2px solid $consoleBg;
  margin: 0 10px;
  background-color: $consoleBg;
  color: $textBright;
  position: relative;
  z-index: 3;
  transition: border-color 300ms ease;
  cursor: pointer;
  outline: none;
}

.url.copied {
  border-color: $green;
}

.show:hover {
  background-color: $blueDark;
}

.params {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.paramTitle {
  margin-bottom: 10px;
  font-weight: bold;
}

.param {
  display: flex;
  margin-bottom: 6px;
  align-items: center;
}

.paramLabel {
  flex: 1;
  font-weight: bold;
  display: flex;
  min-width: 150px;
}

.paramInput {
  flex: 5;
  outline: none !important;
  border-radius: 4px;
  padding: 7px 7px;
  background-color: $consoleBg;
  color: $textBright;
  border: none;
  font-size: 14px;
}

.extra {
  display: flex;
}

.check {
  display: flex;
  margin: 0 7px 0 0;
  align-items: center;
  cursor: pointer;
}

.check::selection {
  background-color: transparent;
}

.check::before {
  content: "";
  display: block;
  border: 2px solid $consoleBg;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.1s ease;
}

.check:hover::before {
  background-color: $green;
  opacity: 0.6;
  border-color: $green;
}

.check.checked::before {
  background-color: $green;
  opacity: 1;
  border-color: $green;
}

.result {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 10px;
}

.status {
  position: relative;
  z-index: 2;
  background-color: hsl(0, 0%, 70%);
  width: 100%;
  padding: 5px 15px 11px 25px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-bottom: -6px;
  box-sizing: border-box;
  color: $bgDark;
  font-weight: bold;
}

.code {
  position: relative;
  z-index: 3;
  margin-top: 0;
  width: 100%;
  box-sizing: border-box;
  max-height: 800px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
      width: 0px;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
  }
}
</style>


