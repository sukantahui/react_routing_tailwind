#include <stdio.h>

void func() {
    int local = 10;   // local variable
    printf("Inside func: local = %d\n", local);
    local = 20;       // modifies local copy
    printf("Inside func after change: local = %d\n", local);
}

int main() {
    func();
    // printf("%d\n", local); // ERROR: local not in scope
    return 0;
}