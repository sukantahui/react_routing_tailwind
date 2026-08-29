#include <stdio.h>

int find_unsorted_subarray(int nums[], int n) {
    int max_val = nums[0], right = -1;
    for (int i = 1; i < n; i++) {
        if (nums[i] < max_val) right = i;
        else max_val = nums[i];
    }
    int min_val = nums[n - 1], left = -1;
    for (int i = n - 2; i >= 0; i--) {
        if (nums[i] > min_val) left = i;
        else min_val = nums[i];
    }
    return (right == -1) ? 0 : (right - left + 1);
}

int main() {
    int nums[] = {2, 6, 4, 8, 10, 9, 15};
    int n = 7;
    printf("--- Minimum Window Unsorted Subarray Finder ---\n");
    printf("Shortest Unsorted Subarray Length = %d\n", find_unsorted_subarray(nums, n));
    return 0;
}
