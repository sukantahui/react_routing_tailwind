#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Double Factorial Series (1!! + 2!! + 3!! + ... + N!!)
");
    printf("=========================================================

");

    long long totalSum = 0;
    printf("Double Factorials: ");
    for (int i = 1; i <= n; i++) {
        long long df = 1;
        for (int k = i; k > 0; k -= 2) df *= k;
        totalSum += df;
        printf("%d!!%s", i, (i == n) ? "" : " + ");
    }
    printf("\nSum of Double Factorial Series = %lld\n", totalSum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
