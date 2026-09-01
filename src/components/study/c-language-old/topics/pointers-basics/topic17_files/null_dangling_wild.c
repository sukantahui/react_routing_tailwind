#include <stdio.h>
#include <stdlib.h>

int* getDangling() {
    int local = 42;
    return &local;  // returning address of local variable -> dangling
}

int main() {
    // NULL pointer
    int *np = NULL;
    if (np != NULL) {
        *np = 5;   // safe check
    } else {
        printf("np is NULL, cannot use\n");
    }

    // Dangling pointer after free
    int *dp = malloc(sizeof(int));
    *dp = 10;
    printf("dp points to: %d\n", *dp);
    free(dp);
    // dp is now dangling
    // *dp = 20;   // UNCOMMENT AT YOUR OWN RISK: undefined behavior

    // Dangling pointer from function
    int *dangling = getDangling(); // dangling pointer
    // *dangling = 99; // UNDEFINED: local variable no longer exists

    // Wild pointer
    int *wp;   // uninitialized
    // *wp = 100;   // extremely dangerous

    printf("Demonstration complete.\n");
    return 0;
}