#include <stdio.h>

int lower_bound(int arr[], int n, int target) {
    int low = 0, high = n - 1, ans = n;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int arr[] = {1, 2, 4, 4, 4, 6, 7};
    int n = 7, target = 4;
    printf("--- Lower Bound Finder (First Occurrence) ---\n");
    printf("First occurrence of %d at index = %d\n", target, lower_bound(arr, n, target));
    return 0;
}
