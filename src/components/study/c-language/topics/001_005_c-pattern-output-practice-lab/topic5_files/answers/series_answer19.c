#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Quadratic Sum of Sums Series (1 + (1+2) + (1+2+3) + ...)
");
    printf("=========================================================

");

    int totalSum = 0, currentSum = 0;
    printf("Partial Sums: ");
    for (int i = 1; i <= n; i++) {
        currentSum += i;
        totalSum += currentSum;
        printf("%d%s", currentSum, (i == n) ? "" : " + ");
    }
    printf("\nSum of Partial Sums Series = %d\n", totalSum);
    printf("Verified via Formula N*(N+1)*(N+2)/6 = %d\n", (n * (n + 1) * (n + 2)) / 6);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
