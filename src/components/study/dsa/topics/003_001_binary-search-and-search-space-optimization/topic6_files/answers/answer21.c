#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int count_pairs(int *nums, int n, int mid_dist) {
    int count = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        while (nums[right] - nums[left] > mid_dist) {
            left++;
        }
        count += (right - left);
    }
    return count;
}

int smallest_distance_pair(int *nums, int n, int k) {
    qsort(nums, n, sizeof(int), compare);
    int low = 0;
    int high = nums[n - 1] - nums[0];
    int result = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (count_pairs(nums, n, mid) >= k) {
            result = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return result;
}

int main() {
    int nums[] = {1, 3, 1, 4, 6};
    int n = sizeof(nums) / sizeof(nums[0]);
    int k = 3;

    int ans = smallest_distance_pair(nums, n, k);

    printf("--- K-th Smallest Pair Distance Engine ---\n");
    printf("K-th Smallest Absolute Difference Pair = %d\n", ans);
    return 0;
}

