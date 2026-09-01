#include <stdio.h>

#ifndef __STDC_VERSION__
#error "This code requires C99 or later!"
#endif

#line 100 "custom_file.c"

int main() {
    printf("Current line: %d\n", __LINE__);   // Will show 100+
    printf("Current file: %s\n", __FILE__);   // Shows custom_file.c
    return 0;
}