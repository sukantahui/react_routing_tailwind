#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int maximumGap(int nums[], int n) {
    if (n < 2) return 0;
    int maxVal = nums[0], minVal = nums[0];
    for (int i = 1; i < n; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
        if (nums[i] < minVal) minVal = nums[i];
    }
    int bucketSize = (maxVal - minVal) / (n - 1) + 1; // at least 1
    int bucketCount = (maxVal - minVal) / bucketSize + 1;
    int *bucketMin = (int*)malloc(bucketCount * sizeof(int));
    int *bucketMax = (int*)malloc(bucketCount * sizeof(int));
    for (int i = 0; i < bucketCount; i++) {
        bucketMin[i] = INT_MAX;
        bucketMax[i] = INT_MIN;
    }
    for (int i = 0; i < n; i++) {
        int idx = (nums[i] - minVal) / bucketSize;
        if (nums[i] < bucketMin[idx]) bucketMin[idx] = nums[i];
        if (nums[i] > bucketMax[idx]) bucketMax[idx] = nums[i];
    }
    int maxGap = 0, prevMax = minVal;
    for (int i = 0; i < bucketCount; i++) {
        if (bucketMin[i] == INT_MAX) continue;
        int gap = bucketMin[i] - prevMax;
        if (gap > maxGap) maxGap = gap;
        prevMax = bucketMax[i];
    }
    free(bucketMin); free(bucketMax);
    return maxGap;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int gap = maximumGap(arr, n);
    printf("Maximum gap = %d\n", gap);
    return 0;
}
