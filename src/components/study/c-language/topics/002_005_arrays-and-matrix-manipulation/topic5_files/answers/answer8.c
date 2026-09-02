#include <stdio.h>

/**
 * Project 8: Array Frequency Counter & Duplicate Filter
 * Counts frequency of every distinct element and filters out duplicates.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    int arr[] = {4, 5, 4, 2, 8, 5, 4, 9, 2, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    int visited[10] = {0};

    printf("Input Array: [ 4, 5, 4, 2, 8, 5, 4, 9, 2, 7 ]\n\n");
    printf("Element Frequencies:\n");

    for (int i = 0; i < n; i++) {
        if (visited[i] == 1) continue;

        int count = 1;
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                visited[j] = 1;
                count++;
            }
        }
        printf("  • Element %d appears %d time(s)\n", arr[i], count);
    }

    printf("\nUnique Filtered Elements: [ ");
    for (int i = 0; i < n; i++) {
        if (visited[i] == 0) {
            printf("%d ", arr[i]);
        }
    }
    printf("]\n");

    return 0;
}
