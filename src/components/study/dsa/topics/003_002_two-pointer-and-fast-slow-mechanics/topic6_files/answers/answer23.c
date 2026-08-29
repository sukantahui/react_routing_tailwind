#include <stdio.h>
#include <stdlib.h>

int at_most_k(int *nums, int n, int k) {
    int freq[1000] = {0};
    int left = 0;
    int distinct_count = 0;
    int total_subarrays = 0;

    for (int right = 0; right < n; right++) {
        if (freq[nums[right]] == 0) {
            distinct_count++;
        }
        freq[nums[right]]++;

        while (distinct_count > k) {
            freq[nums[left]]--;
            if (freq[nums[left]] == 0) {
                distinct_count--;
            }
            left++;
        }

        total_subarrays += (right - left + 1);
    }
    return total_subarrays;
}

void k_distinct_subarrays_demo() {
    int nums[] = {1, 2, 1, 2, 3};
    int n = sizeof(nums) / sizeof(nums[0]);
    int k = 2;

    int ans = at_most_k(nums, n, k) - at_most_k(nums, n, k - 1);

    printf("--- Subarrays with K Different Integers ---\n");
    printf("Total Subarrays with K=%d Distinct Integers = %d\n", k, ans);
}

int main() {
    k_distinct_subarrays_demo();
    return 0;
}

