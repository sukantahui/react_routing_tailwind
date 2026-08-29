#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

// 1. Quick Sort: Lomuto Partition Scheme
int lomutoPartition(int arr[], int low, int high) {
    int pivot = arr[high]; // Pick last element as pivot
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

void quickSortLomuto(int arr[], int low, int high) {
    if (low < high) {
        int pi = lomutoPartition(arr, low, high);
        quickSortLomuto(arr, low, pi - 1);
        quickSortLomuto(arr, pi + 1, high);
    }
}

// 2. Quick Sort: Hoare Partition Scheme
int hoarePartition(int arr[], int low, int high) {
    int pivot = arr[low]; // Pick first element as pivot
    int i = low - 1;
    int j = high + 1;
    while (1) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(&arr[i], &arr[j]);
    }
}

void quickSortHoare(int arr[], int low, int high) {
    if (low < high) {
        int pi = hoarePartition(arr, low, high);
        quickSortHoare(arr, low, pi);
        quickSortHoare(arr, pi + 1, high);
    }
}

// 3. Merge Sort Implementation - Guaranteed O(n log n)
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

void printArray(const int arr[], int n, const char *title) {
    printf("%-22s: [ ", title);
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], (i + 1 < n) ? ", " : "");
    }
    printf(" ]\n");
}

int main() {
    printf("=== Divide & Conquer Sorts: Quick Sort vs Merge Sort in C ===\n\n");
    int raw[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(raw) / sizeof(raw[0]);

    printArray(raw, n, "Original Array");

    int a1[7]; for(int i=0; i<n; i++) a1[i] = raw[i];
    quickSortLomuto(a1, 0, n - 1);
    printArray(a1, n, "Quick Sort (Lomuto)");

    int a2[7]; for(int i=0; i<n; i++) a2[i] = raw[i];
    quickSortHoare(a2, 0, n - 1);
    printArray(a2, n, "Quick Sort (Hoare)");

    int a3[7]; for(int i=0; i<n; i++) a3[i] = raw[i];
    mergeSort(a3, 0, n - 1);
    printArray(a3, n, "Merge Sort");

    return 0;
}
