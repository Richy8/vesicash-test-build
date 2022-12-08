<template>
  <div class="solution-section">
    <div class="vesicash-container">
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-4"
          v-for="(solution, index) in solutions"
          :key="index"
        >
          <SolutionCard :solution="solution" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolutionSection",

  components: {
    SolutionCard: () =>
      import(
        /* webpackChunkName: "landing-module"  */ "@/modules/landing/components/solutions/solution-card"
      ),
  },

  data: () => ({
    solutions: [
      {
        icon: "wallet-icon.png",
        title: "Multi-Currency Wallet Support / Accounts",
        description:
          "Make and receive business payments from all over the world. Withdraw money from a linked bank account or send money to over 195 countries with just a few clicks.",
      },
      {
        icon: "certified-icon.png",
        title: "Instant Digital Escrow",
        description:
          "Payment security for your business. Via our fully adaptable, patented escrow technology, transaction control is distributed equally, ensuring payment assurance and transparency.",
      },
      {
        icon: "exchange-icon.png",
        title: "Foreign Exchange",
        description:
          "Access foreign exchange for your business, easily, and at unbeatable rates.",
      },
      {
        icon: "money-icon.png",
        title: "Liquidity Provisioning",
        description:
          "Vesicash provides liquidity management solutions to promote cash flow by optimising surplus liquidity in one currency into another currency or asset class, thereby reducing risk and improving liquidity duration.",
      },
      {
        icon: "bank-icon.png",
        title: "Treasury Management",
        description:
          "Vesicash provides treasury management services for corporates who want to manage their foreign exchange exposure.",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.solution-section {
  padding-bottom: toRem(58);
}
</style>