// call_stack_example.c – Demonstrating stack frames with nested calls
#include <stdio.h>

void func2(int a, int b) {
    int z = a + b;
    printf("func2: a=%d, b=%d, z=%d (address of z: %p)\n", a, b, z, (void*)&z);
    // func2 returns, its frame is popped
}

void func1(int x) {
    int y = x * 2;
    printf("func1: x=%d, y=%d (address of y: %p)\n", x, y, (void*)&y);
    func2(y, 10);
    printf("func1: back from func2, y still %d\n", y);
    // func1 returns, its frame is popped
}

int main() {
    int m = 5;
    printf("main: m=%d (address of m: %p)\n", m, (void*)&m);
    func1(m);
    printf("main: back from func1, m still %d\n", m);
    return 0;
}