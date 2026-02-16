#include <stdio.h>

int main() {
    int numbers[] = {4, 7, 2, 7, 9, 4, 3};
    int n = sizeof(numbers) / sizeof(numbers[0]);

    printf("Finding duplicate values (using nested loops):\n");
    // Compare each element with every later element
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (numbers[i] == numbers[j]) {
                printf("Duplicate found: %d at indices %d and %d\n", numbers[i], i, j);
            }
        }
    }

    // Nested loops can also be used to print a pattern or process 2D-like data
    printf("\nPrint index pairs (i, j) with i < j:\n");
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            printf("(%d,%d) ", i, j);
        }
    }
    printf("\n");

    return 0;
}