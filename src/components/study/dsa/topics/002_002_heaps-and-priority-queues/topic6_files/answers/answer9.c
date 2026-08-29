#include <stdio.h>
#include <stdbool.h>

bool is_max_heap(int arr[], int n) {
    for (int i = 0; i <= (n - 2) / 2; i++) {
        if (2 * i + 1 < n && arr[i] < arr[2 * i + 1]) return false;
        if (2 * i + 2 < n && arr[i] < arr[2 * i + 2]) return false;
    }
    return true;
}

int main() {
    int valid_heap[] = {90, 15, 10, 7, 12, 2};
    int invalid_heap[] = {90, 15, 100, 7, 12, 2};

    printf("--- Max-Heap Structural Validation ---\n");
    printf("Array 1: %s\n", is_max_heap(valid_heap, 6) ? "Valid Max-Heap" : "Invalid Heap");
    printf("Array 2: %s\n", is_max_heap(invalid_heap, 6) ? "Valid Max-Heap" : "Invalid Heap");
    return 0;
}
