#include <stdio.h>
int counter() {
    static int count = 0;
    count++;
    return count;
}
int main() {
    printf("%d ", counter());
    printf("%d ", counter());
    printf("%d", counter());
    return 0;
}
