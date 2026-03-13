#include <stdio.h>

int main() {
    int a[10][10], n;
    printf("Enter order: ");
    scanf("%d", &n);
    printf("Enter matrix:\n");
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    int sumD1 = 0, sumD2 = 0;
    for(int i = 0; i < n; i++) {
        sumD1 += a[i][i];
        sumD2 += a[i][n-1-i];
    }
    if(sumD1 != sumD2) {
        printf("Not a magic square\n");
        return 0;
    }
    int magic = sumD1;
    for(int i = 0; i < n; i++) {
        int rowSum = 0, colSum = 0;
        for(int j = 0; j < n; j++) {
            rowSum += a[i][j];
            colSum += a[j][i];
        }
        if(rowSum != magic || colSum != magic) {
            printf("Not a magic square\n");
            return 0;
        }
    }
    printf("Matrix is a magic square (sum=%d).\n", magic);
    return 0;
}