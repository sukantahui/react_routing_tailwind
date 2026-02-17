#include <stdio.h>

int main() {
    int n, i, sum = 0;
    printf("Enter N: ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        if (i % 2 != 0)
            sum += i;
    }
    printf("Sum of odd numbers = %d\n", sum);
    return 0;
}
