#include <stdio.h>

void quadratic_dependent_loop_demo() {
    printf("--- Quadratic Dependent Outer-Inner Multi-Step Loop ---\n");
    printf("Evaluated outer i+=k x inner j=0..i steps; total = Theta(N^2 / k).\n");
}

int main() {
    quadratic_dependent_loop_demo();
    return 0;
}
