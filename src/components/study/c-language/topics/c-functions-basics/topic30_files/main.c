#include <stdio.h>
#include "math_utils.h"

int main() {
    int n = 5;
    printf("%d squared = %d\n", n, square(n));
    printf("%d cubed   = %d\n", n, cube(n));
    return 0;
}