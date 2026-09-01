#include <stdio.h>
int accumulate(int x) {
    static int sum = 0;
    sum += x;
    return sum;
}
int main() {
    printf("%d ", accumulate(5));
    printf("%d ", accumulate(5));
    printf("%d", accumulate(5));
    return 0;
}
