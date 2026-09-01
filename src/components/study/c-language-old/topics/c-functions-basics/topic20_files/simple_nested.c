#include <stdio.h>

void func2() {
    printf("Inside func2\n");
}

void func1() {
    printf("Inside func1, about to call func2\n");
    func2();
    printf("Back in func1 after func2\n");
}

int main() {
    printf("Main calls func1\n");
    func1();
    printf("Back in main\n");
    return 0;
}