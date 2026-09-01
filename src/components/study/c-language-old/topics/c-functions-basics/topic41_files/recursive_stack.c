// recursive_stack.c – Each recursive call gets its own frame
#include <stdio.h>

void recurse(int n) {
    int local = n;
    printf("recurse(%d): local at address %p\n", n, (void*)&local);

    if (n > 0) {
        recurse(n - 1);
    }

    printf("recurse(%d) returning\n", n);
}

int main() {
    recurse(3);
    return 0;
}