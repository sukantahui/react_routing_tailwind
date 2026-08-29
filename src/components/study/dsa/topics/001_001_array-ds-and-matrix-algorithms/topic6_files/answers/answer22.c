#include <stdio.h>
#include <stdlib.h>

void find_missing_and_duplicate(int arr[], int n) {
    int duplicate = -1, missing = -1;

    // Pass 1: Mark visited indices using sign flipping
    for (int i = 0; i < n; i++) {
        int val = abs(arr[i]);
        if (arr[val - 1] < 0) {
            duplicate = val;
        } else {
            arr[val - 1] = -arr[val - 1];
        }
    }

    // Pass 2: Positive value index is the missing number
    for (int i = 0; i < n; i++) {
        if (arr[i] > 0) {
            missing = i + 1;
            break;
        }
    }

    printf("Duplicate Number: %d\nMissing Number  : %d\n", duplicate, missing);
}

int main() {
    int arr[] = {3, 1, 2, 5, 3};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Index Marking Missing & Duplicate Finder ---\n");
    find_missing_and_duplicate(arr, n);

    return 0;
}
