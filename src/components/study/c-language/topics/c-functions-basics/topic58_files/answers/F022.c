#include <stdio.h>
int global = 5;
void func() {
    int local = 10;
    printf("Global: %d, Local: %d", global, local);
}
int main() {
    func();
    return 0;
}
