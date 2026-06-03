// msgqueue_client.c – sends messages to a System V message queue
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
    int msqid = msgget(MSG_KEY, 0666);
    if (msqid == -1) {
        perror("msgget (server not running?)");
        exit(1);
    }

    struct msgbuf msg;
    msg.mtype = 1;

    printf("Client: connected to queue %d. Enter messages (type 'exit' to quit):\n", msqid);

    while (1) {
        printf("> ");
        fflush(stdout);
        if (!fgets(msg.mtext, MSG_SIZE, stdin)) break;
        msg.mtext[strcspn(msg.mtext, "\n")] = 0;

        if (msgsnd(msqid, &msg, strlen(msg.mtext) + 1, 0) == -1) {
            perror("msgsnd");
            break;
        }
        if (strcmp(msg.mtext, "exit") == 0) break;
    }
    return 0;
}