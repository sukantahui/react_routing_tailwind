// stack_allocation.c – Demonstrating stack allocation and reuse
#include <stdio.h>

void display(int val) {
    int local = val * 2;
    printf("In display, local variable 'local' = %d at address %p\n", local, (void*)&local);
}

int main() {
    int m = 42;
    printf("In main, 'm' = %d at address %p\n", m, (void*)&m);

    display(10);
    display(20);  // Same stack frame location may be reused
    display(30);

    return 0;
}