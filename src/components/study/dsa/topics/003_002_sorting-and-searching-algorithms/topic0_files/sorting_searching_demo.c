#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 1. Bubble Sort with Early Stop Optimization - O(n^2) worst, O(n) best
void bubbleSort(int arr[], int n) {
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

// 2. Quick Sort Partitioning (Lomuto Scheme) - O(n log n) average
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// 3. Merge Sort Helper Function - O(n log n) worst-case guaranteed
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

// 4. Binary Search - O(log n) Time
int binarySearch(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

void printArray(const int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], (i + 1 < n) ? ", " : "");
    }
    printf("\n");
}

int main() {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - SORTING & SEARCHING BENCHMARK LAB\n");
    printf("========================================================\n\n");

    int rawData[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(rawData) / sizeof(rawData[0]);

    printf("Original Unsorted Data: ");
    printArray(rawData, n);

    // Quick Sort
    int arrQuick[7];
    for(int i=0; i<n; i++) arrQuick[i] = rawData[i];
    quickSort(arrQuick, 0, n - 1);
    printf("\nQuick Sort Result:      ");
    printArray(arrQuick, n);

    // Merge Sort
    int arrMerge[7];
    for(int i=0; i<n; i++) arrMerge[i] = rawData[i];
    mergeSort(arrMerge, 0, n - 1);
    printf("Merge Sort Result:      ");
    printArray(arrMerge, n);

    // Binary Search
    int target = 43;
    int index = binarySearch(arrMerge, n, target);
    if (index != -1) {
        printf("\nBinary Search: Found key %d at sorted index %d\n", target, index);
    }

    return 0;
}
