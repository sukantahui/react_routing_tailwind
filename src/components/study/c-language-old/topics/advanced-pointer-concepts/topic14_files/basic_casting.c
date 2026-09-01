#include <stdio.h>

int main() {
    int a = 42;
    double b = 3.14159;
    char c = 'X';
    
    void *vp;
    
    // Cast to int*
    vp = &a;
    printf("int value: %d\n", *(int*)vp);
    
    // Cast to double*
    vp = &b;
    printf("double value: %f\n", *(double*)vp);
    
    // Cast to char*
    vp = &c;
    printf("char value: %c\n", *(char*)vp);
    
    // Byte access via char* (allowed even for different original type)
    vp = &a;
    unsigned char *bytes = (unsigned char*)vp;
    printf("First byte of int: %02x\n", bytes[0]);
    
    return 0;
}