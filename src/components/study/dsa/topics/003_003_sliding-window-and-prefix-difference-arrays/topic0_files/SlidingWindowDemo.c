/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Sliding Window & Prefix / Difference Arrays
 * File: SlidingWindowDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1. Fixed-Size Sliding Window: Maximum Sum Subarray of Size K
int maxSumSubarray(const int arr[], int n, int k) {
    if (n < k || k <= 0) return -1;

    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    int maxSum = windowSum;
    for (int i = k; i < n; i++) {
        // Slide window: Add incoming element, subtract outgoing element
        windowSum += arr[i] - arr[i - k];
        if (windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    return maxSum;
}

// 2. Dynamic-Size Sliding Window: Longest Substring Without Repeating Characters
int lengthOfLongestSubstring(const char* s) {
    int n = (int)strlen(s);
    if (n == 0) return 0;

    // ASCII frequency/index map storing last seen index of each char
    int lastSeen[256];
    for (int i = 0; i < 256; i++) lastSeen[i] = -1;

    int maxLength = 0;
    int left = 0;

    for (int right = 0; right < n; right++) {
        unsigned char c = (unsigned char)s[right];

        // If character was seen inside the current window, contract window
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }

        lastSeen[c] = right; // Update last seen position
        int currentLength = right - left + 1;
        if (currentLength > maxLength) {
            maxLength = currentLength;
        }
    }
    return maxLength;
}

// 3. Difference Array Range Updates: Perform multiple [L, R] += val in O(1)
void applyRangeUpdates(int arr[], int n, int updates[][3], int numUpdates) {
    int* diff = (int*)calloc(n + 1, sizeof(int));
    if (!diff) return;

    // Apply updates in O(1) per update
    for (int i = 0; i < numUpdates; i++) {
        int l = updates[i][0];
        int r = updates[i][1];
        int val = updates[i][2];

        diff[l] += val;
        if (r + 1 < n) {
            diff[r + 1] -= val;
        }
    }

    // Materialize actual values via prefix sum pass
    int runningSum = 0;
    for (int i = 0; i < n; i++) {
        runningSum += diff[i];
        arr[i] += runningSum;
    }

    free(diff);
}

int main(void) {
    printf("=================================================================\n");
    printf("     CODER & ACCOTAX - SLIDING WINDOW & RANGE ARRAYS DEMO        \n");
    printf("     Mentor: Sukanta Hui · Barrackpore Lab Demonstration         \n");
    printf("=================================================================\n\n");

    // 1. Fixed-Size Sliding Window
    int numbers[] = {2, 1, 5, 1, 3, 2, 8, 4, 1};
    int nNums = sizeof(numbers) / sizeof(numbers[0]);
    int k = 3;
    int maxSubSum = maxSumSubarray(numbers, nNums, k);
    printf("1. Fixed-Size Sliding Window (k = %d):\n", k);
    printf("   Array: {2, 1, 5, 1, 3, 2, 8, 4, 1}\n");
    printf("   -> Maximum Subarray Sum of size %d: %d\n\n", k, maxSubSum);

    // 2. Dynamic Sliding Window
    const char* text = "abcabcbb";
    int longestSubLen = lengthOfLongestSubstring(text);
    printf("2. Dynamic Sliding Window (Longest Unique Substring):\n");
    printf("   String: \"%s\"\n", text);
    printf("   -> Longest Substring Length: %d (e.g. \"abc\")\n\n", longestSubLen);

    // 3. Difference Array Range Updates
    int baseArray[6] = {0, 0, 0, 0, 0, 0};
    int updates[][3] = {
        {1, 3, 5},   // Add 5 to index 1..3
        {2, 4, 10},  // Add 10 to index 2..4
        {0, 2, 2}    // Add 2 to index 0..2
    };
    int numUpdates = sizeof(updates) / sizeof(updates[0]);

    printf("3. Difference Array Range Updates:\n");
    printf("   Initial Array (size 6): {0, 0, 0, 0, 0, 0}\n");
    printf("   Applying 3 range updates in O(1) each...\n");

    applyRangeUpdates(baseArray, 6, updates, numUpdates);

    printf("   -> Final Array after Prefix Materialization: ");
    for (int i = 0; i < 6; i++) printf("%d ", baseArray[i]);
    printf("\n");

    return 0;
}
