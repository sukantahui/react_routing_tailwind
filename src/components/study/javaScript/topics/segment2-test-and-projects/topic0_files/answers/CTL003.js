// Project: Switch – Day of Week
// Description: Given a number (1‑7), use switch to output the day name.


function getDayName(dayNum) {
    switch(dayNum) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
        default: return 'Invalid day';
    }
}
console.log('Day 3:', getDayName(3));
console.log('Day 7:', getDayName(7));

