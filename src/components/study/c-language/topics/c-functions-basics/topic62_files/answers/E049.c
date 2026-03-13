#include <stdio.h>
#include <limits.h>

int coinChange(int coins[], int m, int amount) {
    int dp[amount+1];
    for (int i = 1; i <= amount; i++) dp[i] = INT_MAX;
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < m; j++) {
            if (coins[j] <= i && dp[i - coins[j]] != INT_MAX) {
                int val = dp[i - coins[j]] + 1;
                if (val < dp[i]) dp[i] = val;
            }
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

int main() {
    int m, amount;
    printf("Enter number of denominations: ");
    scanf("%d", &m);
    int coins[m];
    printf("Denominations: ");
    for (int i = 0; i < m; i++) scanf("%d", &coins[i]);
    printf("Amount: ");
    scanf("%d", &amount);

    int minCoins = coinChange(coins, m, amount);
    printf("Minimum coins = %d\n", minCoins);
    return 0;
}
