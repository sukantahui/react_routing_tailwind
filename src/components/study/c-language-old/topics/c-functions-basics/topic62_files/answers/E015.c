#include <stdio.h>
#include <limits.h>

int minSubArrayLen(int target, int nums[], int n) {
    int left = 0, sum = 0, minLen = INT_MAX;
    for (int right = 0; right < n; right++) {
        sum += nums[right];
        while (sum >= target) {
            int len = right - left + 1;
            if (len < minLen) minLen = len;
            sum -= nums[left++];
        }
    }
    return (minLen == INT_MAX) ? 0 : minLen;
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

    int len = minSubArrayLen(target, arr, n);
    printf("Minimum subarray length = %d\n", len);
    return 0;
}
