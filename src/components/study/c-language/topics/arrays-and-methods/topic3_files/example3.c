#include <stdio.h>

// Delete element at position 'pos' (0-based) in array 'arr'
// 'n' is current number of elements
// Returns new size after deletion, or -1 if deletion fails
int deleteAt(int arr[], int n, int pos) {
    // Check for valid position
    if (pos < 0 || pos >= n) {
        return -1;  // deletion not possible
    }

    // Shift elements to the left, starting from pos+1
    for (int i = pos; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }

    return n - 1;  // new size
}

int main() {
    int arr[10] = {10, 20, 30, 40, 50};  // 5 elements
    int n = 5;

    printf("Before deletion: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // Delete element at index 2 (value 30)
    n = deleteAt(arr, n, 2);
    if (n != -1) {
        printf("After deletion: ");
        for (int i = 0; i < n; i++) {
            printf("%d ", arr[i]);
        }
        printf("\n");
    } else {
        printf("Deletion failed.\n");
    }

    return 0;
}