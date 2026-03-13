#include <stdio.h>
#include <limits.h>

int minCoins(int coins[], int m, int amount) {
    int dp[amount + 1];
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) dp[i] = INT_MAX;

    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < m; j++) {
            if (coins[j] <= i && dp[i - coins[j]] != INT_MAX)
                if (dp[i - coins[j]] + 1 < dp[i])
                    dp[i] = dp[i - coins[j]] + 1;
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

int main() {
    int m, amount;
    printf("Enter number of denominations: ");
    scanf("%d", &m);
    int coins[m];
    printf("Enter denominations: ");
    for (int i = 0; i < m; i++) scanf("%d", &coins[i]);
    printf("Enter amount: ");
    scanf("%d", &amount);

    int min = minCoins(coins, m, amount);
    if (min != -1)
        printf("Minimum coins = %d\n", min);
    else
        printf("Not possible.\n");
    return 0;
}