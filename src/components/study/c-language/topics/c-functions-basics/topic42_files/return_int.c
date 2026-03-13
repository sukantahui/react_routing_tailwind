// return_int.c – Simple integer return (uses register)
#include <stdio.h>

int add(int a, int b) {
    int sum = a + b;
    return sum;  // 'sum' is placed in return register (EAX/RAX)
}

int main() {
    int result = add(5, 3);
    printf("5 + 3 = %d\n", result);  // Caller reads the register
    return 0;
}