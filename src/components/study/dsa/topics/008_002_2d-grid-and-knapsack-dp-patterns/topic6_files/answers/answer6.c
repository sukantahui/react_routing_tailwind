#include <stdio.h>

#define MAXW 100

int max(int a, int b) { return (a > b) ? a : b; }

int knapsack_01_space_opt(int W, int wt[], int val[], int n) {
    int dp[MAXW + 1] = {0};

    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) { // Reverse iteration for 0-1
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    printf("--- 0-1 Knapsack 1D Space Optimization ---\nMaximum Value = %d\n", knapsack_01_space_opt(W, wt, val, 3));
    return 0;
}
