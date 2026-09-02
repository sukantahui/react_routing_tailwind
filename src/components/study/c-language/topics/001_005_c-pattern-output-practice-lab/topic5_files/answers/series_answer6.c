#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Alternating Sign Series (1 - 2 + 3 - 4 + 5 - 6 + ...)
");
    printf("=========================================================

");

    int sum = 0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        if (i % 2 != 0) {
            sum += i;
            printf("%s%d", (i == 1) ? "" : " + ", i);
        } else {
            sum -= i;
            printf(" - %d", i);
        }
    }
    printf("\nSum of Alternating Series = %d\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
