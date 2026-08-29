#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    printf("%d %d\n", *ptr, *(ptr + 3));
    ptr++;
    printf("%d\n", *ptr);
    
    return 0;
}
