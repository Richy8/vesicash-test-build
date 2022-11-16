// ============================================================
// ALL APPLICATION METHODS RELATED TO CURRENCY HANDLING
// ============================================================

class serviceCurrency {
  // ===================================
  // FORMAT CURRENCY SIGN
  // ===================================
  getSign(currency) {
    let currency_type = "",
      naira = "₦",
      dollar = "$",
      pound = "£";

    switch (currency) {
      case "naira":
      case "NGN":
        currency_type = naira;
        break;
      case "dollar":
      case "USD":
        currency_type = dollar;
        break;
      case "pound":
      case "GBP":
        currency_type = pound;
        break;
      default:
        console.log("Currency sign not available yet!");
    }

    return currency_type;
  }

  // ===================================
  // FORMAT CURRENCY COMMA SEPARATOR
  // ===================================
  addComma(currency) {
    return new Intl.NumberFormat().format(currency);
  }
}

export const $serviceCurrency = new serviceCurrency();
