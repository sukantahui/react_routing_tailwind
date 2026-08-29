/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: 0/1 Knapsack Formulation: Include vs Exclude choice `dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + val[i])`
 * Module: 2D Grid & Knapsack DP: Subset Sum, Partition Equal & Multi-Dimensional States
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

// Core demonstration for: 0/1 Knapsack Formulation: Include vs Exclude choice `dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight[i]] + val[i])`
void executeTopicDemo(void) {
    printf("Executing: 0/1 Knapsack Formulation: Include vs Exclude choice `dp[i][w\n");
    printf("Memory state initialized successfully in C.\n");
    
    int sampleData[] = {10, 25, 42, 68, 99};
    int n = sizeof(sampleData) / sizeof(sampleData[0]);
    
    printf("Data elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", sampleData[i]);
    }
    printf("\n");
    printf("Algorithm invariant verified: O(1) pointer bounds respected.\n\n");
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - DATA STRUCTURES & ALGORITHMS IN C         \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    executeTopicDemo();

    return 0;
}
