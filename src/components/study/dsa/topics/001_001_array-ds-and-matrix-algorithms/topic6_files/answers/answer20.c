#include <stdio.h>

void shift_zeros_to_end(int arr[], int n) {
    int write_idx = 0;
    for (int read_idx = 0; read_idx < n; read_idx++) {
        if (arr[read_idx] != 0) {
            arr[write_idx++] = arr[read_idx];
        }
    }
    while (write_idx < n) {
        arr[write_idx++] = 0;
    }
}

int main() {
    int arr[] = {0, 1, 0, 3, 12, 0, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Zero Partitioning & Compactor ---\nOriginal Array: [ 0 1 0 3 12 0 5 ]\n");
    shift_zeros_to_end(arr, n);

    printf("Shifted Array : [ ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");

    return 0;
}
