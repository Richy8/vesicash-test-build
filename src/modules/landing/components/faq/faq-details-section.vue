<template>
  <div class="faq-details-section">
    <div class="vesicash-container">
      <div class="section-wrapper">
        <!-- FAQ SELECTION ROW -->
        <div class="faq-selection-row" ref="selectionRow">
          <router-link
            to="#about"
            class="faq-btn"
            :class="active_hash === 'about' && 'active'"
            >About vesicash</router-link
          >

          <router-link
            to="#process"
            class="faq-btn"
            :class="active_hash === 'process' && 'active'"
            >Our process</router-link
          >

          <router-link
            to="#dispute"
            class="faq-btn"
            :class="active_hash === 'dispute' && 'active'"
            >Disputes</router-link
          >
        </div>

        <!-- FAQ DETAILS -->
        <div class="faq-details">
          <!-- ACCORDION WRAPPER -->
          <div class="accordion-wrapper" id="about">
            <div class="title-text">About vesicash</div>

            <template>
              <FAQCard
                v-for="(faq, index) in faqs.about"
                :key="index"
                :faq="faq"
              />
            </template>
          </div>

          <!-- ACCORDION WRAPPER -->
          <div class="accordion-wrapper" id="process">
            <div class="title-text">Our process</div>

            <template>
              <FAQCard
                v-for="(faq, index) in faqs.process"
                :key="index"
                :faq="faq"
              />
            </template>
          </div>

          <!-- ACCORDION WRAPPER -->
          <div class="accordion-wrapper" id="dispute">
            <div class="title-text">Disputes</div>

            <template>
              <FAQCard
                v-for="(faq, index) in faqs.disputes"
                :key="index"
                :faq="faq"
              />
            </template>
          </div>

          <div class="accordion-wrapper" v-if="false">
            <div class="title-text">Charges</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQDetailsSection",

  components: {
    FAQCard: () =>
      import(
        /* webpackChunkName: "landing-module" */ "@/modules/landing/components/faq/faq-card"
      ),
  },

  watch: {
    $route: {
      handler(value) {
        this.active_hash = value.hash.substring(1);
      },
    },
  },

  data: () => ({
    active_hash: "",

    faqs: {
      about: [
        {
          question: "What is Vesicash?",
          answer:
            "Vesicash is an Instant digital escrow system that ensures payment security for parties involved in a transaction by providing a transparent and accountable transaction process.",
        },
        {
          question: "What is Instant Escrow?",
          answer:
            "<div>Instant escrow is the quickest way to create an escrow transaction. By visiting <a href='https://instant.vesicash.com' class='anchor'>https://instant.vesicash.com</a>, you can pay securely into a transactional escrow account created specifically for your transaction in as little as a minute. <a href='https://instant.vesicash.com' class='anchor'>Get started</a></div>",
        },
        {
          question: "Who can use Instant Escrow?",
          answer:
            "Instant Escrow is ideal for securing your time-sensitive trade deals, ranging from automobile purchases to domain transfer or even that gadget you saw online... It’s really up to you!",
        },
        {
          question: "What is escrow?",
          answer:
            "In an escrow transaction, a trusted third party serves as an intermediary and holds funds securely until the terms of the transaction are met and both transacting parties are satisfied before the funds are released to the seller/service provider.",
        },
        {
          question: "Why use escrow?",
          answer:
            "Vesicash escrow is needed to provide payment security for the transacting parties and ensure that both parties are protected at all stages of a transaction.",
        },
        {
          question: "Who holds the money?",
          answer:
            "For each transaction created on Vesicash, a dedicated unique escrow account is generated. The provisioned trust account is tied to the transacting parties and the transaction, and the funds are held securely in this account until the transaction is completed, after which the account is closed.",
        },
        {
          question: "When can I use Vesicash?",
          answer:
            "Vesicash is designed to give peace of mind whenever you are in doubt or are doing business with  someone you don’t know. Vesicash uses Two-factor authorisation to validate that transaction terms have been met before payment is released.",
        },
        {
          question: "Who can use Vesicash?",
          answer:
            "Vesicash can be used by individuals and businesses that need payment security for their transactions. Businesses like Marketplace platforms who cater to two sets of users (Buyers and Sellers) can also use Vesicash to facilitate trust between transacting parties on their platform.",
        },
        {
          question: "How can I use Vesicash?",
          answer:
            "Vesicash can be used in different ways, depending on your need. Individuals can sign up and use Vesicash for  their peer-peer transactions while businesses can choose from a number of options to have Vesicash integrated (insert link to developer’s page) on their platform.",
        },
        {
          question: "How are transaction disputes resolved?",
          answer:
            "When creating a transaction, users are asked to choose which of the available dispute resolution options (Mutual resolution or Third-party resolution) they would prefer. Should a dispute arise over the course of a transaction, they will need to come to a resolution depending on the option they selected. While a transaction is in dispute, the funds remain in escrow and are not released until a mutual resolution has been reached",
        },
        {
          question: "When are funds released from escrow?",
          answer:
            "<div>When creating a transaction, users are asked to choose which of the available dispute resolution options (Mutual resolution or Third-party resolution) they would prefer. Should a dispute arise over the course of a transaction, they will need to come to a resolution depending on the option they selected. While a transaction is in dispute, the funds remain in escrow and are not released until a mutual resolution has been reached</div> <div class='mgt-24'>Funds being held in escrow are subject to a two-factor authorisation before release from escrow.  Funds are  not released until both Buyer and Seller indicate that the terms of the transaction have been met.</div> ",
        },
        {
          question: "Who can create a transaction?",
          answer:
            "A transaction can be created either by the Seller/service provider or by the Buyer of said goods/services. Once the transaction is created, it is sent to the receiving party for review, after which payment can be made.",
        },
        {
          question: "Who pays for the transaction?",
          answer:
            "When creating a transaction, the option to select who will make the payment for the transaction is available. Either the recipient of the transaction or the sender may be selected as the paying party.",
        },
        {
          question: "Who is a buyer and seller?",
          answer:
            "<div>A buyer is the recipient of a goods and service that is offered by a counterparty in this case referred to as the seller. A buyer is the person that pays for a transaction. The payment is securely held in Vesicash during the transaction period. </div> <div class='mgt-24'>A seller is the person selling goods or offering service to another party and requires the payment to be held in Vesicash pending the time the delivery or completion of the service is done. A seller is the person that receives payment after the transaction is marked completed and payment is authorized by the buyer.</div>",
        },
      ],

      process: [
        {
          question: "What is the Vesicash process?",
          answer:
            "<div class='mgb-24'>Vesicash reduces the risk of fraud by acting as a trusted third-party that collects, holds and disburses funds only when both Buyer and Seller are satisfied.</div> <ul><li class='mgb-12'>Buyer and Seller agree to terms - Either the Buyer or Seller initiates the process by setting the terms of the transaction, including the details of the transaction and the counterparty reviews and agrees to the terms posited.</li> <li class='mgb-12'>Buyer pre-authorises payment - The Buyer‘s funds are held in trust by Vesicash and the Seller is notified that funds have been secured and held in Escrow.</li> <li class='mgb-12'>Seller delivers services/merchandise - The Seller delivers services/merchandise, based on the transaction agreement within the stipulated time.</li> <li class='mgb-12'>Buyer accepts delivery - Once delivery is made, a 24 hour inspection window is opened or as may be agreed by both parties during the creation of the transaction During this period the buyer has the option to accept or open a dispute.</li> <li class='mgb-12'>Funds are released to the Seller - Vesicash releases funds to the Seller and funds are made available for withdrawal.</li></ul>",
        },
      ],

      disputes: [
        {
          question: "What if there is a dispute?",
          answer:
            "Once delivery is confirmed by the seller, the status of the transaction is updated and inspection window is opened. During the inspection period, the buyer has the option to accept or open a dispute. When a dispute is opened, the service provider/seller is notified and a resolution is expected between buyer and seller within 72 hours. If there is a failure to resolve this dispute within 72 hours, the case is escalated to the Vesicash arbitration system for fair and prompt resolution.",
        },
        {
          question: "What happens if a Seller does not confirm delivery?",
          answer:
            "For orders that have been marked as delivered by the Seller, if no action is taken by the Buyer within the 24 hour inspection window, such a transaction is automatically marked as completed.",
        },
        {
          question: "How many parties are involved in an Escrow transaction?",
          answer:
            "Users have the option of creating transactions as a One-one transaction or a Multi-party transactions. Multi-Party transactions are not limited to any number of participants.",
        },
      ],
    },
  }),

  mounted() {
    window.onscroll = () => {
      this.$refs.selectionRow.classList.toggle(
        "fixed-selection",
        window.scrollY > 395
      );
    };
  },
};
</script>

<style lang="scss">
.faq-details-section {
  .section-wrapper {
    margin: auto toRem(120);

    @include breakpoint-down(lg) {
      margin: auto toRem(72);
    }

    @include breakpoint-down(md) {
      margin: auto;
    }

    .faq-selection-row {
      @include flex-row-center-nowrap;
      gap: toRem(32);
      margin-bottom: toRem(-40);

      @include breakpoint-down(lg) {
        gap: toRem(24);
      }

      @include breakpoint-down(sm) {
        display: none;
      }

      .faq-btn {
        border: toRem(1) solid getColor("grey-100");
        font-family: "Roobert-Medium", sans-serif;
        padding: toRem(13) toRem(20);
        @include font-height(16, 22);
        @include transition(0.4s);
        color: getColor("grey-900");
        border-radius: toRem(32);
        text-align: center;
        cursor: pointer;

        &:hover {
          border: toRem(1) solid getColor("grey-200");
          background: getColor("grey-10");
        }

        &.active {
          border: toRem(1) solid getColor("grey-200");
          background: getColor("grey-50");
        }
      }
    }

    .faq-details {
      margin-bottom: toRem(150);

      .accordion-wrapper {
        padding-top: toRem(96);

        .title-text {
          font-family: "Roobert-Bold", sans-serif;
          @include generate-font-type("h3");
          color: getColor("teal-900");
          margin-bottom: toRem(32);

          @include breakpoint-down(md) {
            @include generate-font-type("h4");
          }
        }
      }
    }
  }
}

.anchor {
  @include generate-font-type("h7");
  font-size: toRem(19);
  color: getColor("neutral-10");
  text-decoration: underline;

  @include breakpoint-down(md) {
    @include font-height(16, 24);
  }
}

.fixed-selection {
  background: getColor("neutral-10");
  padding: toRem(10) 0 toRem(10);
  position: fixed;
  top: toRem(60);
  z-index: 999;
  width: 100%;
  left: 0;
}
</style>