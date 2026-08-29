#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int knapsack_01(int W, int wt[], int val[], int n) {
    int dp[100][100] = {0};

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    printf("--- 0-1 Knapsack Problem (Classic 2D DP) ---\nMaximum Value = %d\n", knapsack_01(W, wt, val, 3));
    return 0;
}
