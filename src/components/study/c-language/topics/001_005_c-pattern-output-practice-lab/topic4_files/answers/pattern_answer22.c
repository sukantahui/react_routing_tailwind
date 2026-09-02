#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Continuous Increasing Number Square (N x N)
");
    printf("=========================================================

");

    int num = 1;
    for (int r = 1; r <= 4; r++) {
        for (int c = 1; c <= 4; c++) printf("%2d ", num++);
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
