#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Fibonacci Sum Series (F_0 + F_1 + F_2 + ... + F_N)
");
    printf("=========================================================

");

    long long sum = 0;
    long long a = 0, b = 1;
    printf("Fibonacci Terms: ");
    for (int i = 1; i <= n; i++) {
        sum += a;
        printf("%lld%s", a, (i == n) ? "" : " + ");
        long long next = a + b;
        a = b;
        b = next;
    }
    printf("\nSum of First %d Fibonacci Terms = %lld\n", n, sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
