#include <stdio.h>
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int main() {
    int (*ops[2])(int, int) = {add, sub};
    printf("%d", ops[0](10, 5));
    return 0;
}
