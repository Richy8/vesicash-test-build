import { getStorage, checkAuthTimeout } from "@/utilities/auth-utils";
import { VESICASH_AUTH_TOKEN } from "@/utilities/constant";

// ========================================
// VERIFY AUTHENTICATED USER ROUTE ENTRY
// ========================================
const verifyAuthRoutes = (to, next) => {
  if (getStorage(VESICASH_AUTH_TOKEN) === null) {
    next({
      name: "VesicashLogin",
    });
  } else if (getStorage(VESICASH_AUTH_TOKEN) !== null) {
    // CHECK SESSION TIMEOUT IN 60 MINUTES
    if (checkAuthTimeout(90));
    else next();
  }
};

// ========================================
// VERIFY GUEST USER ROUTE ENTRY
// ========================================
const verifyGuestRoutes = (to, next) => {
  if (getStorage(VESICASH_AUTH_TOKEN) === null) next();
  else {
    // CHECK SESSION TIMEOUT IN 60 MINUTES
    if (checkAuthTimeout(90));
    else next({ name: "VesicashDashboard" });
  }
};

export { verifyAuthRoutes, verifyGuestRoutes };
