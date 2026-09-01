#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[50];
} Person;

int main() {
    Person *p = (Person*)malloc(sizeof(Person));
    if (!p) {
        printf("Allocation failed\n");
        return 1;
    }
    p->id = 101;
    sprintf(p->name, "Swadeep");
    printf("Person: id=%d, name=%s\n", p->id, p->name);
    free(p);
    return 0;
}