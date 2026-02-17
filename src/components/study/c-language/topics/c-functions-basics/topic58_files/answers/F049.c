#include <stdio.h>
int getSize() {
    static int arr[] = {1,2,3,4};
    return sizeof(arr) / sizeof(arr[0]);
}
int main() {
    printf("%d", getSize());
    return 0;
}
