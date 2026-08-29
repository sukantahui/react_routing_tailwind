#include <stdio.h>
#include <stdlib.h>

#define MAX_TERMS 101

// ============================================================================
// CODER & ACCOTAX BARRACKPORE LAB - C DATA STRUCTURES & ALGORITHMS
// Topic 3: Sparse Matrix Representation (3-Tuple) & Fast Transpose Algorithm
// ============================================================================

// 3-Tuple (Triplet) structure representing non-zero elements
typedef struct {
    int row;
    int col;
    int val;
} Term;

// Print a 3-Tuple Sparse Matrix
void printSparse(Term a[]) {
    int n = a[0].val;
    printf("\n=== 3-Tuple (COO) Array Representation ===\n");
    printf("Total Dimensions: %d Rows x %d Cols | Non-Zero Count: %d\n", a[0].row, a[0].col, a[0].val);
    printf("-----------------------------------------\n");
    printf("Index |   Row   |   Col   |    Value     \n");
    printf("-----------------------------------------\n");
    printf(" [0]  | %5d   | %5d   | %6d (Header)\n", a[0].row, a[0].col, a[0].val);
    for (int i = 1; i <= n; i++) {
        printf(" [%d]  | %5d   | %5d   | %6d\n", i, a[i].row, a[i].col, a[i].val);
    }
    printf("-----------------------------------------\n\n");
}

// Reconstruct and print 2D Dense Matrix from 3-Tuple representation
void printDenseMatrix(Term a[], const char *title) {
    int rows = a[0].row;
    int cols = a[0].col;
    int n = a[0].val;

    printf("=== %s (%d x %d Matrix) ===\n", title, rows, cols);
    int currentTerm = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (currentTerm <= n && a[currentTerm].row == i && a[currentTerm].col == j) {
                printf("%4d ", a[currentTerm].val);
                currentTerm++;
            } else {
                printf("%4d ", 0);
            }
        }
        printf("\n");
    }
    printf("\n");
}

// 1. Simple Transpose Algorithm: O(Cols * NonZeroCount)
void simpleTranspose(Term a[], Term b[]) {
    int numCols = a[0].col;
    int numTerms = a[0].val;

    b[0].row = a[0].col;
    b[0].col = a[0].row;
    b[0].val = numTerms;

    if (numTerms > 0) {
        int currentB = 1;
        // Outer loop scans for every column 0, 1, 2, ..., numCols - 1
        for (int c = 0; c < numCols; c++) {
            // Inner loop scans through all non-zero terms
            for (int i = 1; i <= numTerms; i++) {
                if (a[i].col == c) {
                    b[currentB].row = a[i].col;
                    b[currentB].col = a[i].row;
                    b[currentB].val = a[i].val;
                    currentB++;
                }
            }
        }
    }
    printf("[SIMPLE TRANSPOSE] Executed in O(Cols * NonZero) = O(%d * %d) passes.\n", numCols, numTerms);
}

// 2. Fast Transpose Algorithm: O(Cols + NonZeroCount)
void fastTranspose(Term a[], Term b[]) {
    int numCols = a[0].col;
    int numTerms = a[0].val;

    b[0].row = a[0].col;
    b[0].col = a[0].row;
    b[0].val = numTerms;

    if (numTerms <= 0) return;

    int *total = (int *)calloc(numCols, sizeof(int));
    int *starting_pos = (int *)calloc(numCols, sizeof(int));

    // Step 1: Count occurrences of each column index in a[] -> O(numTerms)
    for (int i = 1; i <= numTerms; i++) {
        total[a[i].col]++;
    }

    printf("\n[FAST TRANSPOSE STEP 1] Column Frequency Counts (total[col]):\n");
    for (int c = 0; c < numCols; c++) {
        printf("  total[col %d] = %d\n", c, total[c]);
    }

    // Step 2: Compute Starting Positions using Prefix Sum -> O(numCols)
    starting_pos[0] = 1;
    for (int c = 1; c < numCols; c++) {
        starting_pos[c] = starting_pos[c - 1] + total[c - 1];
    }

    printf("\n[FAST TRANSPOSE STEP 2] Prefix-Sum Starting Positions (starting_pos[col]):\n");
    for (int c = 0; c < numCols; c++) {
        printf("  starting_pos[col %d] = Index %d\n", c, starting_pos[c]);
    }

    // Step 3: Single-Pass Direct Migration -> O(numTerms)
    printf("\n[FAST TRANSPOSE STEP 3] Single-Pass Migration Trace:\n");
    for (int i = 1; i <= numTerms; i++) {
        int col = a[i].col;
        int targetIndex = starting_pos[col];

        b[targetIndex].row = a[i].col;
        b[targetIndex].col = a[i].row;
        b[targetIndex].val = a[i].val;

        printf("  Term #%d (val=%d at [%d,%d]) -> Target Slot b[%d] = [%d,%d,%d]\n",
               i, a[i].val, a[i].row, a[i].col, targetIndex, b[targetIndex].row, b[targetIndex].col, b[targetIndex].val);

        starting_pos[col]++; // Advance pointer for next element with same column
    }

    // Clean up auxiliary arrays
    free(total);
    free(starting_pos);

    printf("\n[FAST TRANSPOSE COMPLETE] Transposition finished in O(Cols + NonZero) = O(%d + %d) linear time!\n\n",
           numCols, numTerms);
}

int main() {
    printf("========================================================\n");
    printf("  CODER & ACCOTAX - SPARSE MATRIX & FAST TRANSPOSE LAB\n");
    printf("  Mentor: Sukanta Hui · Barrackpore, West Bengal\n");
    printf("========================================================\n\n");

    // Initialize 4x5 Sparse Matrix in 3-Tuple Form
    // Index 0: Header (4 rows, 5 cols, 5 non-zero elements)
    Term sparseA[MAX_TERMS] = {
        {4, 5, 5},
        {0, 1, 10},
        {1, 2, 20},
        {2, 4, 30},
        {3, 0, 40},
        {3, 3, 50}
    };

    // Print Original Sparse Matrix
    printDenseMatrix(sparseA, "Original 2D Dense Matrix A");
    printSparse(sparseA);

    // Perform Simple Transpose
    Term simpleTransposedB[MAX_TERMS];
    simpleTranspose(sparseA, simpleTransposedB);

    // Perform Fast Transpose
    Term fastTransposedB[MAX_TERMS];
    fastTranspose(sparseA, fastTransposedB);

    // Print Resulting Transposed Matrix
    printDenseMatrix(fastTransposedB, "Transposed 2D Dense Matrix A^T (5 x 4)");
    printSparse(fastTransposedB);

    return 0;
}
