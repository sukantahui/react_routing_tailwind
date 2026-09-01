#include <stdio.h>
#include "math_utils.h"

int main() {
    int x = 5, y = 3;
    printf("%d + %d = %d\n", x, y, add(x, y));
    printf("%d * %d = %d\n", x, y, multiply(x, y));
    return 0;
}