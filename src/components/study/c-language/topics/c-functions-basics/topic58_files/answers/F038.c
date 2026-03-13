#include <stdio.h>
void tryChange(int a, int b) {
    a = 100;
    b = 200;
}
int main() {
    int a = 10, b = 20;
    tryChange(a, b);
    printf("a = %d, b = %d", a, b);
    return 0;
}
