<template>
  <div class="fund-info-card rounded-16 grey-10-bg border-grey-100">
    <!-- TOP ROW -->
    <div class="top-row mgb-16">
      <div class="card-title grey-900 primary-1-text">{{ card_title }}</div>
    </div>

    <!-- BOTTOM ROW -->
    <div class="bottom-row">
      <!-- CARD TITLE -->
      <template v-for="(card, index) in card_items">
        <div class="card-item" :key="index">
          <!-- CARD TITLE TITLE -->
          <div
            class="
              card-item-title
              text-uppercase
              grey-600
              tertiary-3-text
              mgb-8
            "
          >
            {{ card.title }}
          </div>

          <!-- CARD TITLE VALUE -->

          <template v-if="card.file">
            <div
              class="d-flex justify-content-start align-items-center"
              @click="openAttachedFile(card.file)"
            >
              <FileIcon active />
              <div
                class="
                  card-item-value
                  green-500
                  secondary-2-text
                  link-underline
                  mgl-6
                  pointer text-no-wrap
                "
              >
                {{ card.file.name }}
              </div>
            </div>
          </template>

          <template v-else>
            <div class="card-item-value grey-900 secondary-2-text">
              {{ card.value }}
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FileIcon from "@/shared/components/icon-comps/file-icon";

export default {
  name: "FundInfoCard",

  components: {
    FileIcon,
  },

  props: {
    card_title: {
      type: String,
      default: "Disbursment details",
    },

    card_items: {
      type: Array,
      default: () => [
        {
          title: "Disbursement Type",
          value: "One-off disbursment type",
          file: {},
        },
      ],
    },
  },

  filters: {
    // shortenFileName(value) {
    //   console.log(value);
    //   console.log(value.split(".")[1]);
    //   let file_name = value.split(".")[0];
    //   let file_ext = value.split(".")[1];
    //   return `${file_name.slice(0, 15)}...${file_ext}`;
    // },
  },

  methods: {
    openAttachedFile(file) {
      let link = document.createElement("a");
      link.setAttribute("href", file.url);
      link.setAttribute("download", file.name);
      link.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-info-card {
  margin: 0 0 toRem(34) 0;
  padding: toRem(24);
  width: 100%;

  @include breakpoint-custom-down(640) {
    margin: 0 0 toRem(24);
    padding: toRem(16);
    width: 100%;
  }

  &:last-of-type {
    margin: 0 0 toRem(34);

    @include breakpoint-custom-down(640) {
      margin: 0 0 toRem(34);
    }
  }

  .top-row {
    .card-title {
      @include breakpoint-down(md) {
        font-size: toRem(15.45);
      }
    }
  }

  .bottom-row {
    @include flex-row-start-nowrap;

    @include breakpoint-custom-down(640) {
      @include flex-row-between-wrap;
    }

    .card-item {
      min-width: 45%;

      @include breakpoint-custom-down(640) {
        min-width: 40%;
      }

      @include breakpoint-custom-down(580) {
        min-width: 100%;

        &:nth-of-type(2) {
          margin-top: toRem(24);
        }
      }

      .card-item-title {
        @include breakpoint-down(md) {
          font-size: toRem(11.75);
        }
      }

      .card-item-value {
        @include breakpoint-down(md) {
          font-size: toRem(13.75);
        }
      }

      &:nth-of-type(2) {
        margin-left: toRem(50);

        @include breakpoint-custom-down(640) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>