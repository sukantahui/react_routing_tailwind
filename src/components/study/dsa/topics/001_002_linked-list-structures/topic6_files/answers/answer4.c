#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* delete_by_key(Node *head, int key) {
    if (!head) return NULL;
    if (head->data == key) {
        Node *temp = head->next;
        free(head);
        return temp;
    }

    Node *curr = head;
    while (curr->next && curr->next->data != key) {
        curr = curr->next;
    }

    if (curr->next) {
        Node *temp = curr->next;
        curr->next = curr->next->next;
        free(temp);
    }
    return head;
}

void print_list(Node *head) {
    Node *curr = head;
    while (curr) { printf("%d -> ", curr->data); curr = curr->next; }
    printf("NULL\n");
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 10;
    head->next = (Node*)malloc(sizeof(Node)); head->next->data = 20;
    head->next->next = (Node*)malloc(sizeof(Node)); head->next->next->data = 30; head->next->next->next = NULL;

    printf("--- Node Deletion by Key ---\nBefore: "); print_list(head);
    head = delete_by_key(head, 20);
    printf("After Deleting 20: "); print_list(head);

    return 0;
}
