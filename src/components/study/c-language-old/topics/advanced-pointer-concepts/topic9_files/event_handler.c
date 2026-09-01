#include <stdio.h>
#include <stdlib.h>

// Event type
typedef enum { EVENT_KEYPRESS, EVENT_MOUSE } EventType;

// Callback type: takes event type, event data, and user context
typedef void (*EventHandler)(EventType type, void* eventData, void* userData);

// Registry structure
typedef struct {
    EventHandler handler;
    void* userData;
} EventRegistration;

EventRegistration keyHandler = {NULL, NULL};

void registerKeyHandler(EventHandler h, void* data) {
    keyHandler.handler = h;
    keyHandler.userData = data;
}

void simulateKeyPress(int keyCode) {
    if (keyHandler.handler) {
        keyHandler.handler(EVENT_KEYPRESS, &keyCode, keyHandler.userData);
    } else {
        printf("No handler registered for key press.\n");
    }
}

// Example handler
void myKeyHandler(EventType type, void* eventData, void* userData) {
    if (type == EVENT_KEYPRESS) {
        int key = *(int*)eventData;
        char* name = (char*)userData;
        printf("%s received key press: %d\n", name, key);
    }
}

int main() {
    registerKeyHandler(myKeyHandler, "Student Swadeep");
    simulateKeyPress(65); // 'A'
    
    registerKeyHandler(NULL, NULL);
    simulateKeyPress(66); // no handler
    
    return 0;
}