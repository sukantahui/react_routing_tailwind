#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    // Safe: modify a character array
    char buffer[20] = "Original";
    printf("Before: %s\n", buffer);
    strcpy(buffer, "New string");
    printf("After strcpy: %s\n", buffer);
    buffer[0] = 'n';
    printf("After direct assign: %s\n", buffer);

    // Unsafe: attempt to modify string literal
    char *literal = "Constant";
    printf("Literal: %s\n", literal);
    // literal[0] = 'c';   // uncomment to see crash (UB)

    // Safe: allocate heap memory for mutable string
    char *heap_str = malloc(20);
    if (heap_str != NULL) {
        strcpy(heap_str, "Dynamic");
        printf("Heap string: %s\n", heap_str);
        heap_str[0] = 'd';
        printf("Modified heap string: %s\n", heap_str);
        free(heap_str);
    }

    return 0;
}