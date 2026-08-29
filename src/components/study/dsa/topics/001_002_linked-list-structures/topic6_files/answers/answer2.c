#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

int count_nodes_and_print_memory(Node *head) {
    int count = 0;
    Node *curr = head;
    printf("--- Node Memory Layout Inspection ---\n");
    while (curr) {
        count++;
        printf("Node %d: Value=%d, RAM Address=%p, Next Address=%p\n", count, curr->data, (void*)curr, (void*)curr->next);
        curr = curr->next;
    }
    return count;
}

int main() {
    Node *n3 = (Node*)malloc(sizeof(Node)); n3->data = 300; n3->next = NULL;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 200; n2->next = n3;
    Node *n1 = (Node*)malloc(sizeof(Node)); n1->data = 100; n1->next = n2;

    int total = count_nodes_and_print_memory(n1);
    printf("Total Node Count = %d\n", total);

    free(n1); free(n2); free(n3);
    return 0;
}
