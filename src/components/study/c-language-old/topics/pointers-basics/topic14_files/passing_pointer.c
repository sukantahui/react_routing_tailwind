#include <stdio.h>

// Using pointer notation explicitly
void printArray(int *ptr, size_t n) {
    for (size_t i = 0; i < n; i++) {
        printf("%d ", ptr[i]);   // ptr[i] is equivalent to *(ptr + i)
    }
    printf("\n");
}

// Modify using pointer arithmetic
void scaleArray(int *ptr, size_t n, int factor) {
    for (size_t i = 0; i < n; i++) {
        *(ptr + i) *= factor;    // pointer arithmetic
    }
}

int main() {
    int scores[] = {85, 92, 78, 88, 95};
    size_t count = sizeof(scores) / sizeof(scores[0]);

    printf("Original: ");
    printArray(scores, count);

    scaleArray(scores, count, 2);
    printf("After scaling by 2: ");
    printArray(scores, count);

    return 0;
}