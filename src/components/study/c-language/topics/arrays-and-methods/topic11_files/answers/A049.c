#include <stdio.h>

int main() {
    int a[10][10], r, c;
    printf("Enter rows and cols: ");
    scanf("%d %d", &r, &c);
    printf("Enter matrix:\n");
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    printf("Boundary elements: ");
    for(int i = 0; i < c; i++) printf("%d ", a[0][i]);
    for(int i = 1; i < r; i++) printf("%d ", a[i][c-1]);
    if(r > 1) for(int i = c-2; i >= 0; i--) printf("%d ", a[r-1][i]);
    if(c > 1) for(int i = r-2; i > 0; i--) printf("%d ", a[i][0]);
    printf("\n");
    return 0;
}