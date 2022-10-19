// =============================================
// APPLICATION AUTHENTICATION MIDDLEWARE
// =============================================

import {
  verifyAuthRoutes,
  verifyGuestRoutes,
} from "@/middlewares/verify-routes-entry";

// GET USER AUTHENTICATION TOKEN

export default (to, from, next) => {
  // =========================================
  // VERIFY IF ROUTE NEEDS AUTHENTICATION
  // =========================================
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    verifyAuthRoutes(to, next);
  }

  // =========================================
  // VERIFY IF ROUTE IS A JUST A GUEST
  // =========================================
  else if (to.matched.some((record) => record.meta.guest)) {
    verifyGuestRoutes(to, next);
  }

  // FALLBACK
  else next();
};
