#include <stdio.h>

int binary_search_recursive(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binary_search_recursive(arr, mid + 1, high, target);
    return binary_search_recursive(arr, low, mid - 1, target);
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = 10, target = 23;
    printf("--- Recursive Binary Search ---\n");
    int idx = binary_search_recursive(arr, 0, n - 1, target);
    if (idx != -1) printf("Target %d found at index = %d\n", target, idx);
    return 0;
}
