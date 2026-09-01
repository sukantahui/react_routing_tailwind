#include <stdio.h>
double divide(int a, int b) {
    return (double)a / b;
}
int main() {
    printf("%f", divide(1,2));
    return 0;
}
