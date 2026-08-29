#include <stdio.h>

struct Test {
    char a;
    int b;
    char c;
};

int main() {
    printf("Size of struct: %zu bytes\n", sizeof(struct Test));
    return 0;
}
