<template>
  <div
    @click="copy"
    :class="{copyable, copy: true}"
  >
    <pre v-highlightjs="code || slotContent"><code :class="language" /></pre>
    <v-snackbar
      :timeout="2000"
      v-model="show"
    >
      Copié ;-)
    </v-snackbar>
    <br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    },
    copyable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    slotContent () {
      if (!this.code && !this.$slots.default) {
        console.error('Missing content for code-copy element')
        return '[Missing content]'
      }
      return (this.$slots.default[0].text || '').trim()
    }
  },
  methods: {
    copy () {
      if (!this.copyable) {
        return
      }
      const el = document.createElement('textarea')
      el.value = this.code || this.slotContent
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.show = true
    }
  }
}
</script>

<style scoped>
.copy {
  border-radius: 0;
}

.copyable {
  cursor: copy;
}

code:before {
  content: none;
}
</style>
