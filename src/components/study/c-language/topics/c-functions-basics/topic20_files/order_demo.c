#include <stdio.h>

void funcC() {
    printf("Entering C\n");
    printf("Leaving C\n");
}

void funcB() {
    printf("Entering B\n");
    funcC();
    printf("Leaving B\n");
}

void funcA() {
    printf("Entering A\n");
    funcB();
    printf("Leaving A\n");
}

int main() {
    printf("Main starts\n");
    funcA();
    printf("Main ends\n");
    return 0;
}