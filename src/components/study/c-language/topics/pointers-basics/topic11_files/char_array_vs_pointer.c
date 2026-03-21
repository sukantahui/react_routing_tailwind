#include <stdio.h>
#include <string.h>

int main() {
    // Character array (mutable)
    char arr[] = "Hello";
    printf("arr = %s\n", arr);
    arr[0] = 'h';               // OK: modify array
    printf("Modified arr = %s\n", arr);
    printf("sizeof(arr) = %zu\n", sizeof(arr));  // 6 (includes '\\0')
    printf("strlen(arr) = %zu\n", strlen(arr));  // 5

    // Character pointer to string literal (read-only)
    char *ptr = "World";
    printf("ptr = %s\n", ptr);
    // ptr[0] = 'w';            // DANGEROUS: likely crash
    printf("ptr[0] = %c\n", ptr[0]);  // reading is fine

    // Pointer can be reassigned
    ptr = arr;                   // now points to array
    printf("ptr now points to: %s\n", ptr);
    ptr[0] = 'H';                // modifies arr (since ptr points to arr)
    printf("arr after pointer modification: %s\n", arr);

    return 0;
}