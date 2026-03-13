#include <stdio.h>

int main() {
    int a[10][10], r, c, zero = 0;
    printf("Enter rows and cols: ");
    scanf("%d %d", &r, &c);
    printf("Enter matrix:\n");
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++) {
            scanf("%d", &a[i][j]);
            if(a[i][j] == 0) zero++;
        }
    if(zero > (r*c)/2)
        printf("Matrix is sparse.\n");
    else
        printf("Matrix is not sparse.\n");
    return 0;
}