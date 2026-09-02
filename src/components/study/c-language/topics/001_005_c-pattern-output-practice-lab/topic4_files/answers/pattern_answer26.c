#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: 2D Checkerboard / Chessboard Grid Pattern
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= n; c++) {
            printf("%c ", (r + c) % 2 == 0 ? 'W' : 'B');
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
