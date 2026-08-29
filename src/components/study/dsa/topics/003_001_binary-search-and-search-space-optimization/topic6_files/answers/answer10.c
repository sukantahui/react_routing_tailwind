#include <stdio.h>

int find_min_rotated(int arr[], int n) {
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > arr[high]) low = mid + 1;
        else high = mid;
    }
    return arr[low];
}

int main() {
    int arr[] = {3, 4, 5, 1, 2};
    int n = 5;
    printf("--- Minimum Element in Rotated Sorted Array ---\n");
    printf("Minimum Element = %d\n", find_min_rotated(arr, n));
    return 0;
}
