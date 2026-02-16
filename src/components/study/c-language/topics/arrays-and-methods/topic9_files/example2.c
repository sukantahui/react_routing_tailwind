#include <stdio.h>

int main() {
    int matrix[2][3] = {{1,2,3}, {4,5,6}};

    // matrix (without index) decays to pointer to first row
    int (*rowptr)[3] = matrix;  // rowptr is a pointer to an array of 3 ints

    printf("matrix = %p\n", (void*)matrix);
    printf("matrix + 1 = %p\n", (void*)(matrix + 1));
    printf("Difference = %ld bytes (size of one row: 3 * %zu = %zu)\n",
           (char*)(matrix+1) - (char*)matrix, sizeof(int), 3 * sizeof(int));

    // Accessing elements via pointer arithmetic
    printf("\nElement [1][2] via pointer arithmetic:\n");
    printf("matrix[1][2] = %d\n", matrix[1][2]);
    printf("*(*(matrix + 1) + 2) = %d\n", *(*(matrix + 1) + 2));

    return 0;
}