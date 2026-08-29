#include <stdio.h>

int find_majority_element(int arr[], int n) {
    int candidate = -1, count = 0;

    // Phase 1: Boyer-Moore Voting
    for (int i = 0; i < n; i++) {
        if (count == 0) {
            candidate = arr[i];
            count = 1;
        } else if (arr[i] == candidate) {
            count++;
        } else {
            count--;
        }
    }

    // Phase 2: Verification
    count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == candidate) count++;
    }

    if (count > n / 2) return candidate;
    return -1;
}

int main() {
    int arr[] = {2, 2, 1, 1, 1, 2, 2};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Boyer-Moore Majority Vote ---\nInput Array: [ 2 2 1 1 1 2 2 ]\n");
    int majority = find_majority_element(arr, n);

    if (majority != -1) {
        printf("Majority Element (> N/2): %d\n", majority);
    } else {
        printf("No Majority Element exists.\n");
    }

    return 0;
}
