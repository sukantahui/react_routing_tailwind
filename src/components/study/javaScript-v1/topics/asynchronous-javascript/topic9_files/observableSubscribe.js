// observableSubscribe.js – RxJS Observable
import { Observable } from 'rxjs';

// Create an observable that emits mouse clicks (simulated)
const clicks$ = new Observable(subscriber => {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    subscriber.next(`Click #${count} from Naihati`);
    if (count === 5) {
      subscriber.complete();
      clearInterval(interval);
    }
  }, 1000);

  // Teardown
  return () => clearInterval(interval);
});

// Subscribe
const subscription = clicks$.subscribe({
  next: msg => console.log(msg),
  error: err => console.error('Error:', err),
  complete: () => console.log('No more clicks')
});

// Unsubscribe after 3 seconds
setTimeout(() => subscription.unsubscribe(), 3000);