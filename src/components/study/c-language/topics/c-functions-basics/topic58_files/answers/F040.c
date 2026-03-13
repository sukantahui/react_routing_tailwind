#include <stdio.h>
int* firstFivePrimes() {
    static int primes[] = {2,3,5,7,11};
    return primes;
}
int main() {
    int *p = firstFivePrimes();
    for (int i = 0; i < 5; i++)
        printf("%d ", p[i]);
    return 0;
}
