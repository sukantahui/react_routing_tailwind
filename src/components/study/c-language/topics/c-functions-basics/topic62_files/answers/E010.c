#include <stdio.h>

int maxProduct(int nums[], int n) {
    if (n == 0) return 0;
    int maxProd = nums[0], minProd = nums[0], result = nums[0];
    for (int i = 1; i < n; i++) {
        if (nums[i] < 0) {
            int temp = maxProd;
            maxProd = minProd;
            minProd = temp;
        }
        maxProd = (nums[i] > maxProd * nums[i]) ? nums[i] : maxProd * nums[i];
        minProd = (nums[i] < minProd * nums[i]) ? nums[i] : minProd * nums[i];
        if (maxProd > result) result = maxProd;
    }
    return result;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int res = maxProduct(arr, n);
    printf("Maximum product = %d\n", res);
    return 0;
}
