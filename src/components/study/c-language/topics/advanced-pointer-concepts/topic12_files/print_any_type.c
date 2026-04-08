#include <stdio.h>

typedef enum { TYPE_INT, TYPE_DOUBLE, TYPE_STRING } DataType;

void print_value(void *ptr, DataType type) {
    switch (type) {
        case TYPE_INT:
            printf("%d\n", *(int*)ptr);
            break;
        case TYPE_DOUBLE:
            printf("%f\n", *(double*)ptr);
            break;
        case TYPE_STRING:
            printf("%s\n", (char*)ptr);
            break;
        default:
            printf("Unknown type\n");
    }
}

int main() {
    int a = 100;
    double b = 99.99;
    char *c = "Hello, void pointers!";
    
    print_value(&a, TYPE_INT);
    print_value(&b, TYPE_DOUBLE);
    print_value(c, TYPE_STRING);
    
    return 0;
}