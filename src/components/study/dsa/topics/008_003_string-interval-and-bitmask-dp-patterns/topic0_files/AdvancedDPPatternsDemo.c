/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: String DP (LCS, Edit Distance), Interval DP (MCM) & Bitmask DP (TSP)
 * File: AdvancedDPPatternsDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

#define INF 100000000

// Helper min of three integers
static inline int min3(int a, int b, int c) {
    int m = (a < b) ? a : b;
    return (m < c) ? m : c;
}

// 1. Longest Common Subsequence (LCS) in O(M * N) with O(N) Space Compression
int longestCommonSubsequence(const char* text1, const char* text2) {
    int m = (int)strlen(text1);
    int n = (int)strlen(text2);

    int* prev = (int*)calloc(n + 1, sizeof(int));
    int* curr = (int*)calloc(n + 1, sizeof(int));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = (prev[j] > curr[j - 1]) ? prev[j] : curr[j - 1];
            }
        }
        // Swap rows
        for (int j = 0; j <= n; j++) {
            prev[j] = curr[j];
            curr[j] = 0;
        }
    }

    int result = prev[n];
    free(prev);
    free(curr);
    return result;
}

// 2. Edit Distance (Levenshtein Distance)
int minDistance(const char* word1, const char* word2) {
    int m = (int)strlen(word1);
    int n = (int)strlen(word2);

    int** dp = (int**)malloc((m + 1) * sizeof(int*));
    for (int i = 0; i <= m; i++) {
        dp[i] = (int*)malloc((n + 1) * sizeof(int));
    }

    for (int i = 0; i <= m; i++) dp[i][0] = i; // Delete all chars
    for (int j = 0; j <= n; j++) dp[0][j] = j; // Insert all chars

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // Zero cost if chars match
            } else {
                dp[i][j] = 1 + min3(
                    dp[i - 1][j],     // Delete
                    dp[i][j - 1],     // Insert
                    dp[i - 1][j - 1]  // Replace
                );
            }
        }
    }

    int ans = dp[m][n];
    for (int i = 0; i <= m; i++) free(dp[i]);
    free(dp);
    return ans;
}

// 3. Matrix Chain Multiplication (Interval DP) in O(N^3)
int matrixChainOrder(const int p[], int n) {
    // p[] has dimensions for N matrices (array size = n + 1)
    int dp[n][n];
    for (int i = 1; i < n; i++) dp[i][i] = 0;

    // L is chain length
    for (int L = 2; L < n; L++) {
        for (int i = 1; i < n - L + 1; i++) {
            int j = i + L - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k <= j - 1; k++) {
                int q = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < dp[i][j]) {
                    dp[i][j] = q;
                }
            }
        }
    }
    return dp[1][n - 1];
}

// 4. Traveling Salesperson Problem (TSP) with Bitmask DP in O(N^2 * 2^N)
int tspBitmask(int n, int dist[4][4]) {
    int totalStates = 1 << n;
    int dp[totalStates][n];

    for (int mask = 0; mask < totalStates; mask++) {
        for (int u = 0; u < n; u++) dp[mask][u] = INF;
    }

    dp[1][0] = 0; // Base: Start at city 0 with mask = 0001

    for (int mask = 1; mask < totalStates; mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1 << u)) || dp[mask][u] == INF) continue;

            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue; // Already visited v

                int nextMask = mask | (1 << v);
                int newCost = dp[mask][u] + dist[u][v];
                if (newCost < dp[nextMask][v]) {
                    dp[nextMask][v] = newCost;
                }
            }
        }
    }

    // Return to starting city 0
    int minTour = INF;
    int fullMask = (1 << n) - 1;
    for (int u = 1; u < n; u++) {
        if (dp[fullMask][u] != INF) {
            int total = dp[fullMask][u] + dist[u][0];
            if (total < minTour) minTour = total;
        }
    }
    return minTour;
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - STRING, INTERVAL & BITMASK DP DEMO        \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // 1. LCS
    const char* str1 = "abcde";
    const char* str2 = "ace";
    int lcsLen = longestCommonSubsequence(str1, str2);
    printf("1. Longest Common Subsequence:\n");
    printf("   Text1: \"%s\", Text2: \"%s\"\n", str1, str2);
    printf("   -> LCS Length: %d (\"ace\")\n\n", lcsLen);

    // 2. Edit Distance
    const char* w1 = "horse";
    const char* w2 = "ros";
    int edits = minDistance(w1, w2);
    printf("2. Edit Distance (Levenshtein Distance):\n");
    printf("   Word1: \"%s\", Word2: \"%s\"\n", w1, w2);
    printf("   -> Minimum Operations (Insert/Delete/Replace): %d ops\n\n", edits);

    // 3. Matrix Chain Multiplication
    int dimensions[] = {10, 20, 30, 40, 30}; // 4 matrices: 10x20, 20x30, 30x40, 40x30
    int numMats = sizeof(dimensions) / sizeof(dimensions[0]);
    int minScalarMults = matrixChainOrder(dimensions, numMats);
    printf("3. Matrix Chain Multiplication (Interval DP):\n");
    printf("   Matrix Dimensions: 10x20, 20x30, 30x40, 40x30\n");
    printf("   -> Minimum Scalar Multiplications: %d ops (Optimal Parenthesization)\n\n", minScalarMults);

    // 4. TSP Bitmask DP (4 cities)
    int tspDist[4][4] = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };
    int shortestTour = tspBitmask(4, tspDist);
    printf("4. Traveling Salesperson Problem (Bitmask DP):\n");
    printf("   4 Cities Distance Matrix defined.\n");
    printf("   -> Minimum Hamiltonian Cycle Tour: %d units (vs O(N!) brute force)\n", shortestTour);

    return 0;
}
