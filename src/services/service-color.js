// ============================================================
// ALL APPLICATION METHODS RELATED TO COLORS MANIPULATION
// ============================================================

class serviceColor {
  // ===============================
  // SET PAGE BACKGROUND COLOR
  // ===============================
  setPageBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  // ==============================================
  // GET A RANDOM NUMBER WITHIN A NUMBER RANGE
  // ==============================================
  getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export const $serviceColor = new serviceColor();
