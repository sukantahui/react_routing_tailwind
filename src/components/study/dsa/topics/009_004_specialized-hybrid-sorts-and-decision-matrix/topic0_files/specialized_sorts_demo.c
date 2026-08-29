#include <stdio.h>
#include <stdlib.h>

void printArray(const int arr[], int n, const char *title) {
    printf("%-20s: [ ", title);
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], (i + 1 < n) ? ", " : "");
    }
    printf(" ]\n");
}

// Shell Sort - Diminishing Gap Sequence Insertion Sort
void shellSort(int arr[], int n) {
    // Start with a large gap, then reduce the gap
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Do a gapped insertion sort for this gap size
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
        printf("[SHELL SORT] Completed pass with Gap = %d\n", gap);
    }
}

int main() {
    printf("=== Specialized & Hybrid Sorts: Shell Sort Mechanics in C ===\n\n");

    int raw[] = {12, 34, 54, 2, 3, 9, 81, 23};
    int n = sizeof(raw) / sizeof(raw[0]);

    printArray(raw, n, "Original Array");
    shellSort(raw, n);
    printArray(raw, n, "Shell Sort Result");

    return 0;
}
