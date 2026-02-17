#include <stdio.h>
int main() {
    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    for (int j = 0; j < 3; j++) {
        int col_sum = 0;
        for (int i = 0; i < 3; i++) 
            col_sum += mat[i][j];
        printf("%d ", col_sum);
    }
    return 0;
}
