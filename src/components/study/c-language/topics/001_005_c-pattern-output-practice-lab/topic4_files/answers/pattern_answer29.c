#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Concentric Number Box Pattern (Spiralling Outer to Inner)
");
    printf("=========================================================

");

    int layer = 3;
    int size = 2 * layer - 1;
    for (int r = 1; r <= size; r++) {
        for (int c = 1; c <= size; c++) {
            int top = r - 1, left = c - 1;
            int bottom = size - r, right = size - c;
            int minDist = top < left ? top : left;
            minDist = minDist < bottom ? minDist : bottom;
            minDist = minDist < right ? minDist : right;
            printf("%d ", layer - minDist);
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
