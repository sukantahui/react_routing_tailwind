#include <stdio.h>
#include "myutils.h"

int main() {
    int num = 5;
    printf("%d squared = %d\n", num, square(num));
    printf("%d cubed   = %d\n", num, cube(num));
    return 0;
}