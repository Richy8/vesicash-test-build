// ============================================================
// ALL APPLICATION METHODS RELATED TO CURRENCY HANDLING
// ============================================================

class serviceCurrency {
  // ===================================
  // FORMAT CURRENCY SIGN
  // ===================================
  getSign(currency) {
    let currency_type = "",
      naira = "&#8358",
      dollar = "&#36";

    switch (currency) {
      case "naira":
      case "NGN":
        currency_type = naira;
        break;
      case "dollar":
      case "USD":
        currency_type = dollar;
        break;
      default:
        console.log("Currency sign not available yet!");
    }

    return currency_type;
  }
}

export const $serviceCurrency = new serviceCurrency();
