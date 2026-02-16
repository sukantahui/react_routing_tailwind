#include <stdio.h>

int main() {
    int a[10][10], r, c;
    printf("Enter rows and cols: ");
    scanf("%d %d", &r, &c);
    printf("Enter matrix:\n");
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    printf("Column sums: ");
    for(int j = 0; j < c; j++) {
        int sum = 0;
        for(int i = 0; i < r; i++)
            sum += a[i][j];
        printf("Col%d=%d ", j, sum);
    }
    printf("\n");
    return 0;
}