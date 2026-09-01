#include <stdio.h>
int x = 5;
void func() {
    int x = 10;
    printf("inside: %d\n", x);
}
int main() {
    printf("outside: %d\n", x);
    func();
    return 0;
}
