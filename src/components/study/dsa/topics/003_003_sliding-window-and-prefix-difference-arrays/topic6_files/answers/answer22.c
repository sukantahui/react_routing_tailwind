#include <stdio.h>

int min_k_bit_flips(int nums[], int n, int k) {
    int flipped[100] = {0};
    int is_flipped = 0, flips = 0;

    for (int i = 0; i < n; i++) {
        if (i >= k) is_flipped ^= flipped[i - k];
        if (nums[i] == is_flipped) {
            if (i + k > n) return -1;
            flipped[i] = 1;
            is_flipped ^= 1;
            flips++;
        }
    }
    return flips;
}

int main() {
    int nums[] = {0, 1, 0};
    int n = 3, k = 1;
    printf("--- Minimum K Consecutive Bit Flips ---\n");
    printf("Minimum Flips Required = %d\n", min_k_bit_flips(nums, n, k));
    return 0;
}
