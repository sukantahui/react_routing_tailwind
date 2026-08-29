#include <stdio.h>

int remove_duplicates(int nums[], int n) {
    if (n == 0) return 0;
    int write = 0;
    for (int read = 1; read < n; read++) {
        if (nums[read] != nums[write]) {
            write++;
            nums[write] = nums[read];
        }
    }
    return write + 1;
}

int main() {
    int nums[] = {1, 1, 2, 2, 3, 4, 4};
    int n = 7;
    printf("--- In-Place Remove Duplicates from Sorted Array ---\nBefore: [ 1 1 2 2 3 4 4 ]\n");
    int k = remove_duplicates(nums, n);
    printf("Unique Count = %d, Modified Array: [ ", k);
    for (int i = 0; i < k; i++) printf("%d ", nums[i]);
    printf("]\n");
    return 0;
}
