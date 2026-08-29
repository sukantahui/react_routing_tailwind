#include <stdio.h>

int single_number(int nums[], int n) {
    int xor_sum = 0;
    for (int i = 0; i < n; i++) xor_sum ^= nums[i];
    return xor_sum;
}

int main() {
    int nums[] = {4, 1, 2, 1, 2};
    int n = 5;
    printf("--- Single Number I (XOR Reduction) ---\n");
    printf("Single Non-Repeating Element = %d\n", single_number(nums, n));
    return 0;
}
