#include <stdio.h>

int main() {
    int a[10][10], n, lower = 1;
    printf("Enter order: ");
    scanf("%d", &n);
    printf("Enter matrix:\n");
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    for(int i = 0; i < n && lower; i++) {
        for(int j = i+1; j < n; j++) {
            if(a[i][j] != 0) {
                lower = 0;
                break;
            }
        }
    }
    if(lower) printf("Matrix is lower triangular.\n");
    else printf("Matrix is not lower triangular.\n");
    return 0;
}