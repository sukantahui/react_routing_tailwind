#include <stdio.h>

int count_subarrays_with_sum(int nums[], int n, int k) {
    int count = 0, curr_sum = 0;
    int prefix_map[2000] = {0};
    prefix_map[1000] = 1; // Base offset sum = 0

    for (int i = 0; i < n; i++) {
        curr_sum += nums[i];
        int target = curr_sum - k;
        count += prefix_map[target + 1000];
        prefix_map[curr_sum + 1000]++;
    }
    return count;
}

int main() {
    int nums[] = {1, 1, 1};
    int n = 3, k = 2;
    printf("--- Subarrays with Given Sum K ---\n");
    printf("Total Subarrays with Sum %d = %d\n", k, count_subarrays_with_sum(nums, n, k));
    return 0;
}
