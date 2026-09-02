#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Full Symmetrical Star Diamond Pattern
");
    printf("=========================================================

");

    int radius = 4;
    for (int r = 1; r <= radius; r++) {
        for (int s = 1; s <= radius - r; s++) printf(" ");
        for (int k = 1; k <= 2 * r - 1; k++) printf("*");
        printf("\n");
    }
    for (int r = radius - 1; r >= 1; r--) {
        for (int s = 1; s <= radius - r; s++) printf(" ");
        for (int k = 1; k <= 2 * r - 1; k++) printf("*");
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
