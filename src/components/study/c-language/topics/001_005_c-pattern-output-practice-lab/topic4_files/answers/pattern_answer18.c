#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Inverted Number Triangle Pattern
");
    printf("=========================================================

");

    for (int r = n; r >= 1; r--) {
        for (int c = 1; c <= r; c++) printf("%d ", c);
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
