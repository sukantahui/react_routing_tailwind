// msgqueue_server.c – receives messages from a System V message queue
#include <stdio.h>
#include <stdlib.h>
#include <sys/msg.h>
#include <string.h>
#include <unistd.h>

#define MSG_KEY 1234
#define MSG_SIZE 256

struct msgbuf {
    long mtype;
    char mtext[MSG_SIZE];
};

int main() {
    int msqid = msgget(MSG_KEY, IPC_CREAT | 0666);
    if (msqid == -1) {
        perror("msgget");
        exit(1);
    }

    printf("Server: message queue created with id %d\n", msqid);
    printf("Waiting for messages...\n");

    struct msgbuf msg;
    while (1) {
        ssize_t n = msgrcv(msqid, &msg, MSG_SIZE, 1, 0);
        if (n == -1) {
            perror("msgrcv");
            break;
        }
        printf("Received (type %ld): %s\n", msg.mtype, msg.mtext);
        if (strcmp(msg.mtext, "exit") == 0) {
            printf("Server: exiting.\n");
            break;
        }
    }

    msgctl(msqid, IPC_RMID, NULL);
    printf("Queue removed.\n");
    return 0;
}