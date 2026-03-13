#include <stdio.h>

int main() {
    int a[10][10], r, c;
    printf("Enter rows and cols: ");
    scanf("%d %d", &r, &c);
    printf("Enter matrix:\n");
    for(int i = 0; i < r; i++)
        for(int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    int found = 0;
    for(int i = 0; i < r && !found; i++) {
        for(int j = 0; j < c; j++) {
            int val = a[i][j];
            int left = (j>0) ? a[i][j-1] : -1;
            int right = (j<c-1) ? a[i][j+1] : -1;
            int up = (i>0) ? a[i-1][j] : -1;
            int down = (i<r-1) ? a[i+1][j] : -1;
            if(val >= left && val >= right && val >= up && val >= down) {
                printf("Peak element found: %d at (%d,%d)\n", val, i, j);
                found = 1;
                break;
            }
        }
    }
    if(!found) printf("No peak element found.\n");
    return 0;
}