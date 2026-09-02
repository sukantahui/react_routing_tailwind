#include <stdio.h>
#include <string.h>

/**
 * SortingAlgorithmsDemo.c
 * Demonstrates Bubble Sort (with early-exit flag), Selection Sort (min index tracking),
 * and Insertion Sort (shifting) with step-by-step pass logging.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

void printArray(const char *label, const int arr[], int n) {
    printf("%-20s: [ ", label);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("]\n");
}

// 1. Optimized Bubble Sort: Repeatedly swaps adjacent out-of-order elements
void bubbleSort(int arr[], int n) {
    int passes = 0, swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        passes++;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
                swaps++;
            }
        }
        // If no two elements were swapped in inner loop, array is already sorted!
        if (!swapped) break;
    }
    printf("   ↳ Bubble Sort finished in %d passes (%d swaps)\n", passes, swaps);
}

// 2. Selection Sort: Finds minimum in unsorted subarray and swaps to current index
void selectionSort(int arr[], int n) {
    int swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            swaps++;
        }
    }
    printf("   ↳ Selection Sort finished with %d swaps (Min-index selection)\n", swaps);
}

// 3. Insertion Sort: Inserts each element into its correct sorted position by shifting
void insertionSort(int arr[], int n) {
    int shifts = 0;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            shifts++;
        }
        arr[j + 1] = key;
    }
    printf("   ↳ Insertion Sort finished with %d shifts (Card-hand insertion)\n", shifts);
}

int main(void) {
    int original[] = {64, 25, 12, 22, 11, 90, 45};
    int n = sizeof(original) / sizeof(original[0]);
    int copy[7];

    printf("====================================================\n");
    printf(" C Sorting Algorithms: Bubble, Selection & Insertion\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    printArray("Initial Unsorted Array", original, n);
    printf("\n");

    // 1. Run Bubble Sort
    memcpy(copy, original, sizeof(original));
    bubbleSort(copy, n);
    printArray("Bubble Sorted", copy, n);
    printf("\n");

    // 2. Run Selection Sort
    memcpy(copy, original, sizeof(original));
    selectionSort(copy, n);
    printArray("Selection Sorted", copy, n);
    printf("\n");

    // 3. Run Insertion Sort
    memcpy(copy, original, sizeof(original));
    insertionSort(copy, n);
    printArray("Insertion Sorted", copy, n);

    return 0;
}
