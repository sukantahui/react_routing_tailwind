#include <stdio.h>
int min(int a, int b) {
    return (a < b) ? a : b;
}
int main() {
    printf("%d", min(8,6));
    return 0;
}
