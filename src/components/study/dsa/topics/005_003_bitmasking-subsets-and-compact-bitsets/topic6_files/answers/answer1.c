#include <stdio.h>

void generate_subsets(int arr[], int n) {
    int total_subsets = 1 << n; // 2^N
    printf("--- Bitmask Power Set Generator ---\nTotal Subsets = %d\n", total_subsets);
    for (int mask = 0; mask < total_subsets; mask++) {
        printf("Subset %2d: [ ", mask);
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) printf("%d ", arr[i]);
        }
        printf("]\n");
    }
}

int main() {
    int arr[] = {1, 2, 3};
    int n = 3;
    generate_subsets(arr, n);
    return 0;
}
