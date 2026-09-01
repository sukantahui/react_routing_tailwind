#include <stdio.h>
#include <stdlib.h>

int** generate(int numRows, int* returnSize, int** returnColumnSizes) {
    *returnSize = numRows;
    int **res = (int**)malloc(numRows * sizeof(int*));
    *returnColumnSizes = (int*)malloc(numRows * sizeof(int));
    for (int i = 0; i < numRows; i++) {
        (*returnColumnSizes)[i] = i+1;
        res[i] = (int*)malloc((i+1) * sizeof(int));
        res[i][0] = res[i][i] = 1;
        for (int j = 1; j < i; j++)
            res[i][j] = res[i-1][j-1] + res[i-1][j];
    }
    return res;
}

int main() {
    int numRows;
    printf("Enter number of rows: ");
    scanf("%d", &numRows);
    int returnSize;
    int *colSizes;
    int **triangle = generate(numRows, &returnSize, &colSizes);
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < colSizes[i]; j++)
            printf("%d ", triangle[i][j]);
        printf("\n");
        free(triangle[i]);
    }
    free(triangle);
    free(colSizes);
    return 0;
}
