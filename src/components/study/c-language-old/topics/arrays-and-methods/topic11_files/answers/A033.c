#include <stdio.h>

int main() {
    int a[10][10], trans[10][10], r, c;
    printf("Enter rows and cols: ");
    scanf("%d %d", &r, &c);
    printf("Enter matrix:\n");
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++)
            trans[j][i] = a[i][j];
    printf("Transpose:\n");
    for(int i = 0; i < c; i++) {
        for(int j = 0; j < r; j++)
            printf("%d ", trans[i][j]);
        printf("\n");
    }
    return 0;
}