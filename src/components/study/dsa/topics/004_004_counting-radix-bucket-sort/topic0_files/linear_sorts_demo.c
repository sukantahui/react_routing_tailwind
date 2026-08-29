#include <stdio.h>
#include <stdlib.h>

void printArray(const int arr[], int n, const char *title) {
    printf("%-20s: [ ", title);
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], (i + 1 < n) ? ", " : "");
    }
    printf(" ]\n");
}

// 1. Counting Sort - Linear O(n + k) Time for Integer Range [0...k]
void countingSort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }

    int *count = (int *)calloc(max + 1, sizeof(int));
    int *output = (int *)malloc(n * sizeof(int));

    // Frequency counting
    for (int i = 0; i < n; i++) count[arr[i]]++;

    // Cumulative prefix sum
    for (int i = 1; i <= max; i++) count[i] += count[i - 1];

    // Stable output construction
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Copy back
    for (int i = 0; i < n; i++) arr[i] = output[i];

    free(count);
    free(output);
}

// 2. Radix Sort Helper (Counting Sort on Digit Position exp)
void countingSortByDigit(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};

    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];

    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (int i = 0; i < n; i++) arr[i] = output[i];
}

// Radix Sort (LSD - Least Significant Digit) - O(d * (n + k))
void radixSort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];

    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, n, exp);
    }
}

int main() {
    printf("=== Non-Comparison Linear Sorts: Counting & Radix Sort in C ===\n\n");

    int raw1[] = {4, 2, 2, 8, 3, 3, 1};
    int n1 = sizeof(raw1) / sizeof(raw1[0]);
    printArray(raw1, n1, "Original (Counting)");
    countingSort(raw1, n1);
    printArray(raw1, n1, "Counting Sort Result");
    printf("\n");

    int raw2[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n2 = sizeof(raw2) / sizeof(raw2[0]);
    printArray(raw2, n2, "Original (Radix)");
    radixSort(raw2, n2);
    printArray(raw2, n2, "Radix Sort Result");

    return 0;
}
