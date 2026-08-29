#include <stdio.h>
#include <stdbool.h>

int smallest_divisor(int nums[], int n, int threshold) {
    int max_val = 0;
    for (int i = 0; i < n; i++) if (nums[i] > max_val) max_val = nums[i];

    int low = 1, high = max_val, ans = max_val;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int sum = 0;
        for (int i = 0; i < n; i++) sum += (nums[i] + mid - 1) / mid;
        if (sum <= threshold) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int nums[] = {1, 2, 5, 9};
    int n = 4, threshold = 6;
    printf("--- Smallest Divisor Given a Threshold ---\n");
    printf("Smallest Divisor = %d\n", smallest_divisor(nums, n, threshold));
    return 0;
}
