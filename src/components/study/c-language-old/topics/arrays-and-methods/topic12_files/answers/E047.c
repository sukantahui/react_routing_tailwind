#include <stdio.h>

void generateMatrix(int n, int matrix[][100]) {
    int num = 1;
    int top = 0, bottom = n - 1, left = 0, right = n - 1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) matrix[top][i] = num++;
        top++;
        for (int i = top; i <= bottom; i++) matrix[i][right] = num++;
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) matrix[bottom][i] = num++;
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) matrix[i][left] = num++;
            left++;
        }
    }
}

int main() {
    int n, matrix[100][100];
    printf("Enter n: ");
    scanf("%d", &n);

    generateMatrix(n, matrix);

    printf("Generated spiral matrix:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            printf("%d ", matrix[i][j]);
        printf("\n");
    }
    return 0;
}