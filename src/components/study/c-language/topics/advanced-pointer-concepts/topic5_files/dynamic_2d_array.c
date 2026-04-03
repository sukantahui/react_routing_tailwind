#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3;
    int cols[] = {2, 4, 3};  // jagged: each row has different columns
    
    // Step 1: allocate array of row pointers
    int **matrix = (int**)malloc(rows * sizeof(int*));
    
    // Step 2: allocate each row
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols[i] * sizeof(int));
        // fill with some values
        for (int j = 0; j < cols[i]; j++)
            matrix[i][j] = i * 10 + j;
    }
    
    // Print jagged array
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols[i]; j++)
            printf("%2d ", matrix[i][j]);
        printf("\n");
    }
    
    // Step 3: free in reverse order
    for (int i = 0; i < rows; i++)
        free(matrix[i]);
    free(matrix);
    
    return 0;
}