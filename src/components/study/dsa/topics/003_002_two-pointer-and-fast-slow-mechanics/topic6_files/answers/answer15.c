#include <stdio.h>

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void sort_colors(int nums[], int n) {
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(&nums[low], &nums[mid]);
            low++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(&nums[mid], &nums[high]);
            high--;
        }
    }
}

int main() {
    int nums[] = {2, 0, 2, 1, 1, 0};
    int n = 6;
    printf("--- Sort Colors / Dutch National Flag (3-Way Partition) ---\nBefore: [ 2 0 2 1 1 0 ]\n");
    sort_colors(nums, n);
    printf("After : [ ");
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("]\n");
    return 0;
}
