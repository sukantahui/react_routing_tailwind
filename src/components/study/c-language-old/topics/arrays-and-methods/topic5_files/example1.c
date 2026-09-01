#include <stdio.h>

// O(1) – access by index
int main() {
    int arr[1000]; // large array

    // Fill with some values (not important)
    for (int i = 0; i < 1000; i++) {
        arr[i] = i * 2;
    }

    // Accessing any element takes the same small, constant time
    int index = 567; // any index
    int value = arr[index]; // O(1) operation

    printf("Element at index %d is %d\n", index, value);

    // Even if array had 1 million elements, this line would be equally fast
    return 0;
}