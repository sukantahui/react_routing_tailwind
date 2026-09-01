// callback_event.c – Simple event system with callbacks
#include <stdio.h>

#define MAX_CALLBACKS 10

// Callback type: takes an event ID and a user data pointer
typedef void (*EventHandler)(int event, void *user_data);

// Structure to hold a registered callback
typedef struct {
    EventHandler handler;
    void *data;
} CallbackEntry;

// Event system
static CallbackEntry callbacks[MAX_CALLBACKS];
static int callback_count = 0;

// Register a callback for an event
int register_callback(EventHandler handler, void *user_data) {
    if (callback_count >= MAX_CALLBACKS) {
        return -1; // no space
    }
    callbacks[callback_count].handler = handler;
    callbacks[callback_count].data = user_data;
    callback_count++;
    return 0;
}

// Trigger an event – call all registered callbacks
void trigger_event(int event) {
    for (int i = 0; i < callback_count; i++) {
        if (callbacks[i].handler != NULL) {
            callbacks[i].handler(event, callbacks[i].data);
        }
    }
}

// Example callbacks
void on_button_click(int event, void *data) {
    int *id = (int *)data;
    printf("Button %d clicked (event %d)\n", *id, event);
}

void on_timer_expire(int event, void *data) {
    char *msg = (char *)data;
    printf("Timer expired: %s (event %d)\n", msg, event);
}

int main() {
    int btn_id1 = 1, btn_id2 = 2;
    char timer_msg[] = "Time's up!";

    register_callback(on_button_click, &btn_id1);
    register_callback(on_button_click, &btn_id2);
    register_callback(on_timer_expire, timer_msg);

    // Simulate events
    trigger_event(100); // some event id
    return 0;
}