#include <stdio.h>
#include <stdbool.h>

void bubble_sort_opt(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // Early exit if no swaps occurred!
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    bubble_sort_opt(arr, 5);
    printf("--- Optimized Bubble Sort (O(N) Best Case) ---\nSorted Array: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
