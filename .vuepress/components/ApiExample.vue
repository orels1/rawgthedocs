<template>
  <ClientOnly>
    <div class="example">
      <div class="bar">
        <button class="show" @click="loadData">Fetch</button>
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
      <!-- <div class="extra">
        <div :class="['check', unapproved && 'checked']" @click="toggleUnapproved">unapproved</div>
        <div :class="['check', hidden && 'checked']" @click="toggleHidden">hidden</div>
        <div :class="['check', version === 2 && 'checked']" @click="setVersion(2)">v2</div>
        <div :class="['check', version === 3 && 'checked']" @click="setVersion(3)">v3</div>
      </div>-->
      <div v-if="result.length && visible" class="result">
        <div class="status" :style="statusStyle">{{status}} {{method}}</div>
        <pre v-highlightjs="result" class="code">
          <code class="json"></code>
        </pre>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: {
    path: String,
    method: { type: String, default: 'GET' },
    headers: { type: Object }
  },
  data: () => ({
    result: '',
    unapproved: false,
    hidden: false,
    status: null,
    visible: true,
    copied: false,
    version: 3,
    base: 'https://rawg.io/api'
  }),
  computed: {
    queryString() {
      // const unapproved = this.unapproved ? 'showUnapproved=true' : '';
      // const hidden = this.hidden ? 'hidden=true' : '';
      // const version = this.version ? `version=${this.version}` : '';
      // const params = [unapproved, hidden, version].filter(Boolean);
      // if (!params.length) {
      //   return '';
      // }
      // return `?${params.join('&')}`;
      return '';
    },
    requestUrl() {
      return `${this.base}${this.path}${this.queryString}`;
    },
    requestHeaders() {
      return ({
        'User-Agent': 'docs.rawg.io',
        ...this.headers,
      });
    },
    statusStyle() {
      return {
        backgroundColor: this.status === 200 ? '#3eaf7c' : '#d32f2f',
      };
    }
  },
  methods: {
    async loadData() {
      const resp = await fetch(this.requestUrl, {
        method: this.method,
        headers: this.requestHeaders
      });
      const json = await resp.json();
      this.status = resp.status;
      const trimmed = {
        ...json,
        results: json.results ? json.results.slice(0, 1) : undefined
      };

      this.visible = true;
      this.result = JSON.stringify(trimmed, null, 2);
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
    }
  },
  async mounted() {
    // await this.loadData();
  }
}
</script>

<style scoped>
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
  background-color: #3eaf7c;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  outline: none;
  flex: 1;
}

.url {
  flex: 4;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  border: 2px solid #999999;
  margin: 0 10px;
  background-color: white;
  position: relative;
  z-index: 3;
  transition: border-color 300ms ease;
  cursor: pointer;
  outline: none;
}

.url.copied {
  border-color: #3eaf7c;
}

.show:hover {
  background-color: #4abf8a;
}

.extra {
  display: flex;
}

.check {
  display: flex;
  margin: 10px 15px 0 0;
  align-items: center;
  cursor: pointer;
}

.check::selection {
  background-color: transparent;
}

.check::before {
  content: "";
  display: block;
  border: 2px solid #999999;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.1s ease;
}

.check:hover::before {
  background-color: #3eaf7c;
  opacity: 0.6;
  border-color: #3eaf7c;
}

.check.checked::before {
  background-color: #3eaf7c;
  opacity: 1;
  border-color: #3eaf7c;
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
  color: white;
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
}
</style>


