// good_main.c – Uses the function from good_impl.c
#include <stdio.h>
#include "good_header.h"

int main() {
    int result = add(5, 3);
    printf("5 + 3 = %d\n", result);
    return 0;
}