// bad_main1.c – First source file including the bad header
#include <stdio.h>
#include "bad_header.h"

int main() {
    int result = add(5, 3);
    printf("5 + 3 = %d\n", result);
    return 0;
}