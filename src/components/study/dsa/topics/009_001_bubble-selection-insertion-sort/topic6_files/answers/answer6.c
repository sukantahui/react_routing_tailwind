#include <stdio.h>

void recursive_insertion_sort(int arr[], int n) {
    if (n <= 1) return;
    recursive_insertion_sort(arr, n - 1);
    int last = arr[n - 1];
    int j = n - 2;
    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    recursive_insertion_sort(arr, 5);
    printf("--- Recursive Insertion Sort ---\nSorted Array: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
