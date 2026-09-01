#include <stdio.h>

int main() {
    int a[10][10], r, c;
    printf("Enter rows and cols: ");
    scanf("%d %d", &r, &c);
    printf("Enter binary matrix row-wise:\n");
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    int maxRow = -1, maxCount = -1;
    for(int i = 0; i < r; i++) {
        int count = 0;
        for(int j = 0; j < c; j++) {
            if(a[i][j] == 1) count++;
        }
        if(count > maxCount) {
            maxCount = count;
            maxRow = i;
        }
    }
    printf("Row %d has maximum 1's (%d).\n", maxRow, maxCount);
    return 0;
}