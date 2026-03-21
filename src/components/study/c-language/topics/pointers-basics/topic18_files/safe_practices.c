#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // 1. Check for NULL after malloc
    int *p = malloc(sizeof(int));
    if (p == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }
    *p = 5;
    free(p);
    p = NULL;   // set to NULL to avoid use-after-free

    // 2. Bounds checking
    int arr[5] = {1,2,3,4,5};
    int index = 10;
    if (index >= 0 && index < 5) {
        arr[index] = 99;   // safe
    } else {
        printf("Index out of bounds\n");
    }

    // 3. Use a modifiable array for strings
    char str[] = "Hello";
    str[0] = 'h';   // safe, because str is a modifiable array

    // 4. Guard against recursion depth
    // Use iterative solution instead of deep recursion

    // 5. Check function arguments
    void safePrint(int *ptr) {
        if (ptr != NULL) {
            printf("%d\n", *ptr);
        }
    }
    int x = 42;
    safePrint(&x);
    safePrint(NULL);   // safe, won't segfault

    return 0;
}