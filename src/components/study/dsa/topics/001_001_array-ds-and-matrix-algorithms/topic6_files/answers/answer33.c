#include <stdio.h>
#include <stdlib.h>

#define R 4
#define C 4

typedef struct {
    int *values;
    int *col_index;
    int *row_ptr;
    int nnz;
} CSRMatrix;

CSRMatrix* create_csr(int dense[R][C]) {
    int nnz = 0;
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            if (dense[i][j] != 0) nnz++;
        }
    }

    CSRMatrix *csr = (CSRMatrix*)malloc(sizeof(CSRMatrix));
    csr->values = (int*)malloc(nnz * sizeof(int));
    csr->col_index = (int*)malloc(nnz * sizeof(int));
    csr->row_ptr = (int*)malloc((R + 1) * sizeof(int));
    csr->nnz = nnz;

    int idx = 0;
    csr->row_ptr[0] = 0;

    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            if (dense[i][j] != 0) {
                csr->values[idx] = dense[i][j];
                csr->col_index[idx] = j;
                idx++;
            }
        }
        csr->row_ptr[i + 1] = idx;
    }
    return csr;
}

void spmv(CSRMatrix *csr, int x[], int y[]) {
    for (int i = 0; i < R; i++) {
        y[i] = 0;
        for (int k = csr->row_ptr[i]; k < csr->row_ptr[i + 1]; k++) {
            y[i] += csr->values[k] * x[csr->col_index[k]];
        }
    }
}

int main() {
    int dense[R][C] = {
        {10, 0, 0, 0},
        {0, 20, 0, 0},
        {0, 0, 30, 40},
        {0, 0, 0, 50}
    };
    int x[C] = {1, 2, 3, 4};
    int y[R];

    CSRMatrix *csr = create_csr(dense);

    printf("--- Compressed Sparse Row (CSR) Engine ---\nNon-Zero Elements (NNZ): %d\n", csr->nnz);
    spmv(csr, x, y);

    printf("Sparse Matrix-Vector Multiplication Y = A * X:\nResult Vector Y: [ ");
    for (int i = 0; i < R; i++) {
        printf("%d ", y[i]);
    }
    printf("]\n");

    free(csr->values);
    free(csr->col_index);
    free(csr->row_ptr);
    free(csr);

    return 0;
}
