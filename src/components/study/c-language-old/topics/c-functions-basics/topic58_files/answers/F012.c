#include <stdio.h>
char firstChar(char *s) {
    return s[0];
}
int main() {
    printf("%c", firstChar("abc"));
    return 0;
}
