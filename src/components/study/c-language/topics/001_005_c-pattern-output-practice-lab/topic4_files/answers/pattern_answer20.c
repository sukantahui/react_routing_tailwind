#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Centered Number Pyramid (1 to r and Back)
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int s = 1; s <= (n - r) * 2; s++) printf(" ");
        for (int c = 1; c <= r; c++) printf("%d ", c);
        for (int c = r - 1; c >= 1; c--) printf("%d ", c);
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
