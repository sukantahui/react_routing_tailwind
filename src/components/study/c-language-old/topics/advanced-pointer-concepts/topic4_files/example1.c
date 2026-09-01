#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3, cols = 4;
    
    printf("=== Basic Dynamic 2D Array Allocation ===\n");
    
    // Step 1: Allocate array of row pointers
    int **matrix = (int**)malloc(rows * sizeof(int*));
    if (matrix == NULL) {
        printf("Failed to allocate row pointers!\n");
        return 1;
    }
    
    // Step 2: Allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) {
            printf("Failed to allocate row %d!\n", i);
            // Clean up previously allocated rows
            for (int j = 0; j < i; j++) {
                free(matrix[j]);
            }
            free(matrix);
            return 1;
        }
        
        // Initialize row with values
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = (i + 1) * (j + 1);  // Multiplication table
        }
    }
    
    // Print the matrix
    printf("\nAllocated %d x %d matrix:\n", rows, cols);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d ", matrix[i][j]);
        }
        printf("\n");
    }
    
    // Print memory addresses to show non-contiguous layout
    printf("\nMemory layout (addresses):\n");
    for (int i = 0; i < rows; i++) {
        printf("Row %d starts at: %p\n", i, (void*)matrix[i]);
    }
    
    // Step 3: Free memory (reverse order!)
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
    matrix = NULL;  // Prevent dangling pointer
    
    printf("\nMemory freed successfully!\n");
    
    return 0;
}