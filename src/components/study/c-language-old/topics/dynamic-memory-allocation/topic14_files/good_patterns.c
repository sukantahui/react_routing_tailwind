#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = NULL;
    int *temp = NULL;

    // Good: Use sizeof(*arr) and check return
    arr = (int*)malloc(sizeof(*arr) * 10);
    if (!arr) {
        fprintf(stderr, "Allocation failed\n");
        return EXIT_FAILURE;
    }

    // Good: Use arr safely
    arr[0] = 42;
    printf("%d\n", arr[0]);

    // Good: Set to NULL after free
    free(arr);
    arr = NULL;

    // Good: free(NULL) is safe
    free(temp);   // temp is NULL, safe
    return EXIT_SUCCESS;
}