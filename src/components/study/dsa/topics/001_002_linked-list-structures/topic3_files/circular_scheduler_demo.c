#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int pid; // Process ID
    int burstTime;
    struct Node *next;
} Node;

Node* createProcessNode(int pid, int burstTime) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->pid = pid;
    newNode->burstTime = burstTime;
    newNode->next = NULL;
    return newNode;
}

void insertCircular(Node **head, int pid, int burstTime) {
    Node *newNode = createProcessNode(pid, burstTime);
    if (*head == NULL) {
        *head = newNode;
        newNode->next = *head;
        return;
    }
    Node *curr = *head;
    while (curr->next != *head) {
        curr = curr->next;
    }
    curr->next = newNode;
    newNode->next = *head;
}

void roundRobinSchedule(Node *head, int timeQuantum) {
    printf("=== Round Robin CPU Scheduling Simulation (Time Quantum = %d) ===\n\n", timeQuantum);
    Node *curr = head;
    if (!curr) return;

    int activeProcesses = 3;
    while (activeProcesses > 0) {
        if (curr->burstTime > 0) {
            int execTime = (curr->burstTime > timeQuantum) ? timeQuantum : curr->burstTime;
            curr->burstTime -= execTime;
            printf("[CPU EXEC] Process P%d executed for %d ms (Remaining: %d ms)\n", curr->pid, execTime, curr->burstTime);

            if (curr->burstTime == 0) {
                printf(" -> Process P%d FINISHED execution!\n", curr->pid);
                activeProcesses--;
            }
        }
        curr = curr->next;
    }
}

int main() {
    Node *head = NULL;
    insertCircular(&head, 1, 10);
    insertCircular(&head, 2, 5);
    insertCircular(&head, 3, 8);

    roundRobinSchedule(head, 4);
    return 0;
}
