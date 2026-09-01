#include <stdio.h>
#include <stdlib.h>

int* majorityElement(int nums[], int n, int* returnSize) {
    int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] == candidate1) count1++;
        else if (nums[i] == candidate2) count2++;
        else if (count1 == 0) { candidate1 = nums[i]; count1 = 1; }
        else if (count2 == 0) { candidate2 = nums[i]; count2 = 1; }
        else { count1--; count2--; }
    }

    count1 = count2 = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] == candidate1) count1++;
        else if (nums[i] == candidate2) count2++;
    }

    int *res = (int*)malloc(2 * sizeof(int));
    *returnSize = 0;
    if (count1 > n/3) res[(*returnSize)++] = candidate1;
    if (count2 > n/3) res[(*returnSize)++] = candidate2;
    return res;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int size;
    int *maj = majorityElement(arr, n, &size);

    printf("Majority elements: ");
    for (int i = 0; i < size; i++)
        printf("%d ", maj[i]);
    printf("\n");
    free(maj);
    return 0;
}
