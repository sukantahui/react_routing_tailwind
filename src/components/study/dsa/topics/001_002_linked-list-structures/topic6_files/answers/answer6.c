#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

typedef struct {
    DNode *head;
    DNode *tail;
} DoublyList;

void push_front(DoublyList *list, int val) {
    DNode *n = (DNode*)malloc(sizeof(DNode));
    n->data = val; n->prev = NULL; n->next = list->head;
    if (list->head) list->head->prev = n;
    else list->tail = n;
    list->head = n;
}

void push_back(DoublyList *list, int val) {
    DNode *n = (DNode*)malloc(sizeof(DNode));
    n->data = val; n->next = NULL; n->prev = list->tail;
    if (list->tail) list->tail->next = n;
    else list->head = n;
    list->tail = n;
}

int main() {
    DoublyList list = {NULL, NULL};
    printf("--- Doubly Linked List Head & Tail Insertion ---\n");
    push_front(&list, 20);
    push_front(&list, 10);
    push_back(&list, 30);

    DNode *curr = list.head;
    printf("List: ");
    while (curr) { printf("%d <-> ", curr->data); curr = curr->next; }
    printf("NULL\n");
    return 0;
}
