// Default Parameters with Object Destructuring
function configure({ port = 3000, host = 'localhost' } = {}) {
    console.log(`Server running on ${host}:${port}`);
}

configure();               // Server running on localhost:3000
configure({ port: 8080 }); // Server running on localhost:8080
configure({ host: 'example.com', port: 80 }); // Server running on example.com:80
