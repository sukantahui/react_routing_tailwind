#include <stdio.h>

int minSubArrayLen(int target, int arr[], int n) {
    int left = 0, sum = 0, minLen = n + 1;
    for (int right = 0; right < n; right++) {
        sum += arr[right];
        while (sum >= target) {
            int len = right - left + 1;
            if (len < minLen) minLen = len;
            sum -= arr[left++];
        }
    }
    return (minLen == n + 1) ? 0 : minLen;
}

int main() {
    int n, target, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target sum: ");
    scanf("%d", &target);

    int len = minSubArrayLen(target, arr, n);
    printf("Minimum subarray length = %d\n", len);
    return 0;
}