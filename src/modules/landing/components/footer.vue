<template>
  <div class="footer-section">
    <div class="vesicash-container">
      <div class="row mgb-50">
        <div class="col-12 col-sm-12 col-md-5 col-lg-6 footer-left">
          <div class="brand-logo mgb-28">
            <VesicashBrandLogo />
          </div>

          <a href="mailto:info@vesicash.com" class="info-text mgb-16"
            >info@vesicash.com</a
          >

          <a href="tel:+2347039914767" class="info-text">+234 703 991 4767</a>

          <!-- SOCIAL ICONS -->
          <div class="social-icons mgt-32">
            <a href="" class="social-link">
              <div class="icon icon-instagram"></div>
            </a>

            <a href="" class="social-link">
              <div class="icon icon-facebook"></div>
            </a>

            <a href="" class="social-link">
              <div class="icon icon-twitter"></div>
            </a>

            <a href="" class="social-link">
              <div class="icon icon-linkedin"></div>
            </a>
          </div>
        </div>

        <!-- NAVIGATION LINKS CONTAINER -->
        <div
          class="col-12 col-sm-12 col-md-7 col-lg-6 footer-right mt-5 mt-md-0"
        >
          <div class="row">
            <div class="col-12 col-sm-4 mb-5 mb-sm-0">
              <div class="nav-item fw-700 mgb-24">Product</div>

              <a href="" class="nav-item nav-item-link">Our products</a>
              <a href="" class="nav-item nav-item-link">What we do</a>
              <a href="" class="nav-item nav-item-link">Our clients</a>
              <a href="" class="nav-item nav-item-link">Privacy Policy</a>
              <a href="" class="nav-item nav-item-link">Terms of Use</a>
            </div>

            <div class="col-12 col-sm-4 mb-5 mb-sm-0">
              <div class="nav-item fw-700 mgb-24">Company</div>

              <a href="" class="nav-item nav-item-link">About Us</a>
              <a href="" class="nav-item nav-item-link">Blog</a>
              <a href="" class="nav-item nav-item-link">Supported Countries</a>
              <a href="" class="nav-item nav-item-link">SMEs</a>
              <a href="" class="nav-item nav-item-link">FAQs</a>
              <a href="" class="nav-item nav-item-link">Contact</a>
              <a href="" class="nav-item nav-item-link">Careers </a>
            </div>

            <div class="col-12 col-sm-4">
              <div class="nav-item fw-700 mgb-24">Developer</div>

              <a href="" class="nav-item nav-item-link">Overview</a>
              <a href="" class="nav-item nav-item-link">Plugins</a>
              <a href="" class="nav-item nav-item-link">Documentation</a>
              <a href="" class="nav-item nav-item-link">Status Page</a>
            </div>
          </div>
        </div>
      </div>

      <!-- COPYRIGHT TEXT -->
      <div class="row copyright-row">
        <div
          class="
            copyright-text
            col-12
            grey-900
            text-center
            tertiary-1-text
            roobert-400
          "
        >
          Copyright 2022. Vesicash Innovative Technologies.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VesicashBrandLogo from "@/shared/components/icon-comps/vesicash-brand-logo";

export default {
  name: "Footer",

  components: {
    VesicashBrandLogo,
  },
};
</script>

<style lang="scss" scoped>
.footer-section {
  margin-top: toRem(110);

  @include breakpoint-down(md) {
    margin-top: toRem(80);
  }

  .footer-left {
    .brand-logo {
      svg {
        width: toRem(190);
        height: auto;
      }
    }

    .info-text {
      @include generate-font-type("tertiary-1");
      font-family: "Roobert-Medium", sans-serif;
      color: getColor("grey-900");
      display: block;

      &:hover {
        color: getColor("green-600");
      }
    }

    .social-icons {
      @include flex-row-start-nowrap;

      .social-link {
        border: toRem(1) solid getColor("grey-100");
        @include transition(0.4s);
        border-radius: toRem(40);
        margin-right: toRem(22);
        @include draw-shape(48);
        position: relative;

        .icon {
          color: getColor("teal-900");
          @include center-placement;
          @include transition(0.4s);
          font-size: toRem(22);
        }

        &:last-of-type {
          margin-right: 0;
        }

        &:hover {
          background: getColor("grey-50");

          .icon {
            color: getColor("green-600");
          }
        }
      }
    }
  }

  .footer-right {
    .nav-item {
      @include generate-font-type("primary-1");
      font-family: "Roobert-Bold", sans-serif;
      color: getColor("teal-900");

      &:last-of-type {
        margin-bottom: 0;
      }

      &-link {
        @include generate-font-type("tertiary-1");
        font-family: "Roobert-Regular", sans-serif;
        color: getColor("grey-700");
        margin-bottom: toRem(24);
        width: max-content;
        display: block;

        &:hover {
          color: getColor("green-600");
        }
      }
    }
  }

  .copyright-row {
    border-top: toRem(0.5) solid getColor("grey-100");
    padding: toRem(50) 0 toRem(84);

    .copyright-text {
      @include breakpoint-down(sm) {
        font-size: toRem(15);
      }
    }
  }
}
</style>