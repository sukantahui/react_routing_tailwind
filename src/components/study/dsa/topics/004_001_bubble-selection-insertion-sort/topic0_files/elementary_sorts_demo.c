#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void printArray(const int arr[], int n, const char *msg) {
    printf("%-20s: [ ", msg);
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], (i + 1 < n) ? ", " : "");
    }
    printf(" ]\n");
}

// 1. Bubble Sort with Early Exit Flag Optimization
void bubbleSort(int arr[], int n) {
    bool swapped;
    int passCount = 0;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        passCount++;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) {
            printf("[BUBBLE SORT] Stopped early at Pass %d (Array already sorted!)\n", passCount);
            break;
        }
    }
}

// 2. Selection Sort (Scans for Minimum Element)
void selectionSort(int arr[], int n) {
    int swapCount = 0;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(&arr[i], &arr[minIdx]);
            swapCount++;
        }
    }
    printf("[SELECTION SORT] Completed in %d swaps\n", swapCount);
}

// 3. Insertion Sort (Online Sorting / Card Player Algorithm)
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Shift elements greater than key to one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    printf("[INSERTION SORT] Sorted elements by right-shifting\n");
}

int main() {
    printf("=== Elementary Comparison Sorting Algorithms in C ===\n\n");

    int orig[] = {64, 25, 12, 22, 11};
    int n = sizeof(orig) / sizeof(orig[0]);

    // Test Bubble Sort
    int a1[5]; for(int i=0; i<n; i++) a1[i] = orig[i];
    printArray(a1, n, "Original Array");
    bubbleSort(a1, n);
    printArray(a1, n, "Bubble Sort Result");
    printf("\n");

    // Test Selection Sort
    int a2[5]; for(int i=0; i<n; i++) a2[i] = orig[i];
    selectionSort(a2, n);
    printArray(a2, n, "Selection Sort");
    printf("\n");

    // Test Insertion Sort
    int a3[5]; for(int i=0; i<n; i++) a3[i] = orig[i];
    insertionSort(a3, n);
    printArray(a3, n, "Insertion Sort");

    return 0;
}
