#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};

    printf("Deliberately accessing out of bounds:\n");
    // This loop goes one step too far (i <= 3, but valid indices 0-2)
    for (int i = 0; i <= 3; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);  // when i=3, undefined behavior!
    }

    // Writing out of bounds can corrupt other variables
    int x = 100;
    arr[3] = 999;  // undefined behavior – might overwrite x or crash
    printf("x = %d (may have changed unexpectedly)\n", x);

    return 0;
}