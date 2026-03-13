#include <stdio.h>
struct Person {
    char name[20];
    int age;
};
int main() {
    struct Person people[2] = {{"Alice", 25}, {"Bob", 30}};
    for (int i = 0; i < 2; i++)
        printf("%s %d\n", people[i].name, people[i].age);
    return 0;
}
