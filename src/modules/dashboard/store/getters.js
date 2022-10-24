export default {
  getWallet: (state) => state.wallet,

  getWalletType:(state) => state.wallet.type,

  getNairaBalance: (state) => {
    const naira_balance = state.wallet.balances.find(
      (balance) => balance.currency === "NGN"
    );
    return naira_balance ? naira_balance?.available : "0.00";
  },

  getDollarBalance: (state) => {
    const dollar_balance = state.wallet.balances.find(
      (balance) => balance.currency === "USD"
    );
    return dollar_balance ? dollar_balance?.available : "0.00";
  },

  getNairaEscrowBalance: (state) => {
    const naira_escrow_balance = state.wallet.balances.find(
      (balance) => balance.currency === "ESCROW_NGN"
    );
    return naira_escrow_balance ? naira_escrow_balance?.available : "0.00";
  },

  getDollarEscrowBalance: (state) => {
    const dollar_escrow_balance = state.wallet.balances.find(
      (balance) => balance.currency === "ESCROW_USD"
    );
    return dollar_escrow_balance ? dollar_escrow_balance?.available : "0.00";
  },

  getWithdrawalMeta:(state)=> state.withdrawal_meta
};
