#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // Bad: No NULL check
    int *p = (int*)malloc(sizeof(int));
    *p = 10;   // May crash if allocation failed

    // Bad: Memory leak (forgot to free)
    // free(p);   // omitted → leak

    // Bad: Double free (if we had freed once and then again)
    // free(p);
    // free(p);   // undefined behavior

    // Bad: Use after free
    int *q = (int*)malloc(sizeof(int));
    free(q);
    *q = 20;   // Dangling pointer → undefined

    // Bad: Buffer overflow
    char *str = (char*)malloc(5);  // space for 4 chars + null
    strcpy(str, "hello");          // writes 6 chars → overflow

    // Bad: Freeing stack memory
    int local = 42;
    // free(&local);   // Would crash

    return 0;
}