#include <stdio.h>
int* getArray() {
    static int arr[] = {2, 4, 6, 8};
    return arr;
}
int main() {
    int *p = getArray();
    for (int i = 0; i < 4; i++) 
        printf("%d ", p[i]);
    return 0;
}
