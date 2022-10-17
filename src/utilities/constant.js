import {
  VESICASH_API_BASE_URL,
  VESICASH_API_VERSION,
  VESICASH_PRIVATE_KEY,
  VESICASH_PUBLIC_KEY,
} from "@/env";

export const VESICASH_AUTH_USER = "VESICASH_AUTH_USER";
export const VESICASH_AUTH_TOKEN = "VESICASH_AUTH_TOKEN";

// ENVIRONMENT CONSTANTS
export const VESICASH_API_URL = `${VESICASH_API_BASE_URL}/${VESICASH_API_VERSION}`;
export const VESICASH_PRIVATE_KEY_TOKEN = VESICASH_PRIVATE_KEY;
export const VESICASH_PUBLIC_KEY_TOKEN = VESICASH_PUBLIC_KEY;

// VESICASH WALLETS
export const NAIRA_WALLET = [
  {
    title: "Currency",
    value: "Naira",
  },
  {
    title: "Bank name",
    value: "Providus bank",
  },
  {
    title: "Account name",
    value: "Vesicash LLC",
  },
  {
    title: "Account number",
    value: "04958585895",
  },
];

export const DOLLAR_WALLET = [
  {
    title: "Bank name",
    value: "Providus bank",
  },
  {
    title: "Beneficiary name",
    value: "Vesicsh innovative tech lTD",
  },
  {
    title: "Beneficiary account number",
    value: "1300390961",
  },
  {
    title: "Bank identifier/Swift code",
    value: "UMPLNGLA",
  },
  {
    title: "Address",
    value: "Plot 54, Adetokumbo Adedamola street",
  },
  {
    title: "City",
    value: "Lagos",
  },
  {
    title: "Country",
    value: "Nigeria",
  },
];
