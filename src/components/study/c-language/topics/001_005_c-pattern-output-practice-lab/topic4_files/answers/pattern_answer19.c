#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Binary 0-1 Alternating Triangle Pattern
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= r; c++) {
            printf("%d ", (r + c) % 2 == 0 ? 1 : 0);
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
