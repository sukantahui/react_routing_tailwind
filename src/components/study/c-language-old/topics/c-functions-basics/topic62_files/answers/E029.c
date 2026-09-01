#include <stdio.h>

int kadane(int nums[], int n) {
    int maxSoFar = nums[0], maxEndingHere = nums[0];
    for (int i = 1; i < n; i++) {
        maxEndingHere = (nums[i] > maxEndingHere + nums[i]) ? nums[i] : maxEndingHere + nums[i];
        maxSoFar = (maxEndingHere > maxSoFar) ? maxEndingHere : maxSoFar;
    }
    return maxSoFar;
}

int maxSubarraySumCircular(int nums[], int n) {
    int maxKadane = kadane(nums, n);
    if (maxKadane < 0) return maxKadane;

    int total = 0;
    for (int i = 0; i < n; i++) {
        total += nums[i];
        nums[i] = -nums[i];
    }
    int minKadane = kadane(nums, n);
    int maxCircular = total + minKadane; // because minKadane is - (max subarray of negated) = -min subarray
    return (maxKadane > maxCircular) ? maxKadane : maxCircular;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int maxSum = maxSubarraySumCircular(arr, n);
    printf("Maximum circular subarray sum = %d\n", maxSum);
    return 0;
}
