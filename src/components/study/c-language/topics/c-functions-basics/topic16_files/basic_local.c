#include <stdio.h>

void func() {
    int local = 100;   // local variable inside func
    printf("Inside func: local = %d\n", local);
}

int main() {
    int local = 5;     // separate local variable in main
    printf("In main, before func: local = %d\n", local);
    func();
    printf("In main, after func: local = %d\n", local);   // unchanged
    return 0;
}