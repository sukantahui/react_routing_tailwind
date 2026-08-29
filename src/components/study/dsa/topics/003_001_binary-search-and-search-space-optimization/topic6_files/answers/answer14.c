#include <stdio.h>

int split_array(int nums[], int n, int k) {
    int max_val = 0, sum_val = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] > max_val) max_val = nums[i];
        sum_val += nums[i];
    }
    int low = max_val, high = sum_val, ans = sum_val;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int count = 1, current_sum = 0;
        for (int i = 0; i < n; i++) {
            if (current_sum + nums[i] > mid) {
                count++;
                current_sum = 0;
            }
            current_sum += nums[i];
        }
        if (count <= k) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int nums[] = {7, 2, 5, 10, 8};
    int n = 5, k = 2;
    printf("--- Split Array Largest Sum ---\n");
    printf("Minimized Largest Subarray Sum = %d\n", split_array(nums, n, k));
    return 0;
}
