#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Butterfly Star Pattern
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= r; c++) printf("*");
        for (int s = 1; s <= 2 * (n - r); s++) printf(" ");
        for (int c = 1; c <= r; c++) printf("*");
        printf("\n");
    }
    for (int r = n - 1; r >= 1; r--) {
        for (int c = 1; c <= r; c++) printf("*");
        for (int s = 1; s <= 2 * (n - r); s++) printf(" ");
        for (int c = 1; c <= r; c++) printf("*");
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
