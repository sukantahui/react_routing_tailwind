// DOM Tree Explorer
function printDOMTree(node, indent = '') {
    if (node.nodeType === Node.ELEMENT_NODE) {
        console.log(indent + node.tagName.toLowerCase());
        for (let i = 0; i < node.children.length; i++) {
            printDOMTree(node.children[i], indent + '  ');
        }
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        console.log(indent + '"' + node.textContent.trim() + '"');
    }
}

// Start from document body (or document.documentElement for full HTML)
console.log('DOM Tree:');
printDOMTree(document.body);
