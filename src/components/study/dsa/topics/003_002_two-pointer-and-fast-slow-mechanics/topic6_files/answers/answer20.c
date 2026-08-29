#include <stdio.h>

int find_duplicate(int nums[], int n) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}

int main() {
    int nums[] = {1, 3, 4, 2, 2};
    int n = 5;
    printf("--- Find Duplicate Number (Floyd's Array Cycle) ---\n");
    printf("Duplicate Number = %d\n", find_duplicate(nums, n));
    return 0;
}
