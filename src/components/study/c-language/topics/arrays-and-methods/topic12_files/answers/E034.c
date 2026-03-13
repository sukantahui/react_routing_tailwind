#include <stdio.h>

int firstMissingPositive(int arr[], int n) {
    // segregate positives and negatives
    int j = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > 0) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            j++;
        }
    }
    int posSize = j;

    // Mark presence
    for (int i = 0; i < posSize; i++) {
        int val = abs(arr[i]);
        if (val <= posSize && arr[val - 1] > 0)
            arr[val - 1] = -arr[val - 1];
    }

    for (int i = 0; i < posSize; i++) {
        if (arr[i] > 0) return i + 1;
    }
    return posSize + 1;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements (may include negatives): ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int missing = firstMissingPositive(arr, n);
    printf("Smallest missing positive = %d\n", missing);
    return 0;
}