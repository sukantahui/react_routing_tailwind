#include <stdio.h>

// Function with no arguments, returns an integer
int getAnswer(void) {
    return 42;   // The Answer to the Ultimate Question of Life, the Universe, and Everything
}

int main() {
    int ans = getAnswer();
    printf("The answer is %d\n", ans);
    return 0;
}