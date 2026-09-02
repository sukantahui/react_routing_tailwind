#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Right-Aligned Star Triangle Pattern
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int s = 1; s <= (n - r) * 2; s++) printf(" ");
        for (int c = 1; c <= r; c++) printf("* ");
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
