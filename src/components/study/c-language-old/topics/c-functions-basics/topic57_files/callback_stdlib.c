// callback_stdlib.c – Using standard library callbacks
#include <stdio.h>
#include <stdlib.h>   // for qsort, atexit
#include <signal.h>   // for signal
#include <unistd.h>   // for sleep (POSIX)

// Comparator callback for qsort (ascending)
int compare_int(const void *a, const void *b) {
    int ia = *(int *)a;
    int ib = *(int *)b;
    return ia - ib;
}

// atexit callback – called when program exits normally
void cleanup(void) {
    printf("Cleaning up resources...\n");
}

// Signal handler callback for SIGINT (Ctrl+C)
void sigint_handler(int sig) {
    printf("\nCaught signal %d – exiting gracefully.\n", sig);
    // In real code, be careful what you do in signal handlers
    exit(0);
}

int main() {
    // Register exit handler
    atexit(cleanup);

    // Set up signal handler
    signal(SIGINT, sigint_handler);

    // Use qsort with comparator callback
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = sizeof(arr) / sizeof(arr[0]);

    qsort(arr, n, sizeof(int), compare_int);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    printf("Press Ctrl+C to trigger signal handler...\n");
    sleep(3); // give user time to press Ctrl+C

    return 0;
}