// bad_usage.c – Conflicting headers with generic names
#include <stdio.h>
#include "utils.h"      // Which utils? This one from module A?
#include "../other/utils.h"  // Trying to include another – may conflict

int main() {
    char text[] = "test";
    do_something(text);   // Which do_something?
    printf("Count: %d\n", count(text));
    return 0;
}