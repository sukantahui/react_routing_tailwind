#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Plus (+)-Shape Cross Pattern of Stars
");
    printf("=========================================================

");

    int mid = (n + 1) / 2;
    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= n; c++) {
            if (r == mid || c == mid) printf("* ");
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
