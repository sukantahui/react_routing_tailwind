#include <stdio.h>

int main() {
    int a[10][10], n, sym = 1;
    printf("Enter order of matrix: ");
    scanf("%d", &n);
    printf("Enter matrix:\n");
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    for(int i = 0; i < n && sym; i++) {
        for(int j = 0; j < n; j++) {
            if(a[i][j] != a[j][i]) {
                sym = 0;
                break;
            }
        }
    }
    if(sym) printf("Matrix is symmetric.\n");
    else printf("Matrix is not symmetric.\n");
    return 0;
}