#include <stdio.h>
int add(int a, int b) { return a+b; }
int sub(int a, int b) { return a-b; }
int mul(int a, int b) { return a*b; }
int main() {
    int (*ops[3])(int, int) = {add, sub, mul};
    printf("%d", ops[2](6,4));
    return 0;
}
