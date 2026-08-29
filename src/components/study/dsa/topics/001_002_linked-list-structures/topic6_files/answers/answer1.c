#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* insert_at_head(Node *head, int val) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (!new_node) return head;
    new_node->data = val;
    new_node->next = head;
    return new_node;
}

void print_list(Node *head) {
    printf("Head -> ");
    Node *curr = head;
    while (curr) {
        printf("[%d | next] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\n");
}

void free_list(Node *head) {
    Node *curr = head;
    while (curr) {
        Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
}

int main() {
    Node *head = NULL;
    printf("--- Singly Linked List Head Insertion ---\n");
    head = insert_at_head(head, 30);
    head = insert_at_head(head, 20);
    head = insert_at_head(head, 10);

    print_list(head);
    free_list(head);
    return 0;
}
