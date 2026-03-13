#include <stdio.h>
int product(int n) {
    if (n == 1) return 1;
    return n * product(n-1);
}
int main() {
    printf("%d", product(5));
    return 0;
}
