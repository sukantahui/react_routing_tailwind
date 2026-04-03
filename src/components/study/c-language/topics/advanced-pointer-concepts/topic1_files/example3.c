#include <stdio.h>
#include <stdlib.h>

int** create2DArray(int rows, int cols) {
    // Allocate array of row pointers
    int **array = (int**)malloc(rows * sizeof(int*));
    if (array == NULL) {
        printf("Memory allocation failed for rows!\n");
        return NULL;
    }
    
    // Allocate each row
    for (int i = 0; i < rows; i++) {
        array[i] = (int*)malloc(cols * sizeof(int));
        if (array[i] == NULL) {
            printf("Memory allocation failed for row %d!\n", i);
            // Free previously allocated rows
            for (int j = 0; j < i; j++) {
                free(array[j]);
            }
            free(array);
            return NULL;
        }
        
        // Initialize row with values
        for (int j = 0; j < cols; j++) {
            array[i][j] = (i + 1) * (j + 1);  // Multiplication table
        }
    }
    
    return array;
}

void print2DArray(int **array, int rows, int cols) {
    printf("\n2D Array Contents:\n");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d ", array[i][j]);
        }
        printf("\n");
    }
}

void free2DArray(int **array, int rows) {
    if (array == NULL) return;
    
    // Free each row first
    for (int i = 0; i < rows; i++) {
        free(array[i]);
    }
    // Free the array of row pointers
    free(array);
}

int main() {
    int rows = 4, cols = 5;
    
    printf("=== Dynamic 2D Array with Double Pointers ===\n");
    printf("Creating %d x %d array...\n", rows, cols);
    
    int **matrix = create2DArray(rows, cols);
    if (matrix == NULL) {
        return 1;
    }
    
    print2DArray(matrix, rows, cols);
    
    // Access using double pointer notation
    printf("\nAccessing element [2][3]: %d\n", matrix[2][3]);
    printf("Accessing using pointer arithmetic: %d\n", *(*(matrix + 2) + 3));
    
    free2DArray(matrix, rows);
    printf("\nMemory freed successfully!\n");
    
    return 0;
}