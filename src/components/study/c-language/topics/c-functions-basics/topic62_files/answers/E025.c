#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int threeSumClosest(int nums[], int n, int target) {
    qsort(nums, n, sizeof(int), cmp);
    int closest = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < n-2; i++) {
        int left = i+1, right = n-1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (abs(sum - target) < abs(closest - target))
                closest = sum;
            if (sum < target) left++;
            else if (sum > target) right--;
            else return sum;
        }
    }
    return closest;
}

int main() {
    int n, target;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Target: ");
    scanf("%d", &target);

    int sum = threeSumClosest(arr, n, target);
    printf("Closest sum = %d\n", sum);
    return 0;
}
