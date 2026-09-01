#include <stdio.h>
#include <stdlib.h>

int main() {
    // 1. Dereferencing NULL
    int *p = NULL;
    // *p = 5;   // Uncomment to cause segfault

    // 2. Out-of-bounds array access
    int arr[5];
    // arr[10] = 42;   // May segfault or corrupt

    // 3. Use-after-free
    int *q = malloc(sizeof(int));
    *q = 10;
    free(q);
    // *q = 20;   // Uncomment: segfault or undefined

    // 4. Modifying string literal
    char *s = "Hello";
    // s[0] = 'h';   // Segfault (read-only memory)

    // 5. Stack overflow (deep recursion)
    // void recurse() { recurse(); } // Uncomment call to cause overflow

    printf("If you see this, no segfault occurred (yet).\n");
    return 0;
}