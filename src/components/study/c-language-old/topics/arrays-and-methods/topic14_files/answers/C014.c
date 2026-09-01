#include <stdio.h>
int main() {
    int a[] = {2, 4, 6, 8};
    int b[] = {3, 5, 7, 9};
    int c[8];
    for (int i = 0; i < 4; i++) 
        c[i] = a[i];
    for (int i = 0; i < 4; i++) 
        c[i+4] = b[i];
    for (int i = 0; i < 8; i++) 
        printf("%d ", c[i]);
    return 0;
}
