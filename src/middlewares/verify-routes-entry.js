import { getStorage, checkAuthTimeout } from "@/utilities/auth-utils";
import { VESICASH_TOKEN_STRING } from "@/utilities/constant";

// ========================================
// VERIFY AUTHENTICATED USER ROUTE ENTRY
// ========================================
const verifyAuthRoutes = (to, next) => {
  if (getStorage(VESICASH_TOKEN_STRING) === null) {
    next({
      name: "VesicashLogin",
    });
  } else if (getStorage(VESICASH_TOKEN_STRING) !== null) {
    // CHECK SESSION TIMEOUT IN 60 MINUTES
    if (checkAuthTimeout(60));
    else next();
  }
};

// ========================================
// VERIFY GUEST USER ROUTE ENTRY
// ========================================
const verifyGuestRoutes = (to, next) => {
  if (getStorage(VESICASH_TOKEN_STRING) === null) next();
  else {
    // CHECK SESSION TIMEOUT IN 60 MINUTES
    if (checkAuthTimeout(60));
    else next({ name: "VesicashDashboard" });
  }
};

export { verifyAuthRoutes, verifyGuestRoutes };
