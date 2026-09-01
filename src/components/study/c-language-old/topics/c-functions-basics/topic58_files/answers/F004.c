#include <stdio.h>
int square(int x) {
    x = x * x;
    return x;
}
int main() {
    int a = 5;
    printf("%d", square(a));
    return 0;
}
