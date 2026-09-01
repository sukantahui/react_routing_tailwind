#include <stdio.h>
void checkEvenOdd(int n) {
    if (n % 2 == 0)
        printf("Even");
    else
        printf("Odd");
}
int main() {
    checkEvenOdd(4);
    return 0;
}
