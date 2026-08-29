#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {10, 20, 30, 40, 50, 60};
    int n = 6, target = 40;
    printf("--- Iterative Binary Search ---\n");
    int idx = binary_search(arr, n, target);
    if (idx != -1) printf("Target %d found at index = %d\n", target, idx);
    return 0;
}
