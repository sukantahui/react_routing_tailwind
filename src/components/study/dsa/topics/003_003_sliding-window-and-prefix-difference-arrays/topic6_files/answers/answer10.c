#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int longest_ones_k_flips(int nums[], int n, int k) {
    int left = 0, zero_count = 0, max_len = 0;
    for (int right = 0; right < n; right++) {
        if (nums[right] == 0) zero_count++;
        while (zero_count > k) {
            if (nums[left] == 0) zero_count--;
            left++;
        }
        max_len = max(max_len, right - left + 1);
    }
    return max_len;
}

int main() {
    int nums[] = {1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0};
    int n = 11, k = 2;
    printf("--- Maximum Consecutive Ones III (K Flips) ---\n");
    printf("Longest Consecutive Ones Window = %d\n", longest_ones_k_flips(nums, n, k));
    return 0;
}
