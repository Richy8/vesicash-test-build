// ============================================================
// ALL APPLICATION METHODS RELATED TO INPUT VALIDATIONS
// ============================================================

class serviceValidators {
  // =========================================
  // EMAIL AND PHONE VALIDATION REGEX
  // =========================================
  #email_regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  #phone_regex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;

  // =========================================
  // A SIMPLE METHOD TO TRIM FORM INPUT
  // =========================================
  trimInput(input) {
    return input.trim();
  }

  // ==========================================
  // VALIDATE USER ENTERED EMAIL INPUT VALUE
  // ==========================================
  validateEmailInput(input) {
    return this.#email_regex.test(String(this.trimInput(input)).toLowerCase())
      ? true
      : false;
  }

  // ============================================
  // VALIDATE USER ENTERED PHONE INPUT VALUE
  // ============================================
  validatePhoneInput(input) {
    return this.#phone_regex.test(this.trimInput(input)) ? true : false;
  }

  // =============================================
  // VALIDATE USER ENTERED PASSWORD INPUT VALUE
  // =============================================
  validatePasswordInput(input, length = 4) {
    return this.trimInput(input).length < length ? false : true;
  }

  // =============================================
  // VALIDATE A SINGLE USER NAME
  // =============================================
  validateSingleName(input) {
    return this.trimInput(input).length >= 2 ? true : false;
  }

  // =============================================
  // VALIDATE A DOUBLE USER NAME
  // =============================================
  validateDoubleName(input) {
    const numbers = "0123456789";

    let word_limit = this.trimInput(input).split(" ");
    let check_digits = (string) =>
      [...string].some((c) => [...numbers].includes(c));

    // CHECK FOR FIRST NUMBER ENTRY
    if (this.trimInput(input).length <= 2)
      return "Enter a minimum of 2 characters";
    else if (word_limit.length === 1)
      return "Both first and last names are required";
    else if (word_limit.length > 2) return "Enter only first and last names";
    else if (check_digits(this.trimInput(input)))
      return "Fullname should not contain any number";
    else return null;
  }
}

export const $serviceValidators = new serviceValidators();
