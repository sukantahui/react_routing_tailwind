#include <stdio.h>

void mystery(int n) {
    if (n <= 0) return;
    printf("%d ", n);
    mystery(n - 2);
    printf("%d ", n);
}

int main() {
    mystery(5);
    printf("\n");
    return 0;
}
