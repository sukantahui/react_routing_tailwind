#include <stdio.h>
#include <stdbool.h>

bool has_zero_sum_subarray(int arr[], int n) {
    int prefix_sum = 0;
    bool hash_set[2000] = {false};
    hash_set[1000] = true; // Offset 1000 for negative sums

    for (int i = 0; i < n; i++) {
        prefix_sum += arr[i];
        if (hash_set[prefix_sum + 1000]) return true;
        hash_set[prefix_sum + 1000] = true;
    }
    return false;
}

int main() {
    int arr[] = {4, 2, -3, 1, 6};
    printf("--- Subarray with 0 Sum Finder ---\n");
    if (has_zero_sum_subarray(arr, 5)) printf("Subarray with 0 Sum EXISTS!\n");
    else printf("No 0-sum subarray found.\n");
    return 0;
}
