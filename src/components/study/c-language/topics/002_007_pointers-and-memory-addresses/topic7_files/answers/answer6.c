#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Project 6: Polymorphic Generic Quick Sort Comparator Engine
 * Implements a polymorphic generic bubble sort accepting (const void*, const void*) comparators.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

typedef int (*ComparatorFunc)(const void*, const void*);

void genericSort(void *base, size_t numElements, size_t elemSize, ComparatorFunc cmp) {
    char *arr = (char*)base;
    char *temp = (char*)malloc(elemSize);

    for (size_t i = 0; i < numElements - 1; i++) {
        for (size_t j = 0; j < numElements - 1 - i; j++) {
            char *p1 = arr + j * elemSize;
            char *p2 = arr + (j + 1) * elemSize;

            if (cmp(p1, p2) > 0) {
                // Byte-by-byte swap using temp buffer
                memcpy(temp, p1, elemSize);
                memcpy(p1, p2, elemSize);
                memcpy(p2, temp, elemSize);
            }
        }
    }
    free(temp);
}

int cmpInts(const void *a, const void *b) {
    return (*(const int*)a - *(const int*)b);
}

int cmpDoubles(const void *a, const void *b) {
    double d1 = *(const double*)a;
    double d2 = *(const double*)b;
    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
}

int main(void) {
    int nums[] = {78, 12, 95, 34, 56};
    double prices[] = {99.99, 12.50, 45.00, 5.25};

    genericSort(nums, 5, sizeof(int), cmpInts);
    printf("Generic Sorted Integers: [ ");
    for (int i = 0; i < 5; i++) printf("%d ", nums[i]);
    printf("]\n");

    genericSort(prices, 4, sizeof(double), cmpDoubles);
    printf("Generic Sorted Doubles : [ ");
    for (int i = 0; i < 4; i++) printf("%.2f ", prices[i]);
    printf("]\n");

    return 0;
}
