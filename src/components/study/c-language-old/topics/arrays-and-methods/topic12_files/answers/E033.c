#include <stdio.h>

int removeDuplicates(int arr[], int n) {
    if (n <= 2) return n;
    int j = 2;
    for (int i = 2; i < n; i++) {
        if (arr[i] != arr[j - 2]) {
            arr[j] = arr[i];
            j++;
        }
    }
    return j;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter sorted elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int newLen = removeDuplicates(arr, n);

    printf("New array: ");
    for (int i = 0; i < newLen; i++) printf("%d ", arr[i]);
    printf("\nNew length = %d\n", newLen);
    return 0;
}