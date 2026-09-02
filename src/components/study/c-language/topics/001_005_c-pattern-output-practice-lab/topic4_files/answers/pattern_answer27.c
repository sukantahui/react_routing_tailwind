#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: X-Shape Cross Pattern of Stars
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= n; c++) {
            if (r == c || r + c == n + 1) printf("* ");
            else printf("  ");
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
