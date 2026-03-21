#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    // 1. Using a character array
    char arr[] = "Immutable? No, I'm mutable!";
    arr[0] = 'i';
    printf("Array: %s\n", arr);

    // 2. Using dynamic allocation
    char *heap = malloc(30);
    if (heap != NULL) {
        strcpy(heap, "I'm on the heap");
        heap[0] = 'i';
        printf("Heap: %s\n", heap);
        free(heap);
    }

    // 3. Using a static array (global or static)
    static char static_arr[] = "Static storage";
    static_arr[0] = 's';
    printf("Static: %s\n", static_arr);

    // 4. Copying a literal into an array
    char buffer[20];
    strcpy(buffer, "Hello literal");
    buffer[0] = 'h';
    printf("Copied: %s\n", buffer);

    return 0;
}