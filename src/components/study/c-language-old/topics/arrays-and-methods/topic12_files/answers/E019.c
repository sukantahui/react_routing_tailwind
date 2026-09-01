#include <stdio.h>

int main() {
    int numRows;
    printf("Enter number of rows: ");
    scanf("%d", &numRows);

    int triangle[100][100];
    for (int i = 0; i < numRows; i++) {
        triangle[i][0] = triangle[i][i] = 1;
        for (int j = 1; j < i; j++) {
            triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }
    }

    printf("Pascal's triangle:\n");
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j <= i; j++)
            printf("%d ", triangle[i][j]);
        printf("\n");
    }
    return 0;
}