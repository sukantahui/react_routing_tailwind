#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Sum of Even Numbers Series (2 + 4 + 6 + ... + 2N)
");
    printf("=========================================================

");

    int sum = 0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        int term = 2 * i;
        sum += term;
        printf("%d%s", term, (i == n) ? "" : " + ");
    }
    printf("\nSum of First %d Even Numbers = %d\n", n, sum);
    printf("Verified via Formula N*(N+1)    = %d\n", n * (n + 1));
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
