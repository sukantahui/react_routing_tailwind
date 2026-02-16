#include <stdio.h>

int firstMissingPositive(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        while (arr[i] > 0 && arr[i] <= n && arr[arr[i] - 1] != arr[i]) {
            int temp = arr[arr[i] - 1];
            arr[arr[i] - 1] = arr[i];
            arr[i] = temp;
        }
    }
    for (int i = 0; i < n; i++) {
        if (arr[i] != i + 1) return i + 1;
    }
    return n + 1;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int missing = firstMissingPositive(arr, n);
    printf("Smallest missing positive = %d\n", missing);
    return 0;
}