#include <stdio.h>

int single_non_duplicate(int nums[], int n) {
    int low = 0, high = n - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (mid % 2 == 1) mid--;
        if (nums[mid] == nums[mid + 1]) low = mid + 2;
        else high = mid;
    }
    return nums[low];
}

int main() {
    int nums[] = {1, 1, 2, 3, 3, 4, 4, 8, 8};
    int n = 9;
    printf("--- Single Element in Sorted Array ---\n");
    printf("Single Non-Duplicate Element = %d\n", single_non_duplicate(nums, n));
    return 0;
}
