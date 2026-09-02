#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Snake / Zig-Zag Matrix Number Pattern
");
    printf("=========================================================

");

    int num = 1;
    for (int r = 1; r <= 4; r++) {
        if (r % 2 != 0) {
            for (int c = 1; c <= 4; c++) printf("%2d ", num++);
        } else {
            int temp = num + 4 - 1;
            for (int c = 1; c <= 4; c++) printf("%2d ", temp--);
            num += 4;
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
