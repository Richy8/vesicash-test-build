export default {
    SET_NIGERIAN_BANKS: (state, banks) => (state.nigerian_banks = banks),
    SET_BANK_ACCOUNTS: (state, accounts) => (state.bank_accounts = accounts),
    SET_API_KEYS: (state, keys) => (state.api_keys = keys),
    SET_VERIFICATIONS: (state, data) => (state.user_verifications = data),
    SAVE_CONNECTED_USERS: (state, users) => (state.connected_users = users),
};