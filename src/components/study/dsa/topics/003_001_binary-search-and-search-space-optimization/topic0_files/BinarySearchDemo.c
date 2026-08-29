/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic: Binary Search, Lower/Upper Bounds & Search on Answer
 * File: BinarySearchDemo.c
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Standard Binary Search with overflow-safe mid calculation
int binarySearch(const int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        // Safe mid calculation avoiding 32-bit signed integer overflow
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            low = mid + 1; // Discard left half
        } else {
            high = mid - 1; // Discard right half
        }
    }
    return -1; // Target not present
}

// Lower Bound: Returns the index of the first element >= target
int lowerBound(const int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    int ans = n; // Default if all elements are < target

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) {
            ans = mid;     // Potential answer found, look for earlier occurrence in left half
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

// Upper Bound: Returns the index of the first element > target
int upperBound(const int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    int ans = n; // Default if all elements are <= target

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > target) {
            ans = mid;     // Potential answer found, look for earlier occurrence in left half
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

// Search on Answer: Painter's Partition / Capacity Checker
// Predicate: Can we allocate books/boards such that no painter gets more than maxAllowed?
static bool isAllocationPossible(const int arr[], int n, int k, int maxAllowed) {
    int workersRequired = 1;
    int currentSum = 0;

    for (int i = 0; i < n; i++) {
        if (arr[i] > maxAllowed) {
            return false; // Single element exceeds limit
        }
        if (currentSum + arr[i] > maxAllowed) {
            workersRequired++;
            currentSum = arr[i];
            if (workersRequired > k) {
                return false;
            }
        } else {
            currentSum += arr[i];
        }
    }
    return true;
}

// Binary Search on Answer Space: Minimum Maximum Workload
int findMinMaxWorkload(const int boards[], int n, int k) {
    int low = 0;
    int high = 0;

    for (int i = 0; i < n; i++) {
        if (boards[i] > low) low = boards[i]; // Max single element
        high += boards[i];                     // Sum of all elements
    }

    int optimalAnswer = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isAllocationPossible(boards, n, k, mid)) {
            optimalAnswer = mid; // Feasible, try to minimize workload further
            high = mid - 1;
        } else {
            low = mid + 1;      // Infeasible, increase capacity
        }
    }
    return optimalAnswer;
}

int main(void) {
    printf("=================================================================\n");
    printf("   CODER & ACCOTAX - BINARY SEARCH & SEARCH ON ANSWER ENGINE    \n");
    printf("   Mentor: Sukanta Hui · Barrackpore Lab Demonstration           \n");
    printf("=================================================================\n\n");

    int dataset[] = {12, 18, 24, 24, 24, 35, 48, 60, 75, 90};
    int n = sizeof(dataset) / sizeof(dataset[0]);

    printf("1. Sorted Dataset: ");
    for (int i = 0; i < n; i++) printf("%d ", dataset[i]);
    printf("\n\n");

    int target = 24;
    int idx = binarySearch(dataset, n, target);
    printf("-> Standard Binary Search for %d: Index %d\n", target, idx);

    int lb = lowerBound(dataset, n, target);
    int ub = upperBound(dataset, n, target);
    printf("-> Lower Bound (first >= %d): Index %d (Value: %d)\n", target, lb, dataset[lb]);
    printf("-> Upper Bound (first > %d) : Index %d (Value: %d)\n", target, ub, ub < n ? dataset[ub] : -1);
    printf("-> Frequency of %d in array: %d occurrences\n\n", target, ub - lb);

    // Demonstration of Search on Answer Space (Painter's Partition)
    int boardLengths[] = {10, 20, 30, 40, 50};
    int numBoards = sizeof(boardLengths) / sizeof(boardLengths[0]);
    int painters = 2;

    int minMaxTime = findMinMaxWorkload(boardLengths, numBoards, painters);
    printf("2. Search on Answer (Painter's Partition):\n");
    printf("   Boards: {10, 20, 30, 40, 50}, Total Painters: %d\n", painters);
    printf("   Optimal Minimum Maximum Workload: %d units\n", minMaxTime);

    return 0;
}
