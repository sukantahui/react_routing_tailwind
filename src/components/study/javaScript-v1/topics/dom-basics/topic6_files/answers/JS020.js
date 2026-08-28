// Custom Tooltip
// HTML: <div data-tooltip="This is a tooltip">Hover over me</div>
// <button data-tooltip="Click here for help">Help</button>

let tooltip = null;

function showTooltip(event) {
    const target = event.target;
    const text = target.getAttribute('data-tooltip');
    if (!text) return;
    
    if (tooltip) tooltip.remove();
    tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'black';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    document.body.appendChild(tooltip);
    
    const rect = target.getBoundingClientRect();
    tooltip.style.left = rect.left + window.scrollX + 'px';
    tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}

const tooltipElements = document.querySelectorAll('[data-tooltip]');
tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
});
