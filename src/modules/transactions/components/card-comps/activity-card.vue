<template>
  <div class="activity-card rounded-16 border-grey-100">
    <!-- USER ACTIVITIES -->
    <div class="activities">
      <template v-for="(activity, index) in activities.slice().reverse()">
        <div class="activity" :key="index">
          <!-- DESCRIPTION TEXT -->
          <div class="description-text grey-900 tertiary-2-text mgb-6">
            {{ activity.description }}
          </div>

          <!-- TIMESTAMP TEXT -->
          <div class="timestamp-text grey-600 tertiary-3-text">
            {{ activity.created_at | formatDate($date) }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityCard",

  props: {
    activities: {
      type: Array,
    },
  },

  filters: {
    formatDate(value, formatter) {
      let { w2, h01, b2, d3, m4, y1 } = formatter.formatDate(value).getAll();
      return `${w2} ${h01}:${b2}, ${d3} ${m4} ${y1}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-card {
  padding: toRem(16) toRem(18);

  .activity {
    border-left: toRem(1) solid getColor("grey-300");
    margin-bottom: toRem(18);
    padding-left: toRem(21);
    position: relative;

    &:last-of-type {
      margin-bottom: 0;
    }

    &:before {
      content: "";
      position: absolute;
      border-radius: 50%;
      @include draw-shape(21.5);
      background: getColor("grey-300");
      border: toRem(6) solid getColor("neutral-10");
      top: toRem(-3);
      left: toRem(-11);
    }

    &:after {
      content: "";
      position: absolute;
      @include draw-shape(3);
      background: getColor("neutral-10");
      bottom: 0;
      left: toRem(-1.5);
    }

    .description-text {
      line-height: toRem(21);

      @include breakpoint-down(sm) {
        line-height: toRem(20.75);
        font-size: toRem(13.5);
      }
    }

    .timestamp-text {
      font-size: toRem(12.45);
    }
  }
}
</style>