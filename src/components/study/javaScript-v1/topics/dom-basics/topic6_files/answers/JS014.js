// Infinite Scroll
// HTML: <div id="contentContainer"></div>

const container = document.getElementById('contentContainer');
let page = 1;
let loading = false;

function loadMore() {
    if (loading) return;
    loading = true;
    // Simulate async fetch
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            const item = document.createElement('div');
            item.textContent = `Item ${page * 10 + i}`;
            container.appendChild(item);
        }
        page++;
        loading = false;
    }, 500);
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
    }
});

loadMore(); // initial
