#include <stdio.h>
#include <stdlib.h>

void leaky_function() {
    int *p = (int*)malloc(sizeof(int));
    *p = 42;
    // Forgot to free p
    // p is lost when function returns → leak
}

int main() {
    leaky_function();
    printf("Function returned, but memory leaked\n");
    return 0;
}