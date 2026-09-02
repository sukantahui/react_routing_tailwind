#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Sum of Natural Numbers Series (1 + 2 + 3 + ... + N)
");
    printf("=========================================================

");

    int sum = 0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        sum += i;
        printf("%d%s", i, (i == n) ? "" : " + ");
    }
    printf("\nSum of First %d Natural Numbers = %d\n", n, sum);
    printf("Verified via Formula N*(N+1)/2   = %d\n", (n * (n + 1)) / 2);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
