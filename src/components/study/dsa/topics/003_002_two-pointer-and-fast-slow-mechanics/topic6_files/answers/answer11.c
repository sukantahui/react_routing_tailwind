#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

void three_sum(int *nums, int n) {
    qsort(nums, n, sizeof(int), compare);
    printf("--- 3Sum Problem (Unique Triplets = 0) ---\n");
    printf("Triplets: [ ");

    int first_triplet = 1;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int left = i + 1;
        int right = n - 1;
        int target = -nums[i];

        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                if (!first_triplet) printf(", ");
                printf("[%d, %d, %d]", nums[i], nums[left], nums[right]);
                first_triplet = 0;

                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    printf(" ]\n");
}

int main() {
    int nums[] = {-1, 0, 1, 2, -1, -4};
    int n = sizeof(nums) / sizeof(nums[0]);

    three_sum(nums, n);
    return 0;
}

