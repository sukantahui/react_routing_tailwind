#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Hollow Star Pyramid Pattern
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int s = 1; s <= n - r; s++) printf(" ");
        for (int k = 1; k <= 2 * r - 1; k++) {
            if (k == 1 || k == 2 * r - 1 || r == n) printf("*");
            else printf(" ");
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
