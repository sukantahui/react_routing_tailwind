#include <stdio.h>

int removeDuplicates(int nums[], int n) {
    if (n <= 2) return n;
    int j = 2;
    for (int i = 2; i < n; i++) {
        if (nums[i] != nums[j-2])
            nums[j++] = nums[i];
    }
    return j;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter sorted elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int newLen = removeDuplicates(arr, n);

    printf("New array: ");
    for (int i = 0; i < newLen; i++) printf("%d ", arr[i]);
    printf(", length = %d\n", newLen);
    return 0;
}
