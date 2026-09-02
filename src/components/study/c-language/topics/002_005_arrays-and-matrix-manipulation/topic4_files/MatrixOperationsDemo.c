#include <stdio.h>

/**
 * MatrixOperationsDemo.c
 * Demonstrates 2D array row-major memory mapping, matrix addition,
 * matrix transposition, and matrix multiplication in C.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

#define ROWS 3
#define COLS 3

void printMatrix(const char *name, int matrix[ROWS][COLS]) {
    printf("Matrix %s (%dx%d):\n", name, ROWS, COLS);
    for (int i = 0; i < ROWS; i++) {
        printf("  [ ");
        for (int j = 0; j < COLS; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("]\n");
    }
    printf("\n");
}

// 1. Matrix Addition: C[i][j] = A[i][j] + B[i][j]
void addMatrices(int A[ROWS][COLS], int B[ROWS][COLS], int result[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            result[i][j] = A[i][j] + B[i][j];
        }
    }
}

// 2. Matrix Transpose: T[j][i] = A[i][j]
void transposeMatrix(int A[ROWS][COLS], int transpose[COLS][ROWS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            transpose[j][i] = A[i][j];
        }
    }
}

// 3. Matrix Multiplication: C[i][j] = sum(A[i][k] * B[k][j])
void multiplyMatrices(int A[ROWS][COLS], int B[ROWS][COLS], int product[ROWS][COLS]) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            product[i][j] = 0;
            for (int k = 0; k < COLS; k++) {
                product[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

int main(void) {
    int A[ROWS][COLS] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    int B[ROWS][COLS] = {
        {9, 8, 7},
        {6, 5, 4},
        {3, 2, 1}
    };

    int sum[ROWS][COLS];
    int trans[COLS][ROWS];
    int prod[ROWS][COLS];

    printf("====================================================\n");
    printf(" 2D Arrays & Matrix Algebra Operations in C\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    // Inspect Row-Major Physical Memory Addresses
    printf("🔍 Physical Row-Major Memory Inspection for Matrix A:\n");
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            printf("  A[%d][%d] = %d at address %p (Offset: %td bytes)\n",
                   i, j, A[i][j], (void*)&A[i][j], 
                   (char*)&A[i][j] - (char*)&A[0][0]);
        }
    }
    printf("\n");

    printMatrix("A", A);
    printMatrix("B", B);

    // 1. Matrix Addition
    addMatrices(A, B, sum);
    printMatrix("Sum (A + B)", sum);

    // 2. Matrix Transposition
    transposeMatrix(A, trans);
    printMatrix("Transpose of A", trans);

    // 3. Matrix Multiplication
    multiplyMatrices(A, B, prod);
    printMatrix("Product (A * B)", prod);

    return 0;
}
