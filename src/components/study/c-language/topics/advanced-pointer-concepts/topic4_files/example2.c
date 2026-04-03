#include <stdio.h>
#include <stdlib.h>

// Function that allocates a 2D array using double pointer parameter
int** allocate2DArray(int rows, int cols) {
    int **matrix = (int**)malloc(rows * sizeof(int*));
    if (matrix == NULL) {
        return NULL;
    }
    
    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)malloc(cols * sizeof(int));
        if (matrix[i] == NULL) {
            // Clean up on failure
            for (int j = 0; j < i; j++) {
                free(matrix[j]);
            }
            free(matrix);
            return NULL;
        }
        
        // Initialize with zeros
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }
    
    return matrix;
}

// Function to fill matrix with student scores (Barrackpore CNAT example)
void fillStudentScores(int **matrix, int rows, int cols) {
    int student_scores[][4] = {
        {85, 90, 78, 92},   // Student 0
        {88, 76, 95, 89},   // Student 1
        {91, 84, 87, 93}    // Student 2
    };
    
    for (int i = 0; i < rows && i < 3; i++) {
        for (int j = 0; j < cols && j < 4; j++) {
            matrix[i][j] = student_scores[i][j];
        }
    }
}

// Function to print matrix
void printMatrix(int **matrix, int rows, int cols, const char *title) {
    printf("\n%s (%d x %d):\n", title, rows, cols);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d ", matrix[i][j]);
        }
        printf("\n");
    }
}

// Function to free 2D array
void free2DArray(int **matrix, int rows) {
    if (matrix == NULL) return;
    
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
}

int main() {
    int rows = 3, cols = 4;
    
    printf("=== Allocation Function Using Double Pointer ===\n");
    
    int **scores = allocate2DArray(rows, cols);
    if (scores == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    fillStudentScores(scores, rows, cols);
    printMatrix(scores, rows, cols, "Student Scores Matrix");
    
    // Calculate class average
    int total = 0;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            total += scores[i][j];
        }
    }
    printf("\nClass Average: %.2f\n", (double)total / (rows * cols));
    
    free2DArray(scores, rows);
    printf("\nMemory freed successfully!\n");
    
    return 0;
}