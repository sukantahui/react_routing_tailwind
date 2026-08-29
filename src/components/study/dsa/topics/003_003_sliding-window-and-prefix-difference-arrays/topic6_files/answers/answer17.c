#include <stdio.h>

int at_most(int nums[], int n, int k) {
    int left = 0, count = 0, odd_count = 0;
    for (int right = 0; right < n; right++) {
        if (nums[right] % 2 == 1) odd_count++;
        while (odd_count > k) {
            if (nums[left] % 2 == 1) odd_count--;
            left++;
        }
        count += (right - left + 1);
    }
    return count;
}

int num_subarrays_with_k_odds(int nums[], int n, int k) {
    return at_most(nums, n, k) - at_most(nums, n, k - 1);
}

int main() {
    int nums[] = {1, 1, 2, 1, 1};
    int n = 5, k = 3;
    printf("--- Count Number of Nice Subarrays (K Odds) ---\n");
    printf("Nice Subarrays Count = %d\n", num_subarrays_with_k_odds(nums, n, k));
    return 0;
}
