#include <stdio.h>

void func1() {
    int x = 1;
    printf("func1: x = %d\n", x);
    x = 10;
    printf("func1 after change: x = %d\n", x);
}

void func2() {
    int x = 2;   // independent of func1's x
    printf("func2: x = %d\n", x);
}

int main() {
    func1();
    func2();
    func1();     // func1's x starts again at 1
    return 0;
}