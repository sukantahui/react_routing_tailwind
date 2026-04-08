#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure to hold dynamic 2D array metadata
typedef struct {
    int **data;
    int rows;
    int cols;
} Matrix;

// Initialize matrix
Matrix* createMatrix(int rows, int cols) {
    Matrix *mat = (Matrix*)malloc(sizeof(Matrix));
    if (mat == NULL) return NULL;
    
    mat->data = (int**)malloc(rows * sizeof(int*));
    if (mat->data == NULL) {
        free(mat);
        return NULL;
    }
    
    for (int i = 0; i < rows; i++) {
        mat->data[i] = (int*)calloc(cols, sizeof(int));
        if (mat->data[i] == NULL) {
            for (int j = 0; j < i; j++) free(mat->data[j]);
            free(mat->data);
            free(mat);
            return NULL;
        }
    }
    
    mat->rows = rows;
    mat->cols = cols;
    return mat;
}

// Resize matrix - add rows and/or columns
int resizeMatrix(Matrix **mat, int newRows, int newCols) {
    if (mat == NULL || *mat == NULL) return -1;
    
    Matrix *oldMat = *mat;
    
    // Create new matrix
    Matrix *newMat = createMatrix(newRows, newCols);
    if (newMat == NULL) return -1;
    
    // Copy old data
    int copyRows = (oldMat->rows < newRows) ? oldMat->rows : newRows;
    int copyCols = (oldMat->cols < newCols) ? oldMat->cols : newCols;
    
    for (int i = 0; i < copyRows; i++) {
        for (int j = 0; j < copyCols; j++) {
            newMat->data[i][j] = oldMat->data[i][j];
        }
    }
    
    // Free old matrix
    for (int i = 0; i < oldMat->rows; i++) {
        free(oldMat->data[i]);
    }
    free(oldMat->data);
    free(oldMat);
    
    *mat = newMat;
    return 0;
}

// Add a new row to existing matrix
int addRow(Matrix **mat) {
    if (mat == NULL || *mat == NULL) return -1;
    
    Matrix *oldMat = *mat;
    int newRows = oldMat->rows + 1;
    
    // Reallocate row pointers array
    int **newData = (int**)realloc(oldMat->data, newRows * sizeof(int*));
    if (newData == NULL) return -1;
    
    // Allocate new row
    newData[oldMat->rows] = (int*)calloc(oldMat->cols, sizeof(int));
    if (newData[oldMat->rows] == NULL) return -1;
    
    oldMat->data = newData;
    oldMat->rows = newRows;
    
    return 0;
}

void printMatrix(Matrix *mat, const char *title) {
    printf("\n%s (%d x %d):\n", title, mat->rows, mat->cols);
    for (int i = 0; i < mat->rows; i++) {
        for (int j = 0; j < mat->cols; j++) {
            printf("%4d ", mat->data[i][j]);
        }
        printf("\n");
    }
}

void freeMatrix(Matrix *mat) {
    if (mat == NULL) return;
    
    for (int i = 0; i < mat->rows; i++) {
        free(mat->data[i]);
    }
    free(mat->data);
    free(mat);
}

int main() {
    printf("=== Resizing Dynamic 2D Arrays ===\n");
    
    // Create initial 3x3 matrix
    Matrix *mat = createMatrix(3, 3);
    if (mat == NULL) {
        printf("Failed to create matrix!\n");
        return 1;
    }
    
    // Fill with initial values
    for (int i = 0; i < mat->rows; i++) {
        for (int j = 0; j < mat->cols; j++) {
            mat->data[i][j] = i * mat->cols + j + 1;
        }
    }
    
    printMatrix(mat, "Original Matrix");
    
    // Resize to 4x5
    printf("\nResizing to 4x5...");
    resizeMatrix(&mat, 4, 5);
    printMatrix(mat, "After Resize to 4x5");
    
    // Add a new row
    printf("\nAdding a new row...");
    addRow(&mat);
    
    // Fill new row with values
    for (int j = 0; j < mat->cols; j++) {
        mat->data[mat->rows - 1][j] = 999;
    }
    printMatrix(mat, "After Adding Row");
    
    freeMatrix(mat);
    printf("\nMemory freed successfully!\n");
    
    return 0;
}