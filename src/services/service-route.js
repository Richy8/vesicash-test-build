// ============================================================
// ALL APPLICATION FUNCTIONS RELATED TO ROUTE/URL HANDLING
// ============================================================

// ============================================================
// APPEND TIME HASH TOKEN TO URL ROUTE TO PREVENT
// BROWSER CACHING ON GET REQUEST
// ============================================================
const urlHash = (url) => {
  return url.includes("?")
    ? `${url}&timestamp=${new Date().getTime()}`
    : `${url}?timestamp=${new Date().getTime()}`;
};

export { urlHash };
