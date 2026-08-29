#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node n1 = {100, NULL};
    struct Node n2 = {200, NULL};
    struct Node n3 = {300, NULL};
    
    n1.next = &n2;
    n2.next = &n3;
    
    struct Node *p = &n1;
    while (p != NULL) {
        printf("%d -> ", p->data);
        p = p->next;
    }
    printf("END\n");
    return 0;
}
