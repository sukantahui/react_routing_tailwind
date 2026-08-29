#include <stdio.h>
#include <limits.h>

int min(int a, int b) { return (a < b) ? a : b; }

int min_subarray_len(int target, int nums[], int n) {
    int left = 0, sum = 0, min_len = INT_MAX;
    for (int right = 0; right < n; right++) {
        sum += nums[right];
        while (sum >= target) {
            min_len = min(min_len, right - left + 1);
            sum -= nums[left++];
        }
    }
    return (min_len == INT_MAX) ? 0 : min_len;
}

int main() {
    int nums[] = {2, 3, 1, 2, 4, 3};
    int n = 6, target = 7;
    printf("--- Smallest Subarray with Sum >= Target ---\n");
    printf("Minimum Subarray Length = %d\n", min_subarray_len(target, nums, n));
    return 0;
}
