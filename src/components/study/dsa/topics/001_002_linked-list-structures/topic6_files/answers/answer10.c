#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* delete_at_position(Node *head, int k) {
    if (!head || k < 0) return head;
    if (k == 0) {
        Node *temp = head->next;
        free(head);
        return temp;
    }
    Node *curr = head;
    for (int i = 0; curr && i < k - 1; i++) {
        curr = curr->next;
    }
    if (curr && curr->next) {
        Node *temp = curr->next;
        curr->next = curr->next->next;
        free(temp);
    }
    return head;
}

void print_list(Node *head) {
    Node *c = head; while (c) { printf("%d -> ", c->data); c = c->next; } printf("NULL\n");
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 5;
    head->next = (Node*)malloc(sizeof(Node)); head->next->data = 15;
    head->next->next = (Node*)malloc(sizeof(Node)); head->next->next->data = 25; head->next->next->next = NULL;

    printf("--- Delete Node at Position K ---\nBefore: "); print_list(head);
    head = delete_at_position(head, 1);
    printf("After deleting pos 1: "); print_list(head);

    return 0;
}
