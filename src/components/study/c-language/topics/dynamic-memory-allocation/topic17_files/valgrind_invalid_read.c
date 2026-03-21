#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*)malloc(5 * sizeof(int));
    // Write to valid range
    for (int i = 0; i < 5; i++) arr[i] = i;
    // Invalid read: index 5 is out of bounds
    int x = arr[5];
    printf("Invalid read value: %d\n", x);
    free(arr);
    return 0;
}