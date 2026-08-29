#include <stdio.h>

int find_peak_element(int arr[], int n) {
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] < arr[mid + 1]) low = mid + 1;
        else high = mid;
    }
    return low;
}

int main() {
    int arr[] = {1, 2, 3, 1};
    int n = 4;
    printf("--- Peak Element in Mountain Array ---\n");
    int peak_idx = find_peak_element(arr, n);
    printf("Peak Element = %d at Index = %d\n", arr[peak_idx], peak_idx);
    return 0;
}
