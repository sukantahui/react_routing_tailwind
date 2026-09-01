#include <stdio.h>

int main() {
    int a[10][10], r, c;
    printf("Enter rows and cols: ");
    scanf("%d %d", &r, &c);
    printf("Enter matrix:\n");
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    printf("Row sums: ");
    for(int i = 0; i < r; i++) {
        int sum = 0;
        for(int j = 0; j < c; j++)
            sum += a[i][j];
        printf("Row%d=%d ", i, sum);
    }
    printf("\n");
    return 0;
}