// src/components/study/python/topics/003_004_working-with-json/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Consuming REST API data using urllib / requests

const questions = [
  {
    question: "What is the key advantage of 'urllib.request' over the third-party 'requests' library?",
    shortAnswer: "'urllib.request' is part of Python's standard library, meaning it works out of the box in all Python environments with zero external package installations ('pip install') required.",
    explanation: "Standard library component available everywhere.",
    hint: "Built-in standard library with zero external dependencies.",
    level: "basic",
    codeExample: "import urllib.request"
  },
  {
    question: "Why is the third-party 'requests' library preferred in most production web projects?",
    shortAnswer: "'requests' provides a vastly simpler, human-friendly API, automatic JSON serialization ('json={...}'), built-in 'response.json()', automatic connection pooling, and simpler header/cookie management.",
    explanation: "Industry standard HTTP client for Python.",
    hint: "Simpler API, automatic JSON decoding (response.json()), and connection pooling.",
    level: "basic",
    codeExample: "import requests\ndata = requests.get('https://api.example.com/data').json()"
  },
  {
    question: "How do you pass custom HTTP headers (such as 'Authorization' or 'User-Agent') in 'urllib.request'?",
    shortAnswer: "By constructing a 'urllib.request.Request(url, headers={\"User-Agent\": \"...\", \"Authorization\": \"Bearer ...\"})' object before passing it to 'urlopen()'.",
    explanation: "Request envelopes encapsulate URL and custom headers.",
    hint: "Construct a urllib.request.Request object with headers dictionary.",
    level: "basic",
    codeExample: "req = urllib.request.Request(url, headers={'Accept': 'application/json'})\nwith urllib.request.urlopen(req) as res: ..."
  },
  {
    question: "How does 'requests.post(url, json=data)' handle serialization and headers automatically?",
    shortAnswer: "It automatically serializes the 'data' dictionary into a JSON string and sets the 'Content-Type: application/json' HTTP header automatically.",
    explanation: "Eliminates manual json.dumps() and manual header definition.",
    hint: "Serializes dict to JSON and sets Content-Type: application/json automatically.",
    level: "basic",
    codeExample: "requests.post(url, json={'user': 'Sourav', 'fee': 28000})"
  },
  {
    question: "What does 'response.raise_for_status()' do in the 'requests' library?",
    shortAnswer: "It checks the HTTP response status code; if it is a 4xx (Client Error) or 5xx (Server Error), it automatically raises a 'requests.exceptions.HTTPError' exception.",
    explanation: "Gating mechanism preventing code from processing corrupt error responses as valid data.",
    hint: "Raises HTTPError if the response code is 4xx or 5xx.",
    level: "basic",
    codeExample: "res = requests.get(url)\nres.raise_for_status() # Raises on 404/500"
  },
  {
    question: "What is the default timeout value for 'urllib.request.urlopen()' and 'requests.get()'?",
    shortAnswer: "By default, both 'urllib' and 'requests' have NO timeout (infinite timeout), meaning a stalled server will hang the Python thread/process indefinitely until the OS socket times out (often minutes).",
    explanation: "A critical production stability risk.",
    hint: "Default is infinite (no timeout); always specify timeout=5.0.",
    level: "basic",
    codeExample: "requests.get(url, timeout=5.0) # Always set timeout!"
  },
  {
    question: "How does 'timeout=(connect_timeout, read_timeout)' work in the 'requests' library?",
    shortAnswer: "It allows setting separate timeout thresholds: 'connect_timeout' (time to establish TCP connection) and 'read_timeout' (time waiting for the server to send the first byte after connecting).",
    explanation: "Fine-grained network timeout control.",
    hint: "Pass a tuple (connect_timeout, read_timeout) to timeout argument.",
    level: "moderate",
    codeExample: "requests.get(url, timeout=(3.05, 10.0))"
  },
  {
    question: "What is 'Exponential Backoff' and why is it essential for API retry loops?",
    shortAnswer: "A retry strategy where the delay doubles after each failed attempt (e.g. 0.5s -> 1.0s -> 2.0s -> 4.0s), preventing client retry storms from overwhelming a recovering server.",
    explanation: "Standard distributed systems reliability pattern.",
    hint: "Doubles retry delay after each attempt to avoid overwhelming servers.",
    level: "moderate",
    codeExample: "time.sleep(backoff); backoff *= 2"
  },
  {
    question: "How do you handle 'urllib.error.HTTPError' vs 'urllib.error.URLError'?",
    shortAnswer: "'HTTPError' is raised when the remote server responds with a 4xx/5xx code (has 'exc.code'); 'URLError' is a parent exception raised on network level failures (DNS failure, connection refused).",
    explanation: "HTTPError is a subclass of URLError.",
    hint: "HTTPError = server responded with 4xx/5xx; URLError = network/DNS connection failed.",
    level: "moderate",
    codeExample: "try: ...\nexcept urllib.error.HTTPError as e: print(e.code)\nexcept urllib.error.URLError as e: print(e.reason)"
  },
  {
    question: "How do you implement a local disk cache with Time-To-Live (TTL) for API responses?",
    shortAnswer: "By storing API JSON payloads alongside a timestamp ('cached_at: time.time()'); on subsequent requests, check 'if time.time() - cached_at < TTL: return cached_data' before making a network call.",
    explanation: "Drastically reduces API latency and protects rate limit quotas.",
    hint: "Store cached_at timestamp and compare with current time against TTL.",
    level: "moderate",
    codeExample: "if time.time() - cache['time'] < 300: return cache['data']"
  },
  {
    question: "How do you pass URL query parameters in 'requests.get()'?",
    shortAnswer: "By passing a dictionary to the 'params' argument: 'requests.get(\"https://api.com/search\", params={\"query\": \"python\", \"page\": 2})'.",
    explanation: "Automatically URL-encodes special characters and query strings.",
    hint: "Pass a dictionary to the params argument in requests.get().",
    level: "basic",
    codeExample: "requests.get(url, params={'campus': 'Barrackpore', 'limit': 10})"
  },
  {
    question: "How do you pass URL query parameters in 'urllib.request'?",
    shortAnswer: "By encoding the query dictionary using 'urllib.parse.urlencode(params)' and appending it to the URL: 'f\"{base_url}?{urllib.parse.urlencode(params)}\"'.",
    explanation: "Standard library query parameter encoding.",
    hint: "Use urllib.parse.urlencode(params) and append to URL with '?'.",
    level: "basic",
    codeExample: "import urllib.parse\nurl = f'{base_url}?{urllib.parse.urlencode(params)}'"
  },
  {
    question: "What is a 'Session' object ('requests.Session()') and why should you use it?",
    shortAnswer: "'requests.Session()' persists cookies across requests, reuses underlying TCP connections (HTTP Keep-Alive / connection pooling), and avoids reconnect overhead, speeding up multi-request pipelines by 3x-5x.",
    explanation: "Essential for high-volume API consumption.",
    hint: "Reuses TCP connections and persists cookies for major performance gains.",
    level: "moderate",
    codeExample: "with requests.Session() as s:\n    s.get(url1); s.get(url2)"
  },
  {
    question: "How do you consume a streaming JSON API response with 'requests' without loading it all into memory?",
    shortAnswer: "By setting 'stream=True' in 'requests.get(url, stream=True)' and iterating over lines with 'response.iter_lines()': 'for line in response.iter_lines(): yield json.loads(line)'.",
    explanation: "Constant O(1) memory for infinite streaming APIs and SSE feeds.",
    hint: "Use stream=True and iterate over response.iter_lines().",
    level: "complex",
    codeExample: "for line in requests.get(url, stream=True).iter_lines(): ..."
  },
  {
    question: "What HTTP status code indicates that you have exceeded an API's Rate Limit?",
    shortAnswer: "HTTP 429 Too Many Requests (often accompanied by a 'Retry-After: <seconds>' HTTP response header).",
    explanation: "Standard rate limiting response code.",
    hint: "HTTP 429 Too Many Requests.",
    level: "basic",
    codeExample: "if response.status_code == 429: time.sleep(float(response.headers.get('Retry-After', 1)))"
  },
  {
    question: "How do you authenticate using HTTP Basic Auth in 'requests'?",
    shortAnswer: "By passing a 2-tuple to the 'auth' parameter: 'requests.get(url, auth=(\"username\", \"password\"))'.",
    explanation: "Encodes credentials in Base64 Authorization header.",
    hint: "Pass auth=('user', 'pass') to requests.get().",
    level: "basic",
    codeExample: "requests.get(url, auth=('admin', 'secret_key'))"
  },
  {
    question: "How do you authenticate using Bearer JWT tokens in 'requests'?",
    shortAnswer: "By passing the Authorization header: 'headers={\"Authorization\": f\"Bearer {jwt_token}\"}'.",
    explanation: "The standard authentication protocol for modern REST APIs.",
    hint: "Set Authorization: Bearer <token> in headers dictionary.",
    level: "basic",
    codeExample: "headers = {'Authorization': f'Bearer {token}'}"
  },
  {
    question: "What is 'urllib3' and how does it relate to 'requests'?",
    shortAnswer: "'requests' is a high-level wrapper built directly on top of 'urllib3', which provides the low-level connection pooling, SSL verification, and thread-safe HTTP client logic.",
    explanation: "Architectural relationship between requests and urllib3.",
    hint: "urllib3 is the underlying low-level connection library powering requests.",
    level: "moderate",
    codeExample: "# requests uses urllib3 internally"
  },
  {
    question: "How do you handle self-signed SSL certificates in 'requests' during local development?",
    shortAnswer: "By passing 'verify=False' to bypass SSL verification: 'requests.get(url, verify=False)' (Caution: insecure in production).",
    explanation: "Disables SSL certificate verification for local test servers.",
    hint: "Pass verify=False to disable SSL checks during local development.",
    level: "basic",
    codeExample: "requests.get('https://localhost:8443', verify=False)"
  },
  {
    question: "What happens if 'response.json()' is called on a response that returned HTML or plain text instead of JSON?",
    shortAnswer: "It raises 'json.decoder.JSONDecodeError' (or 'requests.exceptions.JSONDecodeError' in newer versions) because the response body cannot be parsed as JSON.",
    explanation: "Always check Content-Type or wrap in try...except.",
    hint: "Raises JSONDecodeError when the response body is not valid JSON.",
    level: "basic",
    codeExample: "try: data = res.json()\nexcept ValueError: data = {'raw_text': res.text}"
  },
  {
    question: "How do you download a large file (e.g. 1GB JSON export) using 'requests' with constant RAM?",
    shortAnswer: "Using 'requests.get(url, stream=True)' and writing chunks in a loop: 'with open(dest, \"wb\") as f: for chunk in res.iter_content(chunk_size=8192): f.write(chunk)'.",
    explanation: "Chunked streaming pattern for large files.",
    hint: "Use stream=True and iterate over res.iter_content(chunk_size=8192).",
    level: "moderate",
    codeExample: "for chunk in res.iter_content(chunk_size=8192): f.write(chunk)"
  },
  {
    question: "How do you inspect the final URL after following HTTP 301/302 redirects in 'requests'?",
    shortAnswer: "By accessing 'response.url' and inspecting the redirect history with 'response.history'.",
    explanation: "Tracks redirect chains automatically.",
    hint: "Use response.url for final URL and response.history for redirect list.",
    level: "moderate",
    codeExample: "print(response.url, response.history)"
  },
  {
    question: "What is the 'urllib.robotparser' module used for?",
    shortAnswer: "It parses web servers' 'robots.txt' files to check whether a web crawler or API scraper is permitted to fetch specific URL paths.",
    explanation: "Standard compliance tool for polite web crawlers.",
    hint: "Parses robots.txt to determine crawler access permissions.",
    level: "moderate",
    codeExample: "import urllib.robotparser"
  },
  {
    question: "How do you test API clients locally without making actual internet requests?",
    shortAnswer: "By using mock libraries like 'unittest.mock.patch', 'responses', or 'pytest-mock' to mock HTTP calls and return canned JSON responses.",
    explanation: "Ensures fast, isolated, deterministic unit tests.",
    hint: "Use unittest.mock.patch('requests.get') to simulate network responses.",
    level: "moderate",
    codeExample: "@patch('requests.get')\ndef test_api(mock_get): mock_get.return_value.json.return_value = {'ok': True}"
  },
  {
    question: "What is the ultimate golden rule for Consuming REST APIs in Python?",
    shortAnswer: "Always set explicit timeouts, check status codes with 'raise_for_status()', parse JSON with 'response.json()' or 'json.load()', implement exponential backoff retries for transient errors, and protect API limits with local TTL caching.",
    explanation: "The complete enterprise blueprint for robust, production-ready REST API clients.",
    hint: "Explicit timeouts, raise_for_status, exponential backoff retries, and TTL caching.",
    level: "basic",
    codeExample: "# Python REST API Client Mastery"
  }
];

export default questions;
