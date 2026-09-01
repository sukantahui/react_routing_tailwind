#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int longestConsecutive(int nums[], int n) {
    if (n == 0) return 0;
    qsort(nums, n, sizeof(int), cmp);
    int longest = 1, current = 1;
    for (int i = 1; i < n; i++) {
        if (nums[i] == nums[i-1]) continue;
        if (nums[i] == nums[i-1] + 1)
            current++;
        else {
            if (current > longest) longest = current;
            current = 1;
        }
    }
    if (current > longest) longest = current;
    return longest;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int len = longestConsecutive(arr, n);
    printf("Longest consecutive length = %d\n", len);
    return 0;
}
