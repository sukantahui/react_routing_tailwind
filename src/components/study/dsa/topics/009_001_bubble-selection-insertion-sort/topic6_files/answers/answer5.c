#include <stdio.h>

void recursive_bubble_sort(int arr[], int n) {
    if (n == 1) return;
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            int temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
    recursive_bubble_sort(arr, n - 1);
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    recursive_bubble_sort(arr, 7);
    printf("--- Recursive Bubble Sort ---\nSorted Array: ");
    for (int i = 0; i < 7; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
