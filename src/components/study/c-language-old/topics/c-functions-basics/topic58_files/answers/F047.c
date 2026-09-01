#include <stdio.h>
int global = 10;
void changeGlobal() {
    global = 20;
}
int main() {
    changeGlobal();
    printf("%d", global);
    return 0;
}
