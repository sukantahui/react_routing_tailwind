#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Floyd's Triangle of Natural Numbers
");
    printf("=========================================================

");

    int num = 1;
    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= r; c++) printf("%-2d ", num++);
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
