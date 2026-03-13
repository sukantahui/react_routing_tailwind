#include <stdio.h>

int main() {
    int x = 10;
    printf("While loop with condition false:\n");
    while (x < 10) {
        printf("This won't print.\n");
    }
    printf("Do-while with same condition:\n");
    do {
        printf("This executes once!\n");
    } while (x < 10);
    return 0;
}
