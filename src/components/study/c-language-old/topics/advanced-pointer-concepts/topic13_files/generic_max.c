#include <stdio.h>
#include <string.h>

// Comparator: returns negative if a<b, zero if equal, positive if a>b
typedef int (*Compare)(const void*, const void*);

// Generic max: returns pointer to larger element
void* generic_max(void* a, void* b, Compare cmp) {
    return cmp(a, b) > 0 ? a : b;
}

// Comparators for different types
int cmp_int(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}
int cmp_double(const void* a, const void* b) {
    double diff = *(double*)a - *(double*)b;
    return (diff > 0) ? 1 : (diff < 0) ? -1 : 0;
}
int cmp_string(const void* a, const void* b) {
    return strcmp(*(char**)a, *(char**)b);
}

int main() {
    int x = 10, y = 20;
    int* max_int = generic_max(&x, &y, cmp_int);
    printf("Max int: %d\n", *max_int);
    
    double p = 3.14, q = 2.71;
    double* max_dbl = generic_max(&p, &q, cmp_double);
    printf("Max double: %f\n", *max_dbl);
    
    char* s1 = "zebra", *s2 = "apple";
    char** max_str = generic_max(&s1, &s2, cmp_string);
    printf("Max string: %s\n", *max_str);
    
    return 0;
}