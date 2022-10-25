export default {
    SET_WALLET_BALANCES: (state, balances) => state.wallet.balances = balances,

    SET_WALLET_TYPE: (state, type) => state.wallet.type = type,

    SET_WITHDRAWAL_META: (state, data) => state.withdrawal_meta = data,
}