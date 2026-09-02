#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Centered Full Isosceles Star Pyramid
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int s = 1; s <= n - r; s++) printf(" ");
        for (int k = 1; k <= 2 * r - 1; k++) printf("*");
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
