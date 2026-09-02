#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Right-Angled Alphabet Triangle (A to Z)
");
    printf("=========================================================

");

    for (int r = 1; r <= n; r++) {
        for (int c = 0; c < r; c++) printf("%c ", 'A' + c);
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
