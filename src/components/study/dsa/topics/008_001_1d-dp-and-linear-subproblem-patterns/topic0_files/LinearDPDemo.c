/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: 1D Dynamic Programming: Climbing Stairs, House Robber & LIS in O(N log N)
 * File: LinearDPDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// 1. House Robber / Non-Adjacent Sum with O(1) Space Optimization
int robHouses(const int nums[], int n) {
    if (n == 0) return 0;
    if (n == 1) return nums[0];

    int prev2 = 0;        // dp[i-2]
    int prev1 = nums[0];  // dp[i-1]

    for (int i = 1; i < n; i++) {
        int take = nums[i] + prev2;
        int skip = prev1;
        int curr = (take > skip) ? take : skip;

        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// 2. Coin Change (Minimum Coins to make Amount X) in O(Amount * N)
int coinChangeMin(const int coins[], int numCoins, int amount) {
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 0; i <= amount; i++) dp[i] = amount + 1; // Sentinel value
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int c = 0; c < numCoins; c++) {
            if (i >= coins[c]) {
                if (dp[i - coins[c]] + 1 < dp[i]) {
                    dp[i] = dp[i - coins[c]] + 1;
                }
            }
        }
    }

    int result = (dp[amount] > amount) ? -1 : dp[amount];
    free(dp);
    return result;
}

// 3. Longest Increasing Subsequence (LIS) in O(N log N) via Patience Sorting
static int lowerBoundArray(const int tails[], int len, int target) {
    int low = 0, high = len - 1;
    int ans = len;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (tails[mid] >= target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int lengthOfLIS(const int nums[], int n) {
    if (n == 0) return 0;

    int* tails = (int*)malloc(n * sizeof(int));
    int len = 0;

    for (int i = 0; i < n; i++) {
        int idx = lowerBoundArray(tails, len, nums[i]);
        tails[idx] = nums[i];
        if (idx == len) {
            len++;
        }
    }

    free(tails);
    return len;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - 1D DYNAMIC PROGRAMMING ARCHETYPES DEMO     \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // 1. House Robber
    int houses[] = {2, 7, 9, 3, 1, 8};
    int nHouses = sizeof(houses) / sizeof(houses[0]);
    int maxLoot = robHouses(houses, nHouses);
    printf("1. House Robber (Maximum Loot without adjacent alarm):\n");
    printf("   Houses Loot: {2, 7, 9, 3, 1, 8}\n");
    printf("   -> Optimal Loot: ₹%d (O(N) time, O(1) space optimization)\n\n", maxLoot);

    // 2. Coin Change Minimum Coins
    int coins[] = {1, 2, 5};
    int numCoins = sizeof(coins) / sizeof(coins[0]);
    int targetAmount = 11;
    int minCoins = coinChangeMin(coins, numCoins, targetAmount);
    printf("2. Coin Change Problem:\n");
    printf("   Coins: {1, 2, 5}, Target Amount: %d\n", targetAmount);
    printf("   -> Minimum Coins Needed: %d (5 + 5 + 1)\n\n", minCoins);

    // 3. Longest Increasing Subsequence in O(N log N)
    int seq[] = {10, 9, 2, 5, 3, 7, 101, 18};
    int nSeq = sizeof(seq) / sizeof(seq[0]);
    int lisLen = lengthOfLIS(seq, nSeq);
    printf("3. Longest Increasing Subsequence (Patience Sorting):\n");
    printf("   Sequence: {10, 9, 2, 5, 3, 7, 101, 18}\n");
    printf("   -> Length of LIS: %d (e.g. {2, 3, 7, 101} or {2, 3, 7, 18})\n", lisLen);

    return 0;
}
