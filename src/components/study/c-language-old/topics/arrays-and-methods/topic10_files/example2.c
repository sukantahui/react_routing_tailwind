#include <stdio.h>
#include <assert.h>

// Safe array access with bounds checking
int getElement(int arr[], size_t size, size_t index) {
    assert(index < size && "Index out of bounds in getElement");
    return arr[index];
}

void setElement(int arr[], size_t size, size_t index, int value) {
    assert(index < size && "Index out of bounds in setElement");
    arr[index] = value;
}

int main() {
    int scores[5] = {80, 85, 90, 95, 100};
    size_t n = sizeof(scores) / sizeof(scores[0]);

    // Safe usage
    printf("Element at index 2: %d\n", getElement(scores, n, 2));

    // This would trigger assertion failure (uncomment to test)
    // printf("Element at index 5: %d\n", getElement(scores, n, 5));

    // When debugging, assertions help catch bugs early
    return 0;
}