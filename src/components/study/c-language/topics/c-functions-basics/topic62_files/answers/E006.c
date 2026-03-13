#include <stdio.h>
#include <limits.h>

double findMedianSortedArrays(int nums1[], int m, int nums2[], int n) {
    if (m > n) return findMedianSortedArrays(nums2, n, nums1, m);
    int low = 0, high = m;
    while (low <= high) {
        int partition1 = (low + high) / 2;
        int partition2 = (m + n + 1) / 2 - partition1;

        int maxLeft1 = (partition1 == 0) ? INT_MIN : nums1[partition1 - 1];
        int minRight1 = (partition1 == m) ? INT_MAX : nums1[partition1];
        int maxLeft2 = (partition2 == 0) ? INT_MIN : nums2[partition2 - 1];
        int minRight2 = (partition2 == n) ? INT_MAX : nums2[partition2];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 0)
                return (double)((maxLeft1 > maxLeft2 ? maxLeft1 : maxLeft2) +
                                 (minRight1 < minRight2 ? minRight1 : minRight2)) / 2.0;
            else
                return (double)(maxLeft1 > maxLeft2 ? maxLeft1 : maxLeft2);
        } else if (maxLeft1 > minRight2) {
            high = partition1 - 1;
        } else {
            low = partition1 + 1;
        }
    }
    return 0.0;
}

int main() {
    int m, n;
    printf("Enter size of first array: ");
    scanf("%d", &m);
    int arr1[m];
    printf("Enter elements of first sorted array: ");
    for (int i = 0; i < m; i++) scanf("%d", &arr1[i]);

    printf("Enter size of second array: ");
    scanf("%d", &n);
    int arr2[n];
    printf("Enter elements of second sorted array: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr2[i]);

    double med = findMedianSortedArrays(arr1, m, arr2, n);
    printf("Median = %g\n", med);
    return 0;
}
