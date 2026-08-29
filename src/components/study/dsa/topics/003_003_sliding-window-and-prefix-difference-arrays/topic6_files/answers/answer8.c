#include <stdio.h>

int find_equilibrium_index(int arr[], int n) {
    int total_sum = 0;
    for (int i = 0; i < n; i++) total_sum += arr[i];

    int left_sum = 0;
    for (int i = 0; i < n; i++) {
        total_sum -= arr[i]; // Right sum
        if (left_sum == total_sum) return i;
        left_sum += arr[i];
    }
    return -1;
}

int main() {
    int arr[] = {-7, 1, 5, 2, -4, 3, 0};
    int n = 7;
    printf("--- Array Equilibrium Index Finder ---\n");
    printf("Equilibrium Index = %d\n", find_equilibrium_index(arr, n));
    return 0;
}
