#include <stdio.h>

int max(int a, int b) { return a > b ? a : b; }
int min(int a, int b) { return a < b ? a : b; }

int maxProduct(int arr[], int n) {
    int maxProd = arr[0], minProd = arr[0], result = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < 0) {
            int temp = maxProd;
            maxProd = minProd;
            minProd = temp;
        }
        maxProd = max(arr[i], maxProd * arr[i]);
        minProd = min(arr[i], minProd * arr[i]);
        result = max(result, maxProd);
    }
    return result;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int res = maxProduct(arr, n);
    printf("Maximum product = %d\n", res);
    return 0;
}