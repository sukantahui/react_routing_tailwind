#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Right-Angled Number Triangle (1 to r per row)
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= r; c++) printf("%d ", c);
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
