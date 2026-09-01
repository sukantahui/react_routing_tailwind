// bad_main2.c – Second source file also including the bad header
#include <stdio.h>
#include "bad_header.h"

void otherFunction() {
    int x = add(10, 20);
    printf("10 + 20 = %d\n", x);
}