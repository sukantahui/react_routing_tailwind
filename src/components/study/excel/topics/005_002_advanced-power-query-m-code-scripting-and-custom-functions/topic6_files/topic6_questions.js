// topic6_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 6
// Topic: Web scraping and REST API data ingestion with Power Query (Web.Contents and Json.Document)
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary M function used to make HTTP/HTTPS network requests?",
    shortAnswer: "`Web.Contents(url, [options])`.",
    explanation: "Returns the binary content downloaded from the target URL endpoint.",
    hint: "Web.Contents(url, options).",
    level: "basic",
    codeExample: "= Web.Contents(\"https://api.exchangerate.host/latest\")"
  },
  {
    question: "What function parses a binary JSON payload into native M records and lists?",
    shortAnswer: "`Json.Document(binaryContent)`.",
    explanation: "Deserializes JSON text/binary into M structured types.",
    hint: "Json.Document(Binary).",
    level: "basic",
    codeExample: "= Json.Document(Web.Contents(\"https://api.example.com/data\"))"
  },
  {
    question: "Why should you NEVER concatenate dynamic query parameters directly into the main URL string in `Web.Contents`?",
    shortAnswer: "Direct string concatenation creates dynamic URLs that the Power BI Service cannot evaluate statically for authentication, breaking scheduled refreshes with a 'Dynamic Data Source' error.",
    explanation: "Power BI requires a static base URL for credential validation.",
    hint: "Breaks scheduled refresh in Power BI Service with 'Dynamic Data Source' error.",
    level: "expert",
    codeExample: "Bad: Web.Contents(Base & \"?key=\" & Key)\nGood: Web.Contents(Base, [Query=[key=Key]])"
  },
  {
    question: "How should dynamic URL endpoints and query parameters be passed to `Web.Contents` correctly?",
    shortAnswer: "Using the `RelativePath` and `Query` record options: `Web.Contents(\"https://api.example.com\", [RelativePath = \"v1/rates\", Query = [base = \"USD\", symbols = \"INR\"]])`.",
    explanation: "Preserves static base URL for authentication while allowing dynamic paths.",
    hint: "Use [RelativePath = \"...\", Query = [...]] options.",
    level: "expert",
    codeExample: "= Web.Contents(\"https://api.bank.com\", [RelativePath=\"v2/rates\", Query=[currency=\"INR\"]])"
  },
  {
    question: "How do you pass HTTP request headers (like Authorization or User-Agent) in `Web.Contents`?",
    shortAnswer: "Using the `Headers` option inside the options record: `[Headers = [#\"Authorization\" = \"Bearer \" & p_Token, #\"Content-Type\" = \"application/json\"]]`.",
    explanation: "Attaches custom HTTP headers to the outbound request.",
    hint: "Headers = [#\"Authorization\" = \"Bearer ...\"].",
    level: "moderate",
    codeExample: "= Web.Contents(BaseURL, [Headers=[#\"Authorization\"=\"Bearer secret_token_123\"]])"
  },
  {
    question: "How do you make an HTTP POST request instead of a GET request in M?",
    shortAnswer: "Include the `Content` option in `Web.Contents`, passing the request body as binary: `[Content = Text.ToBinary(\"{\\\"symbol\\\":\\\"AAPL\\\"}\")]`.",
    explanation: "Supplying a binary `Content` payload automatically converts the HTTP method from GET to POST.",
    hint: "Include [Content = Text.ToBinary(\"...\")] to trigger POST.",
    level: "advanced",
    codeExample: "= Web.Contents(URL, [Content=Text.ToBinary(Json.FromValue([ID=101]))])"
  },
  {
    question: "What does `Web.Page` do, and how is it used for web scraping in M?",
    shortAnswer: "`Web.Page(Web.Contents(url))` renders HTML in a headless browser parser and returns a table of all HTML `<table>` elements detected on the webpage.",
    explanation: "HTML table scraper engine.",
    hint: "Web.Page extracts HTML tables from web pages.",
    level: "moderate",
    codeExample: "= Web.Page(Web.Contents(\"https://en.wikipedia.org/wiki/List_of_currencies\"))"
  },
  {
    question: "What is the return type of `Json.Document` when the API root is an object `{...}`?",
    shortAnswer: "An M **Record** (`[...]`).",
    explanation: "JSON objects map directly to M Records.",
    hint: "JSON object {} &rarr; M Record [...].",
    level: "basic",
    codeExample: "RootRecord = Json.Document(Web.Contents(...)) // type record"
  },
  {
    question: "What is the return type of `Json.Document` when the API root is an array `[...]`?",
    shortAnswer: "An M **List** (`{...}`).",
    explanation: "JSON arrays map directly to M Lists of Records or Primitives.",
    hint: "JSON array [] &rarr; M List {...}.",
    level: "basic",
    codeExample: "RootList = Json.Document(Web.Contents(...)) // type list"
  },
  {
    question: "How do you convert a List of JSON records into an M Table?",
    shortAnswer: "Using `Table.FromList(MyList, Splitter.SplitByNothing())` &rarr; then expand columns via `Table.ExpandRecordColumn`.",
    explanation: "Standard pipeline from JSON array to 2D table grid.",
    hint: "Table.FromList &rarr; Table.ExpandRecordColumn.",
    level: "moderate",
    codeExample: "= Table.FromList(JsonList, Splitter.SplitByNothing(), {\"Column1\"})"
  },
  {
    question: "What does `ManualStatusHandling` do in `Web.Contents`?",
    shortAnswer: "It prevents Power Query from crashing immediately on HTTP error status codes (e.g. 404, 500), allowing M script to inspect the response and handle errors gracefully: `[ManualStatusHandling = {400, 404, 500}]`.",
    explanation: "Intercepts HTTP error codes for custom error handling.",
    hint: "ManualStatusHandling = {400, 404, 500} prevents fatal crashes on HTTP errors.",
    level: "expert",
    codeExample: "= Web.Contents(URL, [ManualStatusHandling={404, 500}])"
  },
  {
    question: "How do you extract the HTTP response status code in M?",
    shortAnswer: "Using `Value.Metadata(Response)[Response.Status]` on the binary response object.",
    explanation: "Inspects metadata attached to the Web.Contents binary stream.",
    hint: "Value.Metadata(Response)[Response.Status].",
    level: "expert",
    codeExample: "StatusCode = Value.Metadata(WebBinary)[Response.Status]"
  },
  {
    question: "How do you extract HTTP response headers (like Rate-Limit or Content-Type) in M?",
    shortAnswer: "Using `Value.Metadata(Response)[Headers]`.",
    explanation: "Returns the response headers as an M Record.",
    hint: "Value.Metadata(Response)[Headers].",
    level: "expert",
    codeExample: "RemainingCalls = Value.Metadata(WebBinary)[Headers][#\"x-ratelimit-remaining\"]"
  },
  {
    question: "What is `Json.FromValue` in M code?",
    shortAnswer: "It serializes any M structured data type (Record, List, Table) into a valid UTF-8 JSON text string.",
    explanation: "Inverse of Json.Document; used to serialize payloads for POST requests.",
    hint: "Serializes M Records/Tables into JSON text.",
    level: "moderate",
    codeExample: "JsonText = Text.FromBinary(Json.FromValue([Branch=\"BKP\", Year=2026]))"
  },
  {
    question: "How do you handle nested arrays inside a JSON record when flattening to a table?",
    shortAnswer: "Use `Table.ExpandListColumn` to duplicate parent rows for each array item &rarr; then `Table.ExpandRecordColumn` to extract nested fields.",
    explanation: "Standard multi-level JSON flattening protocol.",
    hint: "Table.ExpandListColumn &rarr; Table.ExpandRecordColumn.",
    level: "moderate",
    codeExample: "Table.ExpandRecordColumn(Table.ExpandListColumn(T, \"Items\"), \"Items\", {\"SKU\", \"Qty\"})"
  },
  {
    question: "How do you handle API endpoints that return XML instead of JSON?",
    shortAnswer: "Using `Xml.Document(Web.Contents(url))` or `Xml.Tables(Web.Contents(url))`.",
    explanation: "XML parsing primitives in M.",
    hint: "Xml.Document or Xml.Tables.",
    level: "basic",
    codeExample: "= Xml.Tables(Web.Contents(\"https://api.example.com/feed.xml\"))"
  },
  {
    question: "Why should you avoid hardcoding Bearer tokens in M scripts pushed to public repositories?",
    shortAnswer: "Hardcoded tokens expose private API keys in plain text; use Power Query Web Authentication credentials or parameters stored securely.",
    explanation: "Security compliance for credential management.",
    hint: "Exposes private credentials; use Web.Contents native auth or secure parameters.",
    level: "basic",
    codeExample: "Use Power Query Data Source Credentials &rarr; 'Web API'"
  },
  {
    question: "What is the `Timeout` option in `Web.Contents`?",
    shortAnswer: "A duration value specifying how long to wait for an API response before timing out: `[Timeout = #duration(0, 0, 2, 0)]` (2 minutes).",
    explanation: "Overrides the default HTTP request timeout.",
    hint: "Timeout = #duration(Days, Hours, Min, Sec).",
    level: "moderate",
    codeExample: "= Web.Contents(URL, [Timeout=#duration(0, 0, 1, 30)])"
  },
  {
    question: "How do you convert a 1D JSON Key-Value dictionary object into a 2-column Table in M?",
    shortAnswer: "Using `Record.ToTable(Json.Document(Web.Contents(url)))`.",
    explanation: "Transforms key-value pairs into 'Name' and 'Value' table columns.",
    hint: "Record.ToTable(JsonRecord).",
    level: "basic",
    codeExample: "FX_Table = Record.ToTable(Json.Document(Web.Contents(url))[rates])"
  },
  {
    question: "Can Power Query scrape tables from web pages protected by basic username/password authentication?",
    shortAnswer: "Yes; configure Basic Authentication under Data Source Settings &rarr; Edit Permissions &rarr; Select 'Basic' and enter credentials.",
    explanation: "Native credential management handles HTTP Basic Auth headers automatically.",
    hint: "Yes; configure 'Basic' credentials in Data Source Settings.",
    level: "basic",
    codeExample: "Data Source Settings &rarr; Edit Permissions &rarr; Basic Auth"
  },
  {
    question: "How do you scrape tables from websites that load data dynamically using client-side JavaScript?",
    shortAnswer: "`Web.Page` evaluates basic HTML DOM, but for heavy JavaScript (Single Page Apps), inspect browser DevTools Network tab to locate and query the underlying REST API JSON endpoint directly.",
    explanation: "Bypassing frontend JavaScript by targeting backend REST APIs.",
    hint: "Inspect Network tab in DevTools to find and query the backend JSON endpoint.",
    level: "expert",
    codeExample: "Target raw JSON API endpoint directly instead of scraping JS DOM!"
  },
  {
    question: "What is `Binary.Buffer` in web API ingestion?",
    shortAnswer: "It caches the downloaded HTTP binary response in RAM, ensuring that subsequent parsing steps do not trigger duplicate network requests.",
    explanation: "Eliminates redundant HTTP roundtrips.",
    hint: "Caches HTTP binary in RAM to prevent duplicate API requests.",
    level: "expert",
    codeExample: "CachedResponse = Binary.Buffer(Web.Contents(URL))"
  },
  {
    question: "How do you handle API responses where date fields are formatted in ISO-8601 (e.g. `\"2026-08-27T10:30:00Z\"`)?",
    shortAnswer: "Use `DateTimeZone.FromText([DateStr])` &rarr; then convert to local time with `DateTimeZone.ToLocal` if needed.",
    explanation: "Standard UTC ISO-8601 parsing.",
    hint: "DateTimeZone.FromText([DateStr]).",
    level: "moderate",
    codeExample: "= DateTimeZone.FromText(\"2026-08-27T10:30:00Z\")"
  },
  {
    question: "How do you mock API JSON data for offline development in M?",
    shortAnswer: "Pass a JSON string literal into `Json.Document(Text.ToBinary(\"{\\\"status\\\":\\\"success\\\", \\\"data\\\": [10, 20]}\"))`.",
    explanation: "Allows testing schema transformations without live internet connection.",
    hint: "Json.Document(Text.ToBinary(\"...\")).",
    level: "moderate",
    codeExample: "MockJSON = Json.Document(Text.ToBinary(\"{\\\"rates\\\":{\\\"INR\\\":83.50}}\"))"
  },
  {
    question: "What does the `ApiKeyName` option do in `Web.Contents`?",
    shortAnswer: "Specifies the query parameter name or header name where Power Query's built-in Web API key credential should be automatically injected: `[ApiKeyName = \"api_key\"]`.",
    explanation: "Integrates with Power Query credential store for API keys.",
    hint: "ApiKeyName = \"api_key\" injects secure key credential automatically.",
    level: "expert",
    codeExample: "= Web.Contents(BaseURL, [ApiKeyName=\"apikey\"])"
  },
  {
    question: "How do you convert nested JSON lists into delimited comma-separated strings inside a table column?",
    shortAnswer: "Use `Table.TransformColumns(Source, {{\"Tags\", each Text.Combine(List.Transform(_, Text.From), \", \"), type text}})`.",
    explanation: "In-place list aggregation without row duplication.",
    hint: "Text.Combine(List, \", \").",
    level: "moderate",
    codeExample: "= Table.TransformColumns(T, {{\"Tags\", each Text.Combine(_, \", \"), type text}})"
  },
  {
    question: "Why does Power Query block web scraping queries across different privacy levels?",
    shortAnswer: "The Power Query Formula Firewall blocks data leakage to prevent sensitive data from private sources (like internal SQL databases) from being sent as query strings to public web servers.",
    explanation: "Data privacy firewall prevents unauthorized exfiltration.",
    hint: "Formula Firewall prevents private data leakage to public web servers.",
    level: "expert",
    codeExample: "Formula.Firewall: Data Privacy Level isolation"
  },
  {
    question: "How do you download and extract a compressed ZIP or GZIP payload from a Web API in M?",
    shortAnswer: "Pass the binary response to `Binary.Decompress(WebBinary, CompressionType.GZip)` before parsing with `Json.Document`.",
    explanation: "Decompresses gzip HTTP streams in memory.",
    hint: "Binary.Decompress(WebBinary, CompressionType.GZip).",
    level: "expert",
    codeExample: "Decompressed = Json.Document(Binary.Decompress(WebBinary, CompressionType.GZip))"
  },
  {
    question: "What is the recommended approach for refreshing exchange rates daily in financial models?",
    shortAnswer: "Connect to a reliable central bank or FX REST API using `Web.Contents` + `Json.Document`, transform rates into a 2-column table `[Currency, Rate]`, and relate it in Power Pivot.",
    explanation: "Automated daily currency normalization.",
    hint: "Query FX API via Web.Contents &rarr; relate rate table in Power Pivot.",
    level: "basic",
    codeExample: "Daily FX API query related to Fact_Sales in Power Pivot"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Web APIs and JSON Ingestion?",
    shortAnswer: "Always isolate base URLs with `RelativePath` and `Query`! Never concatenate dynamic URLs directly, always cache responses with `Binary.Buffer` or `Table.Buffer` to avoid hammering APIs, use `ManualStatusHandling` for defensive error interception, and inspect DevTools Network tabs to query backend REST APIs rather than fighting messy frontend HTML DOMs!",
    explanation: "Clean REST API integration is the hallmark of modern enterprise business intelligence!",
    hint: "RelativePath + Query + Binary.Buffer + ManualStatusHandling = Invincible API Architecture!",
    level: "expert",
    codeExample: "Rule: Web.Contents(Base, [RelativePath=\"v1/data\", Query=[k=v]]) + Json.Document!"
  }
];

export default questions;
