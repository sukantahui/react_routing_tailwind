#include <stdio.h>

int main() {
    int a[10][10], n, upper = 1;
    printf("Enter order: ");
    scanf("%d", &n);
    printf("Enter matrix:\n");
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    for(int i = 1; i < n && upper; i++) {
        for(int j = 0; j < i; j++) {
            if(a[i][j] != 0) {
                upper = 0;
                break;
            }
        }
    }
    if(upper) printf("Matrix is upper triangular.\n");
    else printf("Matrix is not upper triangular.\n");
    return 0;
}