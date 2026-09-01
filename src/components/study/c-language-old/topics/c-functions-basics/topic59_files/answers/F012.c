#include <stdio.h>

int powerRec(int base, int exp) {
    if (exp == 0) return 1;
    return base * powerRec(base, exp - 1);
}

int main() {
    int b, e;
    printf("Enter base and exponent: ");
    scanf("%d %d", &b, &e);
    printf("%d^%d = %d\n", b, e, powerRec(b, e));
    return 0;
}
