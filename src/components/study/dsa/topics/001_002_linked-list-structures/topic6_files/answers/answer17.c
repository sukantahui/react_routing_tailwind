#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

void remove_duplicates_unsorted(Node *head) {
    Node *curr = head;
    while (curr) {
        Node *runner = curr;
        while (runner->next) {
            if (runner->next->data == curr->data) {
                Node *temp = runner->next;
                runner->next = runner->next->next;
                free(temp);
            } else {
                runner = runner->next;
            }
        }
        curr = curr->next;
    }
}

void print_list(Node *h) { while (h) { printf("%d -> ", h->data); h = h->next; } printf("NULL\n"); }

int main() {
    Node *h = (Node*)malloc(sizeof(Node)); h->data = 10;
    h->next = (Node*)malloc(sizeof(Node)); h->next->data = 20;
    h->next->next = (Node*)malloc(sizeof(Node)); h->next->next->data = 10;
    h->next->next->next = (Node*)malloc(sizeof(Node)); h->next->next->next->data = 30;
    h->next->next->next->next = NULL;

    printf("--- Remove Duplicates from Unsorted List ---\nBefore: "); print_list(h);
    remove_duplicates_unsorted(h);
    printf("After : "); print_list(h);

    return 0;
}
