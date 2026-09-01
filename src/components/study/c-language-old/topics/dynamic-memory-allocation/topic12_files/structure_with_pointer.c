#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* create_node(int value) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (!new_node) return NULL;
    new_node->data = value;
    new_node->next = NULL;
    return new_node;
}

void free_list(Node *head) {
    Node *current = head;
    while (current) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
}

int main() {
    Node *head = create_node(10);
    head->next = create_node(20);
    head->next->next = create_node(30);

    // Traverse and print
    Node *ptr = head;
    while (ptr) {
        printf("%d ", ptr->data);
        ptr = ptr->next;
    }
    printf("\n");

    free_list(head);
    return 0;
}