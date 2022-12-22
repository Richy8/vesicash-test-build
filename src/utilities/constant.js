const APP_URL = process.env.VUE_APP_VESICASH_APP_BASE_URL;
const API_BASE_URL = process.env.VUE_APP_VESICASH_API_BASE_URL;
const API_VERSION = process.env.VUE_APP_VESICASH_API_VERSION;
const PRIVATE_KEY = process.env.VUE_APP_VESICASH_PRIVATE_KEY;
const PUBLIC_KEY = process.env.VUE_APP_VESICASH_PUBLIC_KEY;

// ENVIRONMENT CONSTANTS
export const VESICASH_AUTH_USER = "VESICASH_AUTH_USER";
export const VESICASH_AUTH_TOKEN = "VESICASH_AUTH_TOKEN";

export const VESICASH_APP_URL = APP_URL;
export const VESICASH_API_URL = `${API_BASE_URL}/${API_VERSION}`;
export const VESICASH_PRIVATE_KEY_TOKEN = PRIVATE_KEY;
export const VESICASH_PUBLIC_KEY_TOKEN = PUBLIC_KEY;

// if [ "$NODE_ENV" = "development" ];
// then npm install
// else npm install --only=production;
// fi

// if [ "$NODE_ENV" = 'development' ]; then \
//         npm install -g nodemon; \
//         fi
