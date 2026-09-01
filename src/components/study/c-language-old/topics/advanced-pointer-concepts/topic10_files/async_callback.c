#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>  // for sleep

// Callback type for async operation
typedef void (*async_callback)(int result, void* user_data);

// Simulate an async operation (e.g., file read, network request)
void async_operation(int data, async_callback cb, void* user_data) {
    printf("Starting async operation with data=%d...\n", data);
    // Simulate work in background (here we just sleep and call callback)
    sleep(1);
    int result = data * 2;
    // Call the callback with result
    if (cb) cb(result, user_data);
}

// Our callback function
void my_callback(int result, void* user_data) {
    int* original = (int*)user_data;
    printf("Callback: result = %d (original was %d)\n", result, *original);
}

int main() {
    int value = 42;
    async_operation(value, my_callback, &value);
    // In real async code, we would continue doing other work here
    printf("Main continues while operation runs...\n");
    sleep(2); // wait for callback to finish (simulate)
    return 0;
}