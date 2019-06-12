<template>
  <div id="title-override"/>
</template>

<script>
export default {
  props: {
    title: String,
  },
  mounted() {
    document.title = this.title;
  },
}
</script>
