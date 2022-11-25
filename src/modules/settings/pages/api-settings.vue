<template>
  <div>
    <!-- PAGE TITLE -->
    <div class="page-title primary-1-text grey-900 mgb-4">API</div>

    <!-- PAGE META -->
    <div class="page-meta tertiary-2-text grey-600">Generate API keys here</div>

    <div class="key-wrapper">
      <div class="key-loader skeleton-loader" v-if="generating_keys"></div>
      <div class="keys tertiary-2-text" v-else>{{ getAPIKeys }}</div>

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

    <button
      class="btn btn-md btn-primary generate-key-btn"
      ref="generate"
      @click="generateKeys(true)"
      :disabled="generating_keys"
    >Generate API key</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import CopyIcon from "@/shared/components/icon-comps/copy-icon";
export default {
  name: "APISettings",

  components: {
    CopyIcon,
  },

  computed: {
    ...mapGetters({ getAPIKeys: "settings/getAPIKeys" }),
  },

  watch: {
    getAPIKeys: {
      async handler(keys) {
        if (!keys) this.generateKeys(false);
      },
      immediate: true,
    },
  },

  data() {
    return {
      api_keys: "26fhf4jf8key783920v56y",
      copied: false,
      generating_keys: false,
    };
  },

  methods: {
    ...mapActions({ generateAPIkeys: "settings/generateAPIkeys" }),

    async generateKeys(load) {
      this.generating_keys = true;
      if (load) this.handleClick("generate");
      try {
        const response = await this.generateAPIkeys({
          account_id: this.getAccountId,
        });

        this.generating_keys = false;

        if (load) this.handleClick("generate", "Generate API keys", false);

        if (![201, 200].includes(response.code))
          this.pushToast(response.message, "error");
      } catch (err) {
        this.generating_keys = false;
        if (load) this.handleClick("generate", "Generate API keys", false);
        this.pushToast("Failed to generate API keys", "error");
        console.log("FAILED TO GET KEYS", err);
      }
    },

    async copyAPIkeys() {
      await navigator.clipboard.writeText(this.getAPIKeys);
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
    max-width: toRem(368);
    padding: toRem(12) toRem(16);
    border: toRem(1) dashed getColor("green-500");
    border-radius: toRem(12);
    background: getColor("green-10");
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @include breakpoint-custom-down(787) {
      min-width: auto;
      width: 100%;
    }
  }

  .key-loader {
    width: toRem(350);
    height: toRem(42);
    border-radius: toRem(8);
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