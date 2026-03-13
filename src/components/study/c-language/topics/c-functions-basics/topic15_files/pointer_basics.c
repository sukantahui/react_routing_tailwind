#include <stdio.h>

int main() {
    int value = 42;
    int *ptr = &value;   // ptr holds the address of value

    printf("Value: %d\n", value);
    printf("Address of value: %p\n", (void*)&value);
    printf("Pointer ptr holds: %p\n", (void*)ptr);
    printf("Dereferencing ptr: %d\n", *ptr);

    *ptr = 100;   // change value through pointer
    printf("Value after *ptr = 100: %d\n", value);

    return 0;
}