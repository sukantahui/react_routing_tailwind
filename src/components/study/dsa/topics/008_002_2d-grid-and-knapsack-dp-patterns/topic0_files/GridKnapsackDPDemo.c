/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: 2D Grid DP & 0/1 Knapsack with 1D Array Space Compression
 * File: GridKnapsackDPDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

// 1. Grid Minimum Path Sum in O(M * N) with O(N) Space Compression
int minPathSum(int** grid, int m, int n) {
    int* dp = (int*)malloc(n * sizeof(int));
    dp[0] = grid[0][0];

    // Initialize first row
    for (int j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }

    // Process remaining rows
    for (int i = 1; i < m; i++) {
        dp[0] += grid[i][0]; // First column can only come from directly above
        for (int j = 1; j < n; j++) {
            int fromTop = dp[j];
            int fromLeft = dp[j - 1];
            dp[j] = grid[i][j] + (fromTop < fromLeft ? fromTop : fromLeft);
        }
    }

    int result = dp[n - 1];
    free(dp);
    return result;
}

// 2. 0/1 Knapsack Problem with Backwards 1D Array Space Optimization
int knapsack01(const int weights[], const int values[], int n, int capacity) {
    // 1D DP Array of size capacity + 1 initialized to 0
    int* dp = (int*)calloc(capacity + 1, sizeof(int));

    for (int i = 0; i < n; i++) {
        int w = weights[i];
        int v = values[i];

        // Traverse backwards from capacity down to w to prevent reusing the same item!
        for (int j = capacity; j >= w; j--) {
            int take = v + dp[j - w];
            int skip = dp[j];
            if (take > skip) {
                dp[j] = take;
            }
        }
    }

    int maxVal = dp[capacity];
    free(dp);
    return maxVal;
}

// 3. Subset Sum Problem: Can we choose a subset with exact sum = target?
int canPartitionSubset(const int nums[], int n, int target) {
    int* dp = (int*)calloc(target + 1, sizeof(int));
    dp[0] = 1; // Base case: sum 0 is always achievable (empty set)

    for (int i = 0; i < n; i++) {
        int num = nums[i];
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    int possible = dp[target];
    free(dp);
    return possible;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - 2D GRID & 0/1 KNAPSACK DP DEMO            \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // 1. Grid Min Path Sum (3x3 grid)
    int m = 3, n = 3;
    int rawGrid[3][3] = {
        {1, 3, 1},
        {1, 5, 1},
        {4, 2, 1}
    };
    int* gridRows[3];
    for (int i = 0; i < 3; i++) gridRows[i] = rawGrid[i];

    int minPath = minPathSum(gridRows, m, n);
    printf("1. Grid Minimum Path Sum (3x3 Matrix):\n");
    printf("   Grid Layout:\n");
    printf("   [1, 3, 1]\n   [1, 5, 1]\n   [4, 2, 1]\n");
    printf("   -> Minimum Path Cost (Top-Left to Bottom-Right): %d (Path: 1->3->1->1->1)\n\n", minPath);

    // 2. 0/1 Knapsack
    int weights[] = {1, 3, 4, 5};
    int values[] = {1, 4, 5, 7};
    int numItems = 4;
    int knapsackCapacity = 7;

    int maxProfit = knapsack01(weights, values, numItems, knapsackCapacity);
    printf("2. 0/1 Knapsack Problem:\n");
    printf("   Items: { (W:1, V:1), (W:3, V:4), (W:4, V:5), (W:5, V:7) }\n");
    printf("   Knapsack Max Capacity: %d kg\n", knapsackCapacity);
    printf("   -> Maximum Loot Value: ₹%d (Optimal choice: Items 2 and 3: 4kg + 3kg = 7kg, ₹5 + ₹4 = ₹9)\n\n", maxProfit);

    // 3. Subset Sum
    int subsetArray[] = {3, 34, 4, 12, 5, 2};
    int nSubset = 6;
    int targetSum = 9;
    int isPossible = canPartitionSubset(subsetArray, nSubset, targetSum);
    printf("3. Subset Sum Verification:\n");
    printf("   Set: {3, 34, 4, 12, 5, 2}, Target: %d\n", targetSum);
    printf("   -> Is Target Sum Achievable? %s (4 + 5 = 9 or 3 + 4 + 2 = 9)\n", isPossible ? "YES ✓" : "NO ✗");

    return 0;
}
