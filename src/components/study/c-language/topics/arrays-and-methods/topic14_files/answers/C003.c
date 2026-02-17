#include <stdio.h>
int main() {
    int arr[] = {2,4,6,8};
    int *p = arr;
    printf("%d", *(p+1));
    return 0;
}