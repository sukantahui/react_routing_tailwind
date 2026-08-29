#include <stdio.h>

void update_difference_array(int diff[], int L, int R, int val) {
    diff[L] += val;
    diff[R + 1] -= val;
}

void reconstruct_array(int diff[], int arr[], int n) {
    arr[0] = diff[0];
    for (int i = 1; i < n; i++) arr[i] = arr[i - 1] + diff[i];
}

int main() {
    int n = 5;
    int diff[6] = {0}; // Extra slot for diff[R+1]
    int arr[5];

    printf("--- Difference Array O(1) Range Updates ---\n");
    update_difference_array(diff, 1, 3, 10); // arr[1..3] += 10
    reconstruct_array(diff, arr, n);

    printf("Reconstructed Array after updates: [ ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("]\n");
    return 0;
}
