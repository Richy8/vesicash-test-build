<template>
  <div class="contract-upload-card rounded-12 border-grey-100 smooth-transition">
    <!-- CONTENT STATE -->
    <template name="content-state" v-if="fileExist">
      <div
        class="content-state wt-100"
        v-for="(file,index) in getFileData.files"
        :key="index+file.name"
      >
        <!-- LEFT SECTION -->
        <div class="left-section wt-100">
          <div class="icon-card rounded-circle teal-50-bg">
            <FileIcon active />
          </div>

          <!-- FILE DETAILS -->
          <div class="wt-100">
            <!-- FILE TITLE -->
            <div class="file-title primary-1-text grey-900">
              {{ file.name }} &nbsp;
              <span
                class="tertiary-2-text green-500"
                v-if="file.uploading"
              >({{ file.progress }}%)</span>
            </div>

            <!-- FILE PROGRESS -->
            <template v-if="file.uploading">
              <div class="file-progress green-50-bg rounded-8">
                <div class="progress-stat green-500-bg" :style="'width:' + file.progress + '%'"></div>
              </div>
            </template>

            <!-- FILE SIZE -->
            <template v-else>
              <div class="file-size tertiary-2-text grey-600">{{ file.size }}</div>
            </template>
          </div>
        </div>

        <!-- RIGHT SECTION -->
        <div
          class="right-section rounded-circle pointer smooth-transition"
          title="Delete file"
          @click="removeAttachedFile(index,docID)"
        >
          <div class="icon-trash"></div>
        </div>
      </div>
    </template>

    <!-- NO CONTENT STATE -->
    <template name="no-content-state" v-else>
      <label class="no-content-state pointer" :for="docID" @click="$emit('upload','')">
        <!-- ICON HOLDER -->
        <div class="icon-holder mgb-8">
          <FileIcon />
        </div>

        <!-- TITLE TEXT -->
        <div class="title-text grey-900 primary-1-text text-center mgb-4">{{ titleText }}</div>

        <!-- DESCRIPTION TEXT -->
        <div
          class="description-text tertiary-2-text grey-600 text-center"
        >You can upload a doc or a PDF file</div>
      </label>

      <!-- FILE INPUT FIELD -->
      <input
        type="file"
        :id="docID"
        ref="fileUpload"
        @change="handleFileUpload"
        class="position-absolute invisible"
        accept=".doc, .docx, .pdf"
        :multiple="fileCount>1"
        :disabled="isDisabled"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import FileIcon from "@/shared/components/icon-comps/file-icon";

export default {
  name: "DocUploadCard",

  components: {
    FileIcon,
  },

  props: {
    titleText: {
      type: String,
      default: "Click to upload agreement file",
    },

    docID: {
      type: String,
      default: "doc_upload",
    },

    fileCount: {
      type: Number,
      default: 1,
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({ getAllFilesData: "general/getAllFilesData" }),

    getFileData() {
      const file_data = this.getAllFilesData(this.docID);
      return file_data === undefined ? null : file_data;
    },

    fileExist() {
      return this.getFileData?.files?.length ? true : false;
    },
  },

  data() {
    return {};
  },

  methods: {
    ...mapActions({
      uploadFile: "general/uploadFile",
      uploadToCloud: "general/uploadToCloud",
      clearAttachedFile: "general/clearAllAttachedFiles",
    }),

    ...mapMutations({ REMOVE_UPLOADED_FILE: "general/REMOVE_UPLOADED_FILE" }),

    handleFileUpload($event) {
      const uploaded_files = [...$event.target.files].slice(0, this.fileCount);

      this.$refs.fileUpload.value = ""; // CLEAR OUT FILE CACHE

      if (uploaded_files.length < this.fileCount) {
        this.$emit("upload", `Upload at least ${this.fileCount} files`);
        return;
      }

      this.verifyFilesSize(uploaded_files);

      const formatted_files = uploaded_files.map((file) => {
        file.formatted_size = this.processFileSize(file.size);
        return file;
      });

      const payload = {
        files: formatted_files,
        id: this.docID,
      };

      this.uploadToCloud(payload)
        .then((response) => {
          if (response.code) this.$emit("uploaded", response.data);
        })
        .catch((err) => console.log(err));
    },

    processFileSize(size) {
      if (size > 1000000) return false;
      return size.toString().length >= 6
        ? `${(size / 1000000).toFixed(1)}mb`
        : `${(size / 1000).toFixed(1)}kb`;
    },

    verifyFilesSize(files) {
      files.forEach((file) => {
        if (!this.processFileSize(file.size)) {
          this.pushToast("Upload a maximum file size of 1mb", "error");
          return false;
        }
      });
    },

    removeAttachedFile(index, id) {
      this.REMOVE_UPLOADED_FILE({ index, id });
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