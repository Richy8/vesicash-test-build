<template>
  <tr @click="viewTransactionDetails">
    <td class="body-data" :class="`${table_name}-1`">
      <div class="text mgb-6 text-no-wrap">
        {{ data.title }}
      </div>
      <div class="meta tertiary-3-text grey-600">{{ getTransactionType }}</div>
    </td>

    <td class="body-data" :class="`${table_name}-2`">
      <div class="text mgb-6 text-no-wrap">{{ getPartyCount }} party</div>
      <div class="meta tertiary-3-text grey-600">
        {{ data.parties.length }} people
      </div>
    </td>

    <td class="body-data" :class="`${table_name}-3`">{{ getCreatedDate }}</td>

    <td class="body-data" :class="`${table_name}-4`">
      <div class="text mgb-6 text-no-wrap">
        {{ $money.getSign(data.currency)
        }}{{
          $money.addComma(data.totalAmount ? data.totalAmount : data.amount)
        }}
      </div>
      <div class="meta tertiary-3-text grey-600">
        {{ $money.getSign(data.currency)
        }}{{ $money.addComma(data.amount_paid) }} paid
      </div>
    </td>

    <td class="body-data" :class="`${table_name}-5`">
      <TagCard
        :card_text="getCurrentTransactionStatus"
        :card_type="getCurrentTransactionStatus | getStatusColor(status_colors)"
      />
    </td>

    <td class="body-data" :class="`${table_name}-6`">
      <button class="btn btn-secondary btn-sm">View</button>
    </td>
  </tr>
</template>

<script>
import { mapMutations } from "vuex";
import TagCard from "@/shared/components/card-comps/tag-card";

export default {
  name: "DisbursementTableRow",

  components: {
    TagCard,
  },

  props: {
    table_name: {
      type: String,
      default: "",
    },

    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getCreatedDate() {
      let first_milestone_date =
        `${
          this.data?.milestones[0]?.due_date.split(" ")[0] ?? "2022-01-01"
        } 00:00:00` ?? this.data?.due_date_formatted;

      let { d3, m4, y1 } = this.$date.formatDate(first_milestone_date).getAll();

      return `${d3} ${m4}, ${y1}`;
    },

    getTransactionType() {
      return this.data.type === "oneoff"
        ? "One-off disbursement"
        : "Milestone disbursement";
    },

    getPartyCount() {
      return this.data.parties.length === 2 ? "1 on 1" : "Multi";
    },

    getTotalTransactionAmount() {
      return this.data.milestones.length
        ? this.data.milestones.reduce(
            (total, count) => (total += Number(count.amount)),
            0
          )
        : this.data.amount;
    },

    getCurrentTransactionStatus() {
      let MS = this.data?.milestones?.slice()?.reverse();

      // CHECK IF MILESTONE HAS LENGTH
      if (!MS.length) return this.status.CLS;

      // CHECK FOR ONEOFF TYPE
      if (this.data.type === "oneoff") {
        return MS[0]?.status ?? this.status.CLS;
      }

      // CHECK FOR MILESTONE TYPE
      else {
        // CHECK IF FIRST MILESTONE IS SENT AWAITING
        if (MS[0]?.status === this.status.SAC) {
          return MS[0]?.status ?? this.status.SAC;
        }

        // CHECK IF LAST MILESTONE CONTAINS A CLOSED STATUS
        else if (MS.at(-1)?.status?.toLowerCase().includes("closed")) {
          return MS.at(-1)?.status ?? this.status.SAC;
        }

        // CHECK OTHER STATUS
        else {
          MS.map((milestone, index) => {
            if (MS.length === index + 1)
              return milestone?.status ?? this.status.SAC;
            else if (!milestone?.status.toLowerCase().includes("closed"))
              return milestone?.status ?? this.status.SAC;
            else return this.status.SAC;
          });
        }
      }
    },
  },

  filters: {
    getStatusColor(status, status_colors) {
      return status_colors[status?.toLowerCase()] || "error";
    },
  },

  data() {
    return {
      status: {
        SAC: "Sent - Awaiting Confirmation",
        CLS: "Closed",
      },

      status_colors: {
        "sent - awaiting confirmation": "progress",
        "sent - Rejected": "error",
        "accepted - not funded": "error",
        "accepted - funded": "okay",
        draft: "okay",
        "in progress": "progress",
        delivered: "okay",
        "delivered - accepted": "success",
        "delivered - rejected": "error",
        "closed - disbursement complete": "success",
        completed: "success",
        "closed - refunded": "error",
        "closed - not funded": "error",
        closed: "error",
      },
    };
  },

  methods: {
    ...mapMutations({
      UPDATE_TRANSACTION_DETAILS: "transactions/UPDATE_TRANSACTION_DETAILS",
    }),

    viewTransactionDetails() {
      // this.updateTransactionDetails(this.data);

      this.$router.push({
        name: "TransactionDetails",
        params: { id: this.data.transaction_id },
        query: {
          type: this.data.type,
          party: this.data.parties.length === 2 ? "single" : "multiple",
        },
      });
    },

    // UPDATE TRANSACTION DETAILS STATE
    updateTransactionDetails(payload) {
      this.UPDATE_TRANSACTION_DETAILS(payload);
    },
  },
};
</script>

<style>
</style>