#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *head;
    Node *tail;
} LinkedList;

void append_tail(LinkedList *list, int val) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    new_node->data = val;
    new_node->next = NULL;

    if (!list->head) {
        list->head = new_node;
        list->tail = new_node;
    } else {
        list->tail->next = new_node;
        list->tail = new_node;
    }
}

void print_list(LinkedList *list) {
    Node *curr = list->head;
    printf("List: ");
    while (curr) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

int main() {
    LinkedList list = {NULL, NULL};
    printf("--- O(1) Tail Insertion Engine ---\n");
    append_tail(&list, 10);
    append_tail(&list, 20);
    append_tail(&list, 30);

    print_list(&list);
    return 0;
}
