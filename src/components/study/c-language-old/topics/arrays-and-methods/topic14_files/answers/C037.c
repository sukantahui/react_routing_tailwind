#include <stdio.h>
int main() {
    int *jagged[3];
    int row1[] = {1, 2};
    int row2[] = {3, 4, 5};
    int row3[] = {6};
    jagged[0] = row1;
    jagged[1] = row2;
    jagged[2] = row3;
    int sizes[] = {2, 3, 1};
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < sizes[i]; j++)
            printf("%d ", jagged[i][j]);
        printf("\n");
    }
    return 0;
}
