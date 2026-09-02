#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Sum of Series of Term Factorials (1! + 2! + 3! + ... + N!)
");
    printf("=========================================================

");

    long long sum = 0, fact = 1;
    printf("Factorials: ");
    for (int i = 1; i <= n; i++) {
        fact *= i;
        sum += fact;
        printf("%d!%s", i, (i == n) ? "" : " + ");
    }
    printf("\nSum of Factorials = %lld\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
