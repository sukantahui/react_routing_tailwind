#include <stdio.h>

void single_number_iii(int nums[], int n, int *res1, int *res2) {
    int xor_sum = 0;
    for (int i = 0; i < n; i++) xor_sum ^= nums[i];

    // Find lowest set bit mask
    unsigned int diff = (unsigned int)xor_sum & -(unsigned int)xor_sum;

    *res1 = 0; *res2 = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] & diff) *res1 ^= nums[i];
        else *res2 ^= nums[i];
    }
}

int main() {
    int nums[] = {1, 2, 1, 3, 2, 5};
    int n = 6, num1, num2;
    printf("--- Single Number III (Two Unique Numbers) ---\n");
    single_number_iii(nums, n, &num1, &num2);
    printf("Unique Numbers: %d and %d\n", num1, num2);
    return 0;
}
