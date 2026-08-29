#include <stdio.h>

int subarrays_div_by_k(int nums[], int n, int k) {
    int mod_map[100] = {0};
    mod_map[0] = 1;
    int curr_sum = 0, count = 0;

    for (int i = 0; i < n; i++) {
        curr_sum += nums[i];
        int rem = (curr_sum % k + k) % k;
        count += mod_map[rem];
        mod_map[rem]++;
    }
    return count;
}

int main() {
    int nums[] = {4, 5, 0, -2, -3, 1};
    int n = 6, k = 5;
    printf("--- Subarray Sums Divisible by K ---\n");
    printf("Total Subarrays Divisible by %d = %d\n", k, subarrays_div_by_k(nums, n, k));
    return 0;
}
