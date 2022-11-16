<template>
  <div class="feature-section">
    <div class="vesicash-container row">
      <div class="col-12 col-md-6 mb-5 mb-md-0">
        <FeatureCard
          :feature="{
            title: 'Instant digital escrow',
            description:
              'Deploy escrow as a transparent fund management solution, or for (international) transactional purposes. Disburse escrowed funds in a single payment or according to milestones. Split your disbursement into commissions as needed.',
            image: 'feature-one.png',
          }"
        />
      </div>

      <div class="col-12 col-md-6">
        <FeatureCard
          :feature="{
            title: 'Global payouts and settlements',
            description:
              'We offer a range of global payout solutions that allow our clients to receive payments around the world — all within one system. You can choose from our universal payment solution, or customise your own with highly competitive rates and service levels. Obtain and exchange currencies, relevant to your business needs.',
            image: 'feature-two.png',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureSection",

  components: {
    FeatureCard: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/home/feature-card"
      ),
  },
};
</script>

<style lang="scss" scoped>
.feature-section {
  padding: toRem(120) toRem(20);

  @include breakpoint-down(lg) {
    padding: toRem(100) 0;
  }

  @include breakpoint-down(md) {
    padding: toRem(80) 0;
  }
}
</style>