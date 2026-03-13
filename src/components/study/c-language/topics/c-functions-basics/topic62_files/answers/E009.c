#include <stdio.h>

int lengthOfLIS(int nums[], int n) {
    if (n == 0) return 0;
    int tails[n];
    int size = 0;
    for (int i = 0; i < n; i++) {
        int lo = 0, hi = size;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (tails[mid] < nums[i])
                lo = mid + 1;
            else
                hi = mid;
        }
        tails[lo] = nums[i];
        if (lo == size) size++;
    }
    return size;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int len = lengthOfLIS(arr, n);
    printf("LIS length = %d\n", len);
    return 0;
}
