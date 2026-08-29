#include <stdio.h>

void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }

void decrease_key(int h[], int i, int new_val) {
    h[i] = new_val;
    while (i != 0 && h[(i - 1) / 2] > h[i]) {
        swap(&h[i], &h[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int main() {
    int min_heap[] = {10, 20, 30, 40, 50};
    printf("--- Min-Heap Decrease Key Operation ---\nBefore: [ 10 20 30 40 50 ]\n");
    decrease_key(min_heap, 3, 5); // Decrease index 3 (val 40) to 5
    printf("After decreasing index 3 to 5: Root = %d\n", min_heap[0]);
    return 0;
}
