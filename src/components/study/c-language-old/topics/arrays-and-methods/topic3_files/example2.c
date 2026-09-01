#include <stdio.h>

// Insert 'value' at position 'pos' (0-based) in array 'arr'
// 'n' is current number of elements, 'capacity' is total allocated size
// Returns new size after insertion, or -1 if insertion fails
int insertAt(int arr[], int n, int capacity, int value, int pos) {
    // Check for valid position and space
    if (pos < 0 || pos > n || n >= capacity) {
        return -1;  // insertion not possible
    }

    // Shift elements to the right, starting from the end
    for (int i = n; i > pos; i--) {
        arr[i] = arr[i - 1];
    }

    // Insert new value
    arr[pos] = value;
    return n + 1;  // new size
}

int main() {
    int arr[10] = {10, 20, 30, 40};  // capacity 10, initially 4 elements
    int n = 4;

    printf("Before insertion: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // Insert 25 at index 2
    n = insertAt(arr, n, 10, 25, 2);
    if (n != -1) {
        printf("After insertion: ");
        for (int i = 0; i < n; i++) {
            printf("%d ", arr[i]);
        }
        printf("\n");
    } else {
        printf("Insertion failed.\n");
    }

    return 0;
}