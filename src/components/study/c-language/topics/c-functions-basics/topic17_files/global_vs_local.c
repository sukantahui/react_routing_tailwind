#include <stdio.h>

int value = 10;   // global

void func() {
    int value = 20;   // local shadows global
    printf("Inside func, local value = %d\n", value);
}

int main() {
    printf("Global value = %d\n", value);   // 10
    func();                                  // prints 20
    printf("Global value after func = %d\n", value);   // still 10
    return 0;
}