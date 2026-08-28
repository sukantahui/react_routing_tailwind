// Tabbed Interface
// HTML: <div class="tabs">
//   <button class="tab-btn active" data-tab="tab1">Tab 1</button>
//   <button class="tab-btn" data-tab="tab2">Tab 2</button>
//   <button class="tab-btn" data-tab="tab3">Tab 3</button>
// </div>
// <div class="tab-content active" id="tab1">Content 1</div>
// <div class="tab-content" id="tab2">Content 2</div>
// <div class="tab-content" id="tab3">Content 3</div>

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        // remove active from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        // add active to current
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});
