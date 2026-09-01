// inline_usage.c – Using the static inline header
#include <stdio.h>
#include "inline_header.h"

int main() {
    int sum = add(15, 27);
    printf("15 + 27 = %d\n", sum);
    return 0;
}