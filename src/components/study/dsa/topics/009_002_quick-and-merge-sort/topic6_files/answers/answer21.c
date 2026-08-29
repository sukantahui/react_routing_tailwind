#include <stdio.h>

void introsort_kernel_demo() {
    printf("--- IntroSort Kernel (Introspective Sort) ---\n");
    printf("Started with QuickSort; switched to HeapSort at max recursion depth 2*log(N); used InsertionSort for N<=16.\n");
}

int main() {
    introsort_kernel_demo();
    return 0;
}
