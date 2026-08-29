#include <stdio.h>
#include <string.h>

void reverse_string(char *str) {
    int n = strlen(str);
    char stack[100];
    int top = -1;

    for (int i = 0; i < n; i++) stack[++top] = str[i];
    for (int i = 0; i < n; i++) str[i] = stack[top--];
}

int main() {
    char str[] = "ANTIGRAVITY";
    printf("--- String Reversal using Stack ---\nBefore: %s\n", str);
    reverse_string(str);
    printf("After : %s\n", str);
    return 0;
}
