#include <stdio.h>

// Insert at beginning: must shift all elements right – O(n)
int insertAtBeginning(int arr[], int *n, int capacity, int value) {
    if (*n >= capacity) return -1; // no space

    // Shift all elements right by one
    for (int i = *n; i > 0; i--) {
        arr[i] = arr[i - 1];
    }
    arr[0] = value;
    (*n)++;
    return 0;
}

int main() {
    int arr[10] = {2, 4, 6, 8, 10}; // capacity 10, size 5
    int n = 5;

    printf("Before: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    // Insert 1 at beginning – shifts all 5 elements
    insertAtBeginning(arr, &n, 10, 1);
    printf("After inserting 1 at beginning: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    // The shifting operation cost grows with n – that's O(n)
    return 0;
}