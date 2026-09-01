#include <stdio.h>
#include <string.h>
int main() {
    char str[20] = "Hello";
    strcpy(str, "Hello");
    strcat(str, "Hello");
    printf("%s", str);
    return 0;
}
