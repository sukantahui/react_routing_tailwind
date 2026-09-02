#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Sum of Cubes Series (1^3 + 2^3 + 3^3 + ... + N^3)
");
    printf("=========================================================

");

    long long sum = 0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        sum += (long long)i * i * i;
        printf("%d^3%s", i, (i == n) ? "" : " + ");
    }
    long long formula = (long long)(n * (n + 1) / 2) * (n * (n + 1) / 2);
    printf("\nSum of Cubes = %lld\n", sum);
    printf("Verified via Formula [N*(N+1)/2]^2 = %lld\n", formula);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
