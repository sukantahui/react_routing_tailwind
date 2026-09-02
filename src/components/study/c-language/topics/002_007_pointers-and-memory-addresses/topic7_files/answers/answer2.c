#include <stdio.h>
#include <stdbool.h>

/**
 * Project 2: Higher-Order Generic Array Filter and Map Engine
 * Applies predicate filters and transformation maps over integer arrays via function pointers.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

typedef bool (*PredicateFunc)(int);
typedef int (*TransformFunc)(int);

int filterArray(const int src[], int size, int dest[], PredicateFunc predicate) {
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (predicate(src[i])) {
            dest[count++] = src[i];
        }
    }
    return count;
}

void mapArray(int arr[], int size, TransformFunc transform) {
    for (int i = 0; i < size; i++) {
        arr[i] = transform(arr[i]);
    }
}

// Predicates & Transforms
bool isEven(int x) { return (x % 2 == 0); }
bool isPositive(int x) { return (x > 0); }
int square(int x) { return x * x; }

int main(void) {
    int numbers[] = {-5, 12, 7, -3, 8, 14, 21, -2};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    int filtered[10];

    printf("Original Array: [ ");
    for (int i = 0; i < n; i++) printf("%d ", numbers[i]);
    printf("]\n\n");

    // 1. Filter Positive numbers
    int posCount = filterArray(numbers, n, filtered, isPositive);
    printf("1. Filter (Positive Only): [ ");
    for (int i = 0; i < posCount; i++) printf("%d ", filtered[i]);
    printf("]\n");

    // 2. Filter Even numbers
    int evenCount = filterArray(numbers, n, filtered, isEven);
    printf("2. Filter (Even Only): [ ");
    for (int i = 0; i < evenCount; i++) printf("%d ", filtered[i]);
    printf("]\n");

    // 3. Map (Square filtered even numbers)
    mapArray(filtered, evenCount, square);
    printf("3. Map (Squared Evens): [ ");
    for (int i = 0; i < evenCount; i++) printf("%d ", filtered[i]);
    printf("]\n");

    return 0;
}
