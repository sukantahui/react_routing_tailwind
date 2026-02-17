#include <stdio.h>
int asciiVal(char c) {
    return (int)c;
}
int main() {
    printf("%d", asciiVal('A'));
    return 0;
}
