#include <stdio.h>

int x = 5;   // global

void func() {
    int x = 10;   // local shadows global
    printf("Inside func, local x = %d\n", x);
    x = 20;
    printf("Inside func after change, local x = %d\n", x);
}

int main() {
    printf("Global x = %d\n", x);   // 5
    func();
    printf("Global x after func = %d\n", x);   // still 5
    return 0;
}