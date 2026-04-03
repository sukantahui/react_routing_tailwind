#include <stdio.h>

// Swap function using pointers - THE classic example
void swap(int *a, int *b) {
    int temp = *a;  // Store value pointed by a
    *a = *b;        // Assign value pointed by b to location pointed by a
    *b = temp;      // Assign temp to location pointed by b
}

// This WON'T work - call by value version
void badSwap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("Inside badSwap: a=%d, b=%d\n", a, b);
}

int main() {
    int x = 10, y = 20;
    
    printf("=== Swap Function Demonstration ===\n");
    printf("Original: x=%d, y=%d\n\n", x, y);
    
    // This won't swap
    printf("Calling badSwap (call by value):\n");
    badSwap(x, y);
    printf("After badSwap: x=%d, y=%d (unchanged!)\n\n", x, y);
    
    // This works
    printf("Calling swap (with pointers):\n");
    swap(&x, &y);
    printf("After swap: x=%d, y=%d (swapped!)\n\n", x, y);
    
    // Another example - why this matters
    int students_scores[] = {85, 92, 78, 88, 95};
    printf("Student scores before sorting (conceptual):\n");
    for(int i = 0; i < 5; i++) {
        printf("%d ", students_scores[i]);
    }
    printf("\nSwap is essential for sorting algorithms!\n");
    
    return 0;
}