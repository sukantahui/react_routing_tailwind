#include <stdio.h>

// Generic function to print any integer (cast to int*)
void printInt(void *ptr) {
    printf("Value: %d\n", *(int*)ptr);
}

// Generic swap using memcpy
void genericSwap(void *a, void *b, size_t size) {
    void *temp = malloc(size);
    if (temp) {
        memcpy(temp, a, size);
        memcpy(a, b, size);
        memcpy(b, temp, size);
        free(temp);
    }
}

int main() {
    int x = 100;
    printInt(&x);   // void* implicitly

    // Swap two different types? Not possible directly because sizes differ.
    // But we can swap two ints generically:
    int p = 5, q = 15;
    printf("Before generic swap: p=%d, q=%d\n", p, q);
    genericSwap(&p, &q, sizeof(int));
    printf("After generic swap: p=%d, q=%d\n", p, q);

    // Casting to and from void* is implicit in C (except when dereferencing)
    int *ip = &x;
    void *vp = ip;        // implicit
    int *ip2 = vp;        // implicit (but some compilers warn)
    printf("Value via cast: %d\n", *ip2);

    return 0;
}