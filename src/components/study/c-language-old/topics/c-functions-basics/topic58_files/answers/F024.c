#include <stdio.h>
int* getEvenNumbers() {
    static int arr[] = {2,4,6,8};
    return arr;
}
int main() {
    int *p = getEvenNumbers();
    for (int i = 0; i < 4; i++)
        printf("%d ", p[i]);
    return 0;
}
