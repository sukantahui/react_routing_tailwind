#include <stdio.h>
void printMatrix(int mat[][3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++)
            printf("%d ", mat[i][j]);
        printf("\n");
    }
}
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    printMatrix(mat, 3);
    return 0;
}
