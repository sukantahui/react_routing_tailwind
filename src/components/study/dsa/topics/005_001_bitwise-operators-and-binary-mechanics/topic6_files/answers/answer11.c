#include <stdio.h>

int single_number_ii(int nums[], int n) {
    int ones = 0, twos = 0;
    for (int i = 0; i < n; i++) {
        ones = (ones ^ nums[i]) & ~twos;
        twos = (twos ^ nums[i]) & ~ones;
    }
    return ones;
}

int main() {
    int nums[] = {2, 2, 3, 2};
    int n = 4;
    printf("--- Single Number II (Others Appear Thrice) ---\n");
    printf("Single Number = %d\n", single_number_ii(nums, n));
    return 0;
}
