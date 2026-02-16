#include <stdio.h>

int main() {
    int a[10][10], b[10][10], mul[10][10] = {0};
    int r1, c1, r2, c2;
    printf("Enter rows and cols of A: ");
    scanf("%d %d", &r1, &c1);
    printf("Enter A:\n");
    for(int i = 0; i < r1; i++)
        for(int j = 0; j < c1; j++)
            scanf("%d", &a[i][j]);
    printf("Enter rows and cols of B: ");
    scanf("%d %d", &r2, &c2);
    if(c1 != r2) {
        printf("Multiplication not possible.\n");
        return 0;
    }
    printf("Enter B:\n");
    for(int i = 0; i < r2; i++)
        for(int j = 0; j < c2; j++)
            scanf("%d", &b[i][j]);
    for(int i = 0; i < r1; i++) {
        for(int j = 0; j < c2; j++) {
            for(int k = 0; k < c1; k++) {
                mul[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    printf("Product:\n");
    for(int i = 0; i < r1; i++) {
        for(int j = 0; j < c2; j++)
            printf("%d ", mul[i][j]);
        printf("\n");
    }
    return 0;
}