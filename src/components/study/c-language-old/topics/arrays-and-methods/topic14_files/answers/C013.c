#include <stdio.h>
int main() {
    int src[] = {2, 4, 6, 8};
    int dest[4];
    for (int i = 0; i < 4; i++) 
        dest[i] = src[i];
    for (int i = 0; i < 4; i++) 
        printf("%d ", dest[i]);
    return 0;
}
