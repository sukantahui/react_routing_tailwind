#include <stdio.h>
#include <stdlib.h>

/**
 * Project 1: Dynamic 2D Matrix Memory Allocator & Deallocator
 * Allocates, initializes, and safely deallocates an R x C matrix on the heap via double pointers.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int **createMatrix(int rows, int cols) {
    int **mat = (int**)malloc(rows * sizeof(int*));
    if (mat == NULL) return NULL;

    for (int i = 0; i < rows; i++) {
        mat[i] = (int*)malloc(cols * sizeof(int));
        if (mat[i] == NULL) {
            // Rollback previously allocated rows on failure
            for (int k = 0; k < i; k++) free(mat[k]);
            free(mat);
            return NULL;
        }
    }
    return mat;
}

void freeMatrix(int ***pMat, int rows) {
    if (pMat == NULL || *pMat == NULL) return;
    for (int i = 0; i < rows; i++) {
        free((*pMat)[i]);
        (*pMat)[i] = NULL;
    }
    free(*pMat);
    *pMat = NULL; // Zero out caller's pointer!
}

int main(void) {
    int r = 3, c = 4;
    int **matrix = createMatrix(r, c);

    if (matrix != NULL) {
        printf("Dynamic %dx%d Matrix Created on Heap:\n", r, c);
        for (int i = 0; i < r; i++) {
            printf("  [ ");
            for (int j = 0; j < c; j++) {
                matrix[i][j] = (i + 1) * 10 + (j + 1);
                printf("%2d ", matrix[i][j]);
            }
            printf("]\n");
        }

        // Safely free matrix and zero caller pointer via triple pointer
        freeMatrix(&matrix, r);
        printf("\n✓ Matrix memory completely deallocated. Pointer is now: %p\n", (void*)matrix);
    }

    return 0;
}
