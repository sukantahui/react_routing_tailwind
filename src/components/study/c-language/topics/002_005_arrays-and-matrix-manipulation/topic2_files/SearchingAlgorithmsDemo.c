#include <stdio.h>

/**
 * SearchingAlgorithmsDemo.c
 * Demonstrates Linear Search O(n) on unsorted data vs
 * Binary Search O(log n) on sorted data with step counters.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// 1. Linear Search: Works on unsorted or sorted arrays (Time: O(n))
int linearSearch(const int arr[], int size, int target, int *comparisonCount) {
    *comparisonCount = 0;
    for (int i = 0; i < size; i++) {
        (*comparisonCount)++;
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Target not found
}

// 2. Binary Search: Requires array to be sorted in ascending order (Time: O(log n))
int binarySearch(const int arr[], int size, int target, int *comparisonCount) {
    int low = 0;
    int high = size - 1;
    *comparisonCount = 0;

    while (low <= high) {
        (*comparisonCount)++;
        // Prevent integer overflow with low + (high - low) / 2
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Target found at index mid
        }
        if (arr[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}

int main(void) {
    // Sorted array of student roll numbers
    int rolls[] = {102, 108, 115, 120, 134, 142, 150, 168, 175, 190, 205, 220};
    int n = sizeof(rolls) / sizeof(rolls[0]);
    int target = 175;
    int comparisons = 0;

    printf("====================================================\n");
    printf(" Searching Algorithms: Linear Search vs Binary Search\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printf("Dataset: [ ");
    for (int i = 0; i < n; i++) printf("%d ", rolls[i]);
    printf("] (Size: %d)\n\n", n);

    // Linear Search Execution
    printf("🔍 1. Running Linear Search for Roll #%d...\n", target);
    int idxLinear = linearSearch(rolls, n, target, &comparisons);
    if (idxLinear != -1) {
        printf("   ✓ Found at index [%d] in %d comparisons (Time: O(n))\n\n", idxLinear, comparisons);
    } else {
        printf("   ✗ Not found after %d comparisons\n\n", comparisons);
    }

    // Binary Search Execution
    printf("⚡ 2. Running Binary Search for Roll #%d...\n", target);
    int idxBinary = binarySearch(rolls, n, target, &comparisons);
    if (idxBinary != -1) {
        printf("   ✓ Found at index [%d] in %d comparisons (Time: O(log n))\n\n", idxBinary, comparisons);
    } else {
        printf("   ✗ Not found after %d comparisons\n\n", comparisons);
    }

    // Benchmark search on element not in dataset
    target = 999;
    printf("🔎 3. Worst-Case Search (Missing Element #%d):\n", target);
    linearSearch(rolls, n, target, &comparisons);
    printf("   • Linear Search required: %d comparisons (Full array scan)\n", comparisons);
    binarySearch(rolls, n, target, &comparisons);
    printf("   • Binary Search required: %d comparisons (Logarithmic tree halving)\n", comparisons);

    return 0;
}
