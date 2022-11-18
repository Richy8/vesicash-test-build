<template>
  <div>
    <!-- PAGE TITLE -->
    <div class="page-title primary-1-text grey-900 mgb-4">API</div>

    <!-- PAGE META -->
    <div class="page-meta tertiary-2-text grey-600">Generate API keys here</div>

    <div class="key-wrapper">
      <div class="keys tertiary-2-text">{{ api_keys}}</div>

      <button
        class="btn btn-sm btn-secondary"
        :class="[copied && 'copied-btn']"
        @click="copyAPIkeys"
      >
        <span v-if="copied">Keys Copied!</span>

        <template v-else>
          <span class="mgr-4">
            <CopyIcon />
          </span>
          <span>Copy keys</span>
        </template>
      </button>
    </div>

    <button class="btn btn-md btn-primary generate-key-btn">Generate API key</button>
  </div>
</template>

<script>
import CopyIcon from "@/shared/components/icon-comps/copy-icon";
export default {
  name: "APISettings",

  components: {
    CopyIcon,
  },

  data() {
    return {
      api_keys: "26fhf4jf8key783920v56y",
      copied: false,
    };
  },

  methods: {
    async copyAPIkeys() {
      await navigator.clipboard.writeText(this.api_keys);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2500);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-meta {
  padding-bottom: toRem(24);
  border-bottom: toRem(0.5) solid getColor("grey-200");
  margin-bottom: toRem(32);
}

.key-wrapper {
  @include flex-row-start-nowrap;
  gap: toRem(16);
  margin-bottom: toRem(48);

  @include breakpoint-custom-down(787) {
    @include flex-row-start-wrap;
  }

  .keys {
    min-width: toRem(368);
    padding: toRem(12) toRem(16);
    border: toRem(1) dashed getColor("green-500");
    border-radius: toRem(12);
    background: getColor("green-10");

    @include breakpoint-custom-down(787) {
      min-width: auto;
      width: 100%;
    }
  }

  .copied-btn {
    background-color: getColor("green-50") !important;
    border: toRem(1) dashed getColor("green-500");
    min-height: toRem(42);
    min-width: toRem(121.69);

    &:focus {
      background-color: getColor("green-50") !important;
    }
  }
}

.generate-key-btn {
  @include breakpoint-custom-down(787) {
    width: 100%;
  }
}
</style>