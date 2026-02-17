#include <stdio.h>
void printASCII(char c1, char c2, char c3) {
    printf("%d %d %d", c1, c2, c3);
}
int main() {
    printASCII('A','B','C');
    return 0;
}
