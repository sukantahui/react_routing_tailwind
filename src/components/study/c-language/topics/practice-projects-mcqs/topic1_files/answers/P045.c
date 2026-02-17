#include <stdio.h>

int main() {
    int i;
    printf("Incorrect (prints 1 to 4): ");
    for (i = 1; i < 5; i++) {  // < instead of <=
        printf("%d ", i);
    }
    printf("\nCorrect (prints 1 to 5): ");
    for (i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
