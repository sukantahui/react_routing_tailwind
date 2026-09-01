#include <stdio.h>
#include "math_ops.h"

int main() {
    int x = 10, y = 5;
    printf("%d + %d = %d\n", x, y, add(x, y));
    printf("%d * %d = %d\n", x, y, multiply(x, y));
    return 0;
}