#include <stdio.h>
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    for (int i = 0; i < 3; i++) {
        int row_sum = 0;
        for (int j = 0; j < 3; j++) 
            row_sum += mat[i][j];
        printf("%d ", row_sum);
    }
    return 0;
}
