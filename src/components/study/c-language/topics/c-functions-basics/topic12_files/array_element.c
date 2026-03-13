#include <stdio.h>

void modifyElement(int e) {
    e = 999;
    printf("Inside function: e = %d\n", e);
}

int main() {
    int arr[] = {1, 2, 3};
    printf("Before: arr[0] = %d\n", arr[0]);
    modifyElement(arr[0]);   // passes a COPY of arr[0]
    printf("After:  arr[0] = %d\n", arr[0]);   // Still 1
    return 0;
}