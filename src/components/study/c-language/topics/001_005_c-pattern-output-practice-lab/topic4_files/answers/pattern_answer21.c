#include <stdio.h>

void executePattern(int n) {
    printf("=========================================================
");
    printf("  PATTERN PROJECT: Pascal's Triangle of Binomial Coefficients
");
    printf("=========================================================

");

    for (int r = 0; r < n; r++) {
        for (int s = 0; s < n - r - 1; s++) printf("  ");
        int val = 1;
        for (int k = 0; k <= r; k++) {
            printf("%4d", val);
            val = val * (r - k) / (k + 1);
        }
        printf("\n");
    }
}

int main(void) {
    int n = 5;
    executePattern(n);
    return 0;
}
