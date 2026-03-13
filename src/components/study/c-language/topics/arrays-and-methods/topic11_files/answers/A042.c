#include <stdio.h>

int main() {
    int a[10][10], n;
    printf("Enter order: ");
    scanf("%d", &n);
    printf("Enter matrix:\n");
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    // transpose
    for(int i = 0; i < n; i++) {
        for(int j = i+1; j < n; j++) {
            int temp = a[i][j];
            a[i][j] = a[j][i];
            a[j][i] = temp;
        }
    }
    // reverse each row
    for(int i = 0; i < n; i++) {
        for(int j = 0, k = n-1; j < k; j++, k--) {
            int temp = a[i][j];
            a[i][j] = a[i][k];
            a[i][k] = temp;
        }
    }
    printf("Rotated matrix:\n");
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++)
            printf("%d ", a[i][j]);
        printf("\n");
    }
    return 0;
}