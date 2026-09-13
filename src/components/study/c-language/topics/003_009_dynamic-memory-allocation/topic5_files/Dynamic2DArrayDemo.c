/**
 * Dynamic2DArrayDemo.c
 * Demonstrates Allocating and Deallocating Dynamic 2D Arrays:
 * 1. Array of Pointers approach (int **matrix)
 * 2. Contiguous Single-Block Flattened approach (int *matrix)
 * 3. Safe row-by-row deallocation sequence
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int rows = 3;
    int cols = 4;

    printf("========================================================\n");
    printf("   CODER & ACCOTAX - DYNAMIC 2D ARRAYS & MATRICES       \n");
    printf("========================================================\n\n");

    // ----------------------------------------------------
    // APPROACH 1: Array of Pointers (Classic int **matrix)
    // ----------------------------------------------------
    printf("--- 1. ARRAY OF POINTERS APPROACH (int **matrix) ---\n");
    
    // Step 1: Allocate array of row pointers
    int **matrix = (int **)malloc(rows * sizeof(int *));
    if (matrix == NULL) {
        fprintf(stderr, "Failed to allocate row pointers!\n");
        return 1;
    }

    // Step 2: Allocate each row individually
    for (int r = 0; r < rows; r++) {
        matrix[r] = (int *)malloc(cols * sizeof(int));
        if (matrix[r] == NULL) {
            fprintf(stderr, "Failed to allocate row %d!\n", r);
            // Clean up already allocated rows before exiting
            for (int k = 0; k < r; k++) free(matrix[k]);
            free(matrix);
            return 1;
        }
    }

    // Step 3: Populate and access with standard matrix[r][c] syntax
    int counter = 10;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            matrix[r][c] = counter++;
        }
    }

    printf("  Populated 3x4 Matrix (matrix[r][c]):\n");
    for (int r = 0; r < rows; r++) {
        printf("  Row %d (at %p): ", r, (void*)matrix[r]);
        for (int c = 0; c < cols; c++) {
            printf("%3d ", matrix[r][c]);
        }
        printf("\n");
    }

    // Step 4: Deallocation in REVERSE order (free rows first, then row pointers)
    for (int r = 0; r < rows; r++) {
        free(matrix[r]);
        matrix[r] = NULL;
    }
    free(matrix);
    matrix = NULL;
    printf("  Approach 1 successfully deallocated row-by-row.\n\n");

    // ----------------------------------------------------
    // APPROACH 2: Contiguous Single-Block (Cache Friendly)
    // ----------------------------------------------------
    printf("--- 2. CONTIGUOUS SINGLE-BLOCK MATRIX (Cache Friendly) ---\n");
    int *flat_matrix = (int *)malloc(rows * cols * sizeof(int));
    if (flat_matrix != NULL) {
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                // Index formula: [r * cols + c]
                flat_matrix[r * cols + c] = (r + 1) * 100 + (c + 1);
            }
        }

        printf("  Flat Contiguous Matrix:\n");
        for (int r = 0; r < rows; r++) {
            printf("  Row %d: ", r);
            for (int c = 0; c < cols; c++) {
                printf("%4d ", flat_matrix[r * cols + c]);
            }
            printf("\n");
        }

        // Single deallocation!
        free(flat_matrix);
        flat_matrix = NULL;
        printf("  Approach 2 freed with a single O(1) free() call.\n");
    }

    printf("========================================================\n");
    return 0;
}
