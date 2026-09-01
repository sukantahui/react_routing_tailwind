#include <stdio.h>
int stringLength(char *s) {
    int len = 0;
    while (s[len] != '\0') len++;
    return len;
}
int main() {
    printf("%d", stringLength("Hello"));
    return 0;
}
