#include <stdio.h>

int subarray_sum_k(int nums[], int n, int k) {
    int count = 0, curr_sum = 0;
    int hash_map[2000] = {0};
    hash_map[1000] = 1; // Base 0 sum

    for (int i = 0; i < n; i++) {
        curr_sum += nums[i];
        int target = curr_sum - k;
        count += hash_map[target + 1000];
        hash_map[curr_sum + 1000]++;
    }
    return count;
}

int main() {
    int nums[] = {1, 1, 1};
    int n = 3, k = 2;
    printf("--- Subarray Sum Equals K ---\n");
    printf("Total Subarrays with Sum %d = %d\n", k, subarray_sum_k(nums, n, k));
    return 0;
}
