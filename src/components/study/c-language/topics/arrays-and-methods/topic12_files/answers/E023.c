#include <stdio.h>
#include <limits.h>

int maximumGap(int arr[], int n) {
    if (n < 2) return 0;
    int maxVal = arr[0], minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }

    int bucketSize = (maxVal - minVal) / (n - 1) + 1;
    int bucketCount = (maxVal - minVal) / bucketSize + 1;

    int bucketMin[bucketCount];
    int bucketMax[bucketCount];
    for (int i = 0; i < bucketCount; i++) {
        bucketMin[i] = INT_MAX;
        bucketMax[i] = INT_MIN;
    }

    for (int i = 0; i < n; i++) {
        int idx = (arr[i] - minVal) / bucketSize;
        if (arr[i] < bucketMin[idx]) bucketMin[idx] = arr[i];
        if (arr[i] > bucketMax[idx]) bucketMax[idx] = arr[i];
    }

    int maxGap = 0, prevMax = minVal;
    for (int i = 0; i < bucketCount; i++) {
        if (bucketMin[i] != INT_MAX) {
            if (bucketMin[i] - prevMax > maxGap)
                maxGap = bucketMin[i] - prevMax;
            prevMax = bucketMax[i];
        }
    }
    return maxGap;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int gap = maximumGap(arr, n);
    printf("Maximum gap = %d\n", gap);
    return 0;
}