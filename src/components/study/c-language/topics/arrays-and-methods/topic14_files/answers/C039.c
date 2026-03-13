#include <stdio.h>
struct Student {
    char name[20];
    int marks[3];
};
int main() {
    struct Student s = {"John", {90, 85, 92}};
    for (int i = 0; i < 3; i++)
        printf("%d ", s.marks[i]);
    return 0;
}
