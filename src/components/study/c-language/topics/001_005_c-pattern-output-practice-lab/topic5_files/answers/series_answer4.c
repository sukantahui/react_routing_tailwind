#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Sum of Squares Series (1^2 + 2^2 + 3^2 + ... + N^2)
");
    printf("=========================================================

");

    int sum = 0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        sum += i * i;
        printf("%d^2%s", i, (i == n) ? "" : " + ");
    }
    printf("\nSum of Squares = %d\n", sum);
    printf("Verified via Formula N*(N+1)*(2N+1)/6 = %d\n", (n * (n + 1) * (2 * n + 1)) / 6);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
