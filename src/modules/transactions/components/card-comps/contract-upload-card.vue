<template>
  <div
    class="contract-upload-card rounded-12 border-grey-100 smooth-transition"
  >
    <!-- CONTENT STATE -->
    <template name="content-state" v-if="getFileName">
      <div class="content-state wt-100">
        <!-- LEFT SECTION -->
        <div class="left-section wt-100">
          <div class="icon-card rounded-circle teal-50-bg">
            <FileIcon active />
          </div>

          <!-- FILE DETAILS -->
          <div class="wt-100">
            <!-- FILE TITLE -->
            <div class="file-title primary-1-text grey-900">
              {{ getFileName }} &nbsp;
              <span
                class="tertiary-2-text green-500"
                v-if="getFileData.uploading"
                >({{ getFileData.progress }}%)</span
              >
            </div>

            <!-- FILE PROGRESS -->
            <template v-if="getFileData.uploading">
              <div class="file-progress green-50-bg rounded-8">
                <div
                  class="progress-stat green-500-bg"
                  :style="'width:' + getFileData.progress + '%'"
                ></div>
              </div>
            </template>

            <!-- FILE SIZE -->
            <template v-else>
              <div class="file-size tertiary-2-text grey-600">
                {{ getFileData.size }}
              </div>
            </template>
          </div>
        </div>

        <!-- RIGHT SECTION -->
        <div
          class="right-section rounded-circle pointer smooth-transition"
          title="Delete file"
          @click="removeAttachedFile"
        >
          <div class="icon-trash"></div>
        </div>
      </div>
    </template>

    <!-- NO CONTENT STATE -->
    <template name="no-content-state" v-else>
      <label class="no-content-state pointer" for="fileUpload">
        <!-- ICON HOLDER -->
        <div class="icon-holder mgb-8">
          <FileIcon />
        </div>

        <!-- TITLE TEXT -->
        <div class="title-text grey-900 primary-1-text text-center mgb-4">
          Click to upload agreement file
        </div>

        <!-- DESCRIPTION TEXT -->
        <div class="description-text tertiary-2-text grey-600 text-center">
          You can upload a doc or a PDF file
        </div>
      </label>

      <!-- FILE INPUT FIELD -->
      <input
        type="file"
        id="fileUpload"
        ref="fileUpload"
        @change="handleFileUpload"
        class="position-absolute invisible"
        accept=".doc, .docx, .pdf"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import FileIcon from "@/shared/components/icon-comps/file-icon";

export default {
  name: "ContractUploadCard",

  components: {
    FileIcon,
  },

  computed: {
    ...mapGetters({ getFileData: "general/getFileData" }),

    getFileName() {
      return this.getFileData?.name ?? null;
    },
  },

  data: () => ({}),

  methods: {
    ...mapActions({
      uploadFile: "general/uploadFile",
      uploadToSpace: "general/uploadToSpace",
      clearAttachedFile: "general/clearAttachedFile",
    }),

    ...mapMutations({ UPDATE_FILE_PROGRESS: "general/UPDATE_FILE_PROGRESS" }),

    handleFileUpload($event) {
      let uploaded_file = [...$event.target.files][0];
      this.$refs.fileUpload.value = ""; // CLEAR OUT FILE CACHE

      if (!this.processFileSize(uploaded_file.size)) {
        this.pushToast("Upload a maximum file size of 1mb", "error");
        return false;
      }

      this.uploadToSpace({
        file: uploaded_file,
        formatted_size: this.processFileSize(uploaded_file.size),
      })
        .then((_) => _)
        .catch((err) => console.log(err));
    },

    processFileSize(size) {
      if (size > 1000000) return false;

      return size.toString().length >= 6
        ? `${(size / 1000000).toFixed(1)}mb`
        : `${(size / 1000).toFixed(1)}kb`;
    },

    removeAttachedFile() {
      this.clearAttachedFile();
    },
  },
};
</script>

<style lang="scss">
.contract-upload-card {
  position: relative;

  .no-content-state {
    padding: toRem(17) toRem(16);
    @include flex-column-center;

    &:hover {
      background: getColor("grey-10");
    }

    svg {
      @include draw-shape(25);

      .dark-theme {
        @include transition(0.375s);
        fill: getColor("grey-500");
      }

      .light-theme {
        @include transition(0.375s);
        fill: getColor("grey-300");
      }
    }

    &:hover {
      svg {
        .dark-theme {
          fill: getColor("teal-800");
        }

        .light-theme {
          fill: getColor("teal-200");
        }
      }
    }

    .title-text {
      @include breakpoint-down(xs) {
        font-size: toRem(15.25);
      }
    }

    .description-text {
      @include breakpoint-down(xs) {
        font-size: toRem(13.5);
      }
    }
  }

  .content-state {
    @include flex-row-between-nowrap;
    padding: toRem(17) toRem(16);

    .left-section {
      @include flex-row-start-nowrap;

      .icon-card {
        position: relative;
        @include draw-shape(48);
        margin-right: toRem(16);

        @include breakpoint-down(xs) {
          margin-right: toRem(12);
          @include draw-shape(45);
        }

        svg {
          @include center-placement();
          @include draw-shape(28);

          @include breakpoint-down(xs) {
            @include draw-shape(24);
          }
        }
      }

      .file-title {
        font-size: toRem(15.5);

        @include breakpoint-down(sm) {
          font-size: toRem(15);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(14.25);
        }
      }

      .file-progress {
        margin-top: toRem(8);
        position: relative;
        height: toRem(8);
        overflow: hidden;
        width: 100%;

        .progress-stat {
          position: absolute;
          height: 100%;
          left: 0;
        }
      }

      .file-size {
        @include breakpoint-down(xs) {
          font-size: toRem(13.5);
        }
      }
    }

    .right-section {
      border: toRem(1) solid getColor("grey-100");
      @include draw-shape(48);
      margin-left: toRem(10);
      position: relative;

      @include breakpoint-down(xs) {
        @include draw-shape(45);
      }

      .icon-trash {
        @include center-placement();
        font-size: toRem(26);
        color: #ac2e0e;

        @include breakpoint-down(xs) {
          font-size: toRem(23);
        }
      }

      &:hover {
        border-color: getColor("grey-50");
        background: getColor("grey-50");
      }
    }
  }
}
</style>