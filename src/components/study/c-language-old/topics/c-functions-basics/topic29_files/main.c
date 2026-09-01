#include <stdio.h>
#include "calculator.h"

int main() {
    int x = 10, y = 3;
    printf("%d + %d = %d\n", x, y, add(x, y));
    printf("%d - %d = %d\n", x, y, subtract(x, y));
    printf("%d * %d = %d\n", x, y, multiply(x, y));
    printf("%d / %d = %d\n", x, y, divide(x, y));
    return 0;
}