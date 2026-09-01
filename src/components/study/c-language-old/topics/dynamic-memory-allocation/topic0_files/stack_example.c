#include <stdio.h>

void demoStack() {
    int local = 42;          // stored on stack
    int arr[5] = {1,2,3,4,5}; // also on stack
    printf("Stack local: %d\n", local);
}

int main() {
    demoStack();
    // local and arr are automatically destroyed here
    return 0;
}