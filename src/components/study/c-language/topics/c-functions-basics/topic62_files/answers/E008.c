#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void reverse(int arr[], int start, int end) {
    while (start < end) {
        swap(&arr[start], &arr[end]);
        start++; end--;
    }
}

void nextPermutation(int arr[], int n) {
    int i = n - 2;
    while (i >= 0 && arr[i] >= arr[i+1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (arr[j] <= arr[i]) j--;
        swap(&arr[i], &arr[j]);
    }
    reverse(arr, i+1, n-1);
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    nextPermutation(arr, n);

    printf("Next permutation: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
