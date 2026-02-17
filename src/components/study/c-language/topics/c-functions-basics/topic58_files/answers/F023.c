#include <stdio.h>
void modify(int *arr) {
    arr[0] = 30;
}
int main() {
    int a[] = {10,20};
    modify(a);
    printf("%d", a[0]);
    return 0;
}
