#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef enum {
    TYPE_INT,
    TYPE_DOUBLE,
    TYPE_STRING
} DataType;

// Generic print function with type safety
void print_value(const void *ptr, DataType type) {
    if (!ptr) {
        printf("NULL pointer\n");
        return;
    }
    
    switch (type) {
        case TYPE_INT:
            printf("int: %d\n", *(const int*)ptr);
            break;
        case TYPE_DOUBLE:
            printf("double: %f\n", *(const double*)ptr);
            break;
        case TYPE_STRING:
            printf("string: %s\n", (const char*)ptr);
            break;
        default:
            printf("Unknown type\n");
    }
}

// Generic addition that returns newly allocated memory (caller frees)
void* add_values(const void *a, const void *b, DataType type) {
    void *result = NULL;
    switch (type) {
        case TYPE_INT: {
            int *r = malloc(sizeof(int));
            *r = *(const int*)a + *(const int*)b;
            result = r;
            break;
        }
        case TYPE_DOUBLE: {
            double *r = malloc(sizeof(double));
            *r = *(const double*)a + *(const double*)b;
            result = r;
            break;
        }
        default:
            printf("Addition not supported for this type\n");
    }
    return result;
}

int main() {
    int x = 10, y = 20;
    double p = 1.5, q = 2.5;
    char *s = "Hello, safe casting!";
    
    print_value(&x, TYPE_INT);
    print_value(&p, TYPE_DOUBLE);
    print_value(s, TYPE_STRING);
    
    int *sum_int = add_values(&x, &y, TYPE_INT);
    print_value(sum_int, TYPE_INT);
    free(sum_int);
    
    double *sum_dbl = add_values(&p, &q, TYPE_DOUBLE);
    print_value(sum_dbl, TYPE_DOUBLE);
    free(sum_dbl);
    
    return 0;
}