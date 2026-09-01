#include <stdio.h>
#include <math.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i <= sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    int low, high, i;
    printf("Enter lower and upper limits: ");
    scanf("%d %d", &low, &high);
    printf("Prime numbers between %d and %d: ", low, high);
    for (i = low; i <= high; i++) {
        if (isPrime(i))
            printf("%d ", i);
    }
    printf("\n");
    return 0;
}
