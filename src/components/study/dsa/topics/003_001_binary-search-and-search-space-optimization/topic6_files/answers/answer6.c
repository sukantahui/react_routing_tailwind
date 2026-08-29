#include <stdio.h>

int search_insert_position(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return low;
}

int main() {
    int arr[] = {1, 3, 5, 6};
    int n = 4, target = 2;
    printf("--- Search Insert Position ---\n");
    printf("Insert position for %d in [1, 3, 5, 6] = %d\n", target, search_insert_position(arr, n, target));
    return 0;
}
