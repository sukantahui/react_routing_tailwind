#include <stdio.h>

int search_rotated(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;

        // Check if left half is sorted
        if (arr[low] <= arr[mid]) {
            if (target >= arr[low] && target < arr[mid]) high = mid - 1;
            else low = mid + 1;
        } else { // Right half is sorted
            if (target > arr[mid] && target <= arr[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}

int main() {
    int arr[] = {4, 5, 6, 7, 0, 1, 2};
    int n = 7, target = 0;
    printf("--- Search in Rotated Sorted Array ---\n");
    int idx = search_rotated(arr, n, target);
    if (idx != -1) printf("Target %d found at index = %d\n", target, idx);
    return 0;
}
