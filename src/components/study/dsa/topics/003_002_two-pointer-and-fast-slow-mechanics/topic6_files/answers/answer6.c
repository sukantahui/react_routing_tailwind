#include <stdio.h>

void merge_sorted(int nums1[], int m, int nums2[], int n) {
    int p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
        else nums1[p--] = nums2[p2--];
    }
    while (p2 >= 0) nums1[p--] = nums2[p2--];
}

int main() {
    int nums1[6] = {1, 2, 3, 0, 0, 0};
    int nums2[3] = {2, 5, 6};
    printf("--- Two-Pointer In-Place Merge ---\n");
    merge_sorted(nums1, 3, nums2, 3);
    printf("Merged Array: [ ");
    for (int i = 0; i < 6; i++) printf("%d ", nums1[i]);
    printf("]\n");
    return 0;
}
