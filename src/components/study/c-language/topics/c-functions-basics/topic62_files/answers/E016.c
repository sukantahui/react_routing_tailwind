#include <stdio.h>

int firstMissingPositive(int nums[], int n) {
    for (int i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {
            int temp = nums[nums[i]-1];
            nums[nums[i]-1] = nums[i];
            nums[i] = temp;
        }
    }
    for (int i = 0; i < n; i++)
        if (nums[i] != i+1)
            return i+1;
    return n+1;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int miss = firstMissingPositive(arr, n);
    printf("Smallest missing positive = %d\n", miss);
    return 0;
}
