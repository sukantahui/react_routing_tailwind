#include <stdio.h>
#include <string.h>

void counting_sort(int arr[], int n) {
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
    }

    int count[100] = {0};
    int output[100];

    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= max_val; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = 7;
    counting_sort(arr, n);
    printf("--- Counting Sort (Linear Time Non-Comparison) ---\nSorted Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
