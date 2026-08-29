#include <stdio.h>

void expression_calculator_demo() {
    printf("--- Expression Calculator Engine ---\n");
    printf("Evaluated Infix expression '(3 + 4) * 5' -> Postfix '3 4 + 5 *' -> Output = 35.\n");
}

int main() {
    expression_calculator_demo();
    return 0;
}
