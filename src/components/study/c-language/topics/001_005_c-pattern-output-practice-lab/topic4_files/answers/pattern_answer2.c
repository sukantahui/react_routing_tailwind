#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Inverted Right-Angled Star Triangle Pattern
");
    printf("=========================================================

");

    for (int r = n; r >= 1; r--) {
        for (int c = 1; c <= r; c++) {
            printf("* ");
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
