#include <stdio.h>

int count_occurrences(int arr[], int n, int target) {
    // Upper Bound - Lower Bound
    int first = -1, last = -1;
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) { first = mid; high = mid - 1; }
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    if (first == -1) return 0;
    low = 0; high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) { last = mid; low = mid + 1; }
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return (last - first + 1);
}

int main() {
    int arr[] = {1, 2, 4, 4, 4, 4, 6, 7};
    int n = 8, target = 4;
    printf("--- Count Occurrences in Sorted Array ---\n");
    printf("Total count of key %d = %d\n", target, count_occurrences(arr, n, target));
    return 0;
}
