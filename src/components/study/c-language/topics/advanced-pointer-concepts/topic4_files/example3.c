#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Jagged array: each row has different number of columns
int** createJaggedArray(int rows, int *colSizes) {
    int **jagged = (int**)malloc(rows * sizeof(int*));
    if (jagged == NULL) return NULL;
    
    for (int i = 0; i < rows; i++) {
        jagged[i] = (int*)malloc(colSizes[i] * sizeof(int));
        if (jagged[i] == NULL) {
            // Cleanup on failure
            for (int j = 0; j < i; j++) {
                free(jagged[j]);
            }
            free(jagged);
            return NULL;
        }
        
        // Initialize with sequential values
        for (int j = 0; j < colSizes[i]; j++) {
            jagged[i][j] = (i + 1) * 100 + j;
        }
    }
    
    return jagged;
}

void printJaggedArray(int **jagged, int rows, int *colSizes) {
    printf("\nJagged Array Contents:\n");
    for (int i = 0; i < rows; i++) {
        printf("Row %d (%d cols): ", i, colSizes[i]);
        for (int j = 0; j < colSizes[i]; j++) {
            printf("%d ", jagged[i][j]);
        }
        printf("\n");
    }
}

void freeJaggedArray(int **jagged, int rows) {
    if (jagged == NULL) return;
    
    for (int i = 0; i < rows; i++) {
        free(jagged[i]);
    }
    free(jagged);
}

int main() {
    printf("=== Jagged Arrays (Rows with Different Lengths) ===\n");
    
    // Example: Course enrollments at Naihati CNAT
    // Different courses have different number of students
    int rows = 5;
    int colSizes[] = {3, 5, 2, 4, 6};  // Students per course
    
    int **enrollments = createJaggedArray(rows, colSizes);
    if (enrollments == NULL) {
        printf("Failed to create jagged array!\n");
        return 1;
    }
    
    printJaggedArray(enrollments, rows, colSizes);
    
    // Demonstrate memory savings
    int regularSize = rows * 6 * sizeof(int);  // If all rows had 6 cols
    int jaggedSize = 0;
    for (int i = 0; i < rows; i++) {
        jaggedSize += colSizes[i] * sizeof(int);
    }
    jaggedSize += rows * sizeof(int*);  // Add row pointers
    
    printf("\nMemory Comparison:\n");
    printf("Regular 2D array (6 cols each): %d bytes\n", regularSize);
    printf("Jagged array (variable cols): %d bytes\n", jaggedSize);
    printf("Memory saved: %d bytes\n", regularSize - jaggedSize);
    
    freeJaggedArray(enrollments, rows);
    
    return 0;
}