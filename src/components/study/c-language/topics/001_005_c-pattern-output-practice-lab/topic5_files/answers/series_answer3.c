#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Sum of Odd Numbers Series (1 + 3 + 5 + ... + (2N-1))
");
    printf("=========================================================

");

    int sum = 0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        int term = 2 * i - 1;
        sum += term;
        printf("%d%s", term, (i == n) ? "" : " + ");
    }
    printf("\nSum of First %d Odd Numbers = %d\n", n, sum);
    printf("Verified via Formula N^2       = %d\n", n * n);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
