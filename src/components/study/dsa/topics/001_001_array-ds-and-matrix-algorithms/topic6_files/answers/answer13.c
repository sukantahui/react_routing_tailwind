#include <stdio.h>

int remove_duplicates(int arr[], int n) {
    if (n == 0) return 0;
    
    int i = 0; // Slow runner pointer
    for (int j = 1; j < n; j++) { // Fast runner pointer
        if (arr[j] != arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1; // Length of unique sub-array
}

int main() {
    int arr[] = {1, 1, 2, 2, 2, 3, 4, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- In-Place Duplicate Removal ---\n");
    int new_len = remove_duplicates(arr, n);

    printf("Unique Count: %d\nElements: [ ", new_len);
    for (int k = 0; k < new_len; k++) {
        printf("%d ", arr[k]);
    }
    printf("]\n");

    return 0;
}
