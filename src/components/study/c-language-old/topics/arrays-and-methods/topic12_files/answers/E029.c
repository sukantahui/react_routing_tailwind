#include <stdio.h>

int max(int a, int b) { return a > b ? a : b; }
int min(int a, int b) { return a < b ? a : b; }

int maxSubarraySumCircular(int arr[], int n) {
    int total = 0;
    int maxSum = arr[0], curMax = 0;
    int minSum = arr[0], curMin = 0;
    for (int i = 0; i < n; i++) {
        curMax = max(arr[i], curMax + arr[i]);
        maxSum = max(maxSum, curMax);
        curMin = min(arr[i], curMin + arr[i]);
        minSum = min(minSum, curMin);
        total += arr[i];
    }
    if (maxSum < 0) return maxSum; // all negatives
    return max(maxSum, total - minSum);
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int maxCirc = maxSubarraySumCircular(arr, n);
    printf("Maximum circular subarray sum = %d\n", maxCirc);
    return 0;
}