#include <stdio.h>
#include <stdarg.h>
int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int s = 0;
    for (int i = 0; i < count; i++)
        s += va_arg(args, int);
    va_end(args);
    return s;
}
int main() {
    printf("Sum: %d", sum(5, 1,2,3,4,5));
    return 0;
}
