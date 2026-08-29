#include <stdio.h>

void move_zeroes(int nums[], int n) {
    int write = 0;
    for (int read = 0; read < n; read++) {
        if (nums[read] != 0) {
            int temp = nums[write];
            nums[write] = nums[read];
            nums[read] = temp;
            write++;
        }
    }
}

int main() {
    int nums[] = {0, 1, 0, 3, 12};
    int n = 5;
    printf("--- Move Zeroes to End ---\nBefore: [ 0 1 0 3 12 ]\n");
    move_zeroes(nums, n);
    printf("After : [ ");
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("]\n");
    return 0;
}
