#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // 1. Safe string copy with bounds check
    char small[10];
    const char *src = "Hi";
    if (strlen(src) < sizeof(small)) {
        strcpy(small, src);
    } else {
        printf("String too long\n");
        // handle error
    }
    // Alternatively, use strncpy
    strncpy(small, "Hello", sizeof(small)-1);
    small[sizeof(small)-1] = '\0'; // ensure null termination

    // 2. Safe dynamic memory management
    int *p = malloc(sizeof(int));
    if (p != NULL) {
        *p = 42;
        free(p);
        p = NULL; // set to NULL to prevent use-after-free
    }

    // 3. Avoid double free: only free once, and check after
    int *q = malloc(sizeof(int));
    if (q != NULL) {
        free(q);
        q = NULL;
    }
    // Attempting to free again would be safe because q is NULL (free(NULL) does nothing)
    free(q);

    // 4. Check for NULL before dereferencing
    int *r = NULL;
    if (r != NULL) {
        *r = 5;
    } else {
        printf("Cannot dereference NULL pointer\n");
    }

    printf("All safe operations completed.\n");
    return 0;
}