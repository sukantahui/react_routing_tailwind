#include <stdio.h>

void limit_definition_solver_demo() {
    printf("--- Limit Definition Solver for Asymptotic Notations ---\n");
    printf("Limit L = lim_{n->inf} (f(n)/g(n)): L=0 -> o(g); 0<L<inf -> Theta(g); L=inf -> omega(g).\n");
}

int main() {
    limit_definition_solver_demo();
    return 0;
}
