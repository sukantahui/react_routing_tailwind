#include <stdio.h>

int main() {
    int a, b, c, d, e, result;
    printf("Enter a, b, c, d, e: ");
    scanf("%d %d %d %d %d", &a, &b, &c, &d, &e);
    result = a + b * c - d / e;
    printf("Expression: a + b * c - d / e = %d + %d*%d - %d/%d = %d + %d - %d = %d\n",
           a, b, c, d, e, a, b*c, d/e, result);
    return 0;
}
