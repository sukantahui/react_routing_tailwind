// topic7_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 7
// Topic: Handling API pagination, authentication tokens, and rate limits in M
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "Why is API pagination challenging to implement in the Power Query M language?",
    shortAnswer: "Because M is a purely functional language without traditional mutable loop constructs (`for`, `while`); iterative loops must be expressed functionally using `List.Generate` or recursive functions.",
    explanation: "Functional immutability requires state-based generator loops.",
    hint: "M is purely functional without mutable while loops; requires List.Generate.",
    level: "basic",
    codeExample: "Loop in M: List.Generate(initial, condition, next, selector)"
  },
  {
    question: "What are the 4 arguments of `List.Generate` used for API pagination?",
    shortAnswer: "1. `initial` (Initial state generator), 2. `condition` (Continuation predicate), 3. `next` (Next state generator), and 4. `selector` (Optional projection function).",
    explanation: "Standard 4-parameter signature of List.Generate.",
    hint: "initial, condition, next, selector.",
    level: "moderate",
    codeExample: "List.Generate(()=> GetPage(1), each _ <> null, each GetPage([NextPage]), each [Data])"
  },
  {
    question: "How does page-number based pagination work in M using `List.Generate`?",
    shortAnswer: "Initialize at `Page = 1`, fetch data, increment `Page + 1` on each step, and terminate when the response returns zero records or an empty array.",
    explanation: "Numeric page increment loop.",
    hint: "Page = 1 &rarr; Page + 1 until records list is empty.",
    level: "moderate",
    codeExample: "List.Generate(()=> [P=1, D=Fetch(1)], each not List.IsEmpty([D]), each [P=[P]+1, D=Fetch([P]+1)], each [D])"
  },
  {
    question: "How does cursor-based / next-link pagination work in M?",
    shortAnswer: "The initial request fetches the first page and extracts a `next_cursor` token from the response header or JSON body; the loop continues fetching until `next_cursor = null`.",
    explanation: "Cursor token tracking loop.",
    hint: "Loop continues while [next_cursor] is not null.",
    level: "advanced",
    codeExample: "List.Generate(()=> Fetch(null), each [NextCursor] <> null, each Fetch([NextCursor]), each [Records])"
  },
  {
    question: "How do you combine the list of paginated page tables produced by `List.Generate` into a single consolidated table?",
    shortAnswer: "Using `Table.Combine(PaginatedList)`.",
    explanation: "Appends all page tables vertically in memory.",
    hint: "Table.Combine(ListOfPageTables).",
    level: "basic",
    codeExample: "ConsolidatedFact = Table.Combine(ListOfPageTables)"
  },
  {
    question: "How do you generate an OAuth2 Bearer token dynamically in M before requesting protected API data?",
    shortAnswer: "Make an HTTP POST request to the token URL using `Web.Contents` with `[Content = Text.ToBinary(\"grant_type=client_credentials&client_id=...\")]` &rarr; parse JSON &rarr; extract `[access_token]`.",
    explanation: "Automated two-step authentication handshake in M.",
    hint: "POST to /token endpoint &rarr; extract [access_token] from JSON response.",
    level: "expert",
    codeExample: "Token = Json.Document(Web.Contents(TokenURL, [Content=CredentialsBinary]))[access_token]"
  },
  {
    question: "How do you pass the dynamically generated OAuth access token to subsequent paginated requests?",
    shortAnswer: "Attach it to the `Headers` record: `[Headers = [#\"Authorization\" = \"Bearer \" & DynamicToken]]`.",
    explanation: "Injects runtime bearer credential into data requests.",
    hint: "Headers = [#\"Authorization\" = \"Bearer \" & Token].",
    level: "moderate",
    codeExample: "= Web.Contents(DataURL, [Headers=[#\"Authorization\"=\"Bearer \" & p_AccessToken]])"
  },
  {
    question: "What is an API rate limit, and what HTTP status code signals that the limit has been exceeded?",
    shortAnswer: "A quota on the maximum number of requests allowed per second/minute; signaled by HTTP status code `429 Too Many Requests`.",
    explanation: "API throttling standard.",
    hint: "HTTP 429 Too Many Requests.",
    level: "basic",
    codeExample: "HTTP Status 429 = Rate Limit Exceeded"
  },
  {
    question: "How do you extract the `Retry-After` header value when an API responds with HTTP 429 in M?",
    shortAnswer: "Enable `ManualStatusHandling = {429}` &rarr; retrieve header via `Value.Metadata(Response)[Headers][#\"retry-after\"]`.",
    explanation: "Inspects server-mandated cooldown duration.",
    hint: "Value.Metadata(Response)[Headers][#\"retry-after\"].",
    level: "expert",
    codeExample: "WaitSeconds = Value.Metadata(Resp)[Headers][#\"retry-after\"]"
  },
  {
    question: "Why should you always define a hard safety upper bound in the continuation condition of `List.Generate`?",
    shortAnswer: "To prevent accidental infinite loops and memory freezes if an API endpoint enters an infinite pagination bug or returns corrupted cursor keys.",
    explanation: "Defensive loop termination constraint.",
    hint: "Prevents infinite loops and memory freezes (e.g. Page <= 100).",
    level: "advanced",
    codeExample: "Condition: each [Page] <= 500 and not List.IsEmpty([Data])"
  },
  {
    question: "What is offset/limit pagination, and how is it parameterized in M?",
    shortAnswer: "The query passes `offset` (starting index) and `limit` (page size, e.g. 100); on each step, `offset` increments by `limit` until fewer than `limit` rows are returned.",
    explanation: "SQL-style offset pagination.",
    hint: "Offset = Offset + Limit until row count < Limit.",
    level: "moderate",
    codeExample: "Query = [offset = Text.From([Offset]), limit = \"100\"]"
  },
  {
    question: "How do you buffer the page generator function to optimize pagination performance?",
    shortAnswer: "Wrap page extraction logic in a custom M function `fx_GetPage(page)` and buffer intermediate table outputs with `Table.Buffer`.",
    explanation: "Prevents duplicate recalculations during loop state transitions.",
    hint: "Buffer intermediate page tables with Table.Buffer.",
    level: "expert",
    codeExample: "fx_FetchPage = (p) => Table.Buffer(GetPageData(p))"
  },
  {
    question: "What happens if an API token expires mid-way through fetching 100 paginated pages?",
    shortAnswer: "Subsequent page requests fail with HTTP 401 Unauthorized; a robust pipeline checks token expiry or re-requests a fresh token before pagination.",
    explanation: "Token lifecycle management in long-running extractions.",
    hint: "Pages fail with 401; requires token refresh or pre-fetch check.",
    level: "advanced",
    codeExample: "HTTP 401 midway requires token refresh"
  },
  {
    question: "How do you mock paginated API responses for local testing without internet access?",
    shortAnswer: "Use `List.Generate` to generate mock in-memory tables: `List.Generate(()=> 1, each _ <= 5, each _ + 1, each #table({\"Page\", \"ID\"}, {{_, _ * 10}}))`.",
    explanation: "Generates mock paginated data streams directly in RAM.",
    hint: "Use List.Generate with #table literals.",
    level: "moderate",
    codeExample: "MockPages = List.Generate(()=> 1, each _ <= 3, each _ + 1, each #table({\"P\"}, {{_}}))"
  },
  {
    question: "How do you handle APIs that return total page count in the first response (e.g. `\"total_pages\": 25`)?",
    shortAnswer: "Fetch page 1 to read `total_pages` &rarr; generate a list of page numbers `{1..total_pages}` &rarr; apply `List.Transform` to fetch all pages concurrently &rarr; `Table.Combine`.",
    explanation: "Fixed-bound concurrent pagination using List.Transform.",
    hint: "Read total_pages &rarr; {1..total_pages} &rarr; List.Transform &rarr; Table.Combine.",
    level: "advanced",
    codeExample: "PagesList = {1..TotalPages}, AllData = Table.Combine(List.Transform(PagesList, each fx_GetPage(_)))"
  },
  {
    question: "What is the advantage of `List.Transform` over `List.Generate` when `total_pages` is known in advance?",
    shortAnswer: "`List.Transform` allows the Power Query mashup engine to execute multiple HTTP page requests in parallel, significantly speeding up data ingestion compared to serial `List.Generate` execution.",
    explanation: "Parallel HTTP request evaluation.",
    hint: "List.Transform allows parallel HTTP requests; List.Generate is strictly serial.",
    level: "expert",
    codeExample: "Parallel: Table.Combine(List.Transform({1..TotalPages}, each fx_Fetch(_)))"
  },
  {
    question: "How do you handle nested `data` arrays within each paginated response?",
    shortAnswer: "Extract `[data]` from each page record &rarr; convert each to a Table with `Table.FromRecords` &rarr; union all with `Table.Combine`.",
    explanation: "Unpacks page records into uniform tabular blocks.",
    hint: "Extract [data] list &rarr; Table.FromRecords &rarr; Table.Combine.",
    level: "moderate",
    codeExample: "PageTable = Table.FromRecords(JsonResponse[data])"
  },
  {
    question: "Why should you never execute 10,000 unthrottled API requests in Power Query against public REST endpoints?",
    shortAnswer: "It can trigger permanent IP bans, violate API terms of service, and overwhelm the local machine's memory resources.",
    explanation: "Ethical web scraping and API consumption standards.",
    hint: "Triggers IP bans, violates rate limits, and exhausts memory.",
    level: "basic",
    codeExample: "Best Practice: Limit batch size or use database extract endpoints"
  },
  {
    question: "How do you pass basic authentication credentials securely in an API call in M?",
    shortAnswer: "Encode `username:password` to Base64 using `Binary.ToText(Text.ToBinary(\"user:pass\"), BinaryEncoding.Base64)` &rarr; pass in `[Headers = [#\"Authorization\" = \"Basic \" & Base64Str]]`.",
    explanation: "Standard HTTP Basic authentication header construction.",
    hint: "Base64 encode 'user:pass' &rarr; 'Authorization: Basic ...'.",
    level: "moderate",
    codeExample: "BasicAuth = \"Basic \" & Binary.ToText(Text.ToBinary(\"user:secret\"), BinaryEncoding.Base64)"
  },
  {
    question: "What is the role of `Function.InvokeAfter` in managing API rate limits?",
    shortAnswer: "It introduces an intentional pause/delay duration before invoking an M function: `Function.InvokeAfter(()=> fx_GetPage(p), #duration(0, 0, 0, 1))` (1-second delay).",
    explanation: "Rate limiting pacing mechanism in M.",
    hint: "Function.InvokeAfter introduces a deliberate delay before invoking a function.",
    level: "expert",
    codeExample: "DelayedCall = Function.InvokeAfter(()=> fx_Fetch(page), #duration(0, 0, 0, 1))"
  },
  {
    question: "How do you test if a paginated API response contains zero records?",
    shortAnswer: "Using `List.IsEmpty(JsonResponse[data])` or `Table.IsEmpty(PageTable)`.",
    explanation: "Empty check for loop termination predicate.",
    hint: "List.IsEmpty(Response[data]).",
    level: "basic",
    codeExample: "each not List.IsEmpty([Data])"
  },
  {
    question: "How do you capture both the page number and the timestamp for each paginated batch?",
    shortAnswer: "Store state in a Record during `List.Generate`: `[Page = 1, Timestamp = DateTime.LocalNow(), Data = ...]`, selecting desired fields in the selector step.",
    explanation: "Attaches execution metadata to paginated rows.",
    hint: "Store [Page, Timestamp, Data] in generator record.",
    level: "advanced",
    codeExample: "State = [Page=p, FetchedAt=DateTime.LocalNow(), Rows=Data]"
  },
  {
    question: "How do you handle API pagination when the endpoint uses Link headers (RFC 5988)?",
    shortAnswer: "Extract the `Link` header from `Value.Metadata(Response)[Headers][#\"link\"]` &rarr; parse the URL bounded by `<...>; rel=\"next\"` using `Text.BetweenDelimiters`.",
    explanation: "RFC 5988 Link header pagination.",
    hint: "Extract URL from Link header where rel=\"next\".",
    level: "expert",
    codeExample: "NextURL = Text.BetweenDelimiters(LinkHeader, \"<\", \">\")"
  },
  {
    question: "Why should you separate the OAuth token acquisition query into a separate dedicated query in Power Query?",
    shortAnswer: "Separating the token query allows Power Query to evaluate authentication once, cache the token, and reference it cleanly across multiple data queries without redundant token generation.",
    explanation: "Modular authentication caching.",
    hint: "Evaluates token once and shares across all downstream queries.",
    level: "moderate",
    codeExample: "qry_OAuthToken &rarr; Referenced by qry_PaginatedSales"
  },
  {
    question: "How do you log the number of pages fetched during an automated pagination run?",
    shortAnswer: "Use `List.Count(ListOfPageTables)` before applying `Table.Combine`.",
    explanation: "Audit metrics for pipeline observability.",
    hint: "List.Count(PageList).",
    level: "basic",
    codeExample: "TotalPagesLoaded = List.Count(PagesList)"
  },
  {
    question: "What is the recommended page size (`limit` parameter) to use for REST API pagination?",
    shortAnswer: "Use the maximum page size supported by the API (commonly 100, 250, or 1000) to minimize the total number of HTTP network roundtrips.",
    explanation: "Minimizing network overhead and API call volume.",
    hint: "Use maximum allowed page size (e.g. 100-1000) to reduce HTTP roundtrips.",
    level: "basic",
    codeExample: "Query = [limit=\"1000\"] // Minimizes HTTP roundtrips"
  },
  {
    question: "How do you handle sporadic network failures during a multi-page pagination run?",
    shortAnswer: "Wrap page fetch calls in `try...otherwise` with a retry count or default to empty table to avoid crashing the entire consolidated dataset.",
    explanation: "Fault tolerance in distributed network extractions.",
    hint: "Use try fx_GetPage(p) otherwise #table({}, {}).",
    level: "advanced",
    codeExample: "SafeFetch = (p) => try fx_GetPage(p) otherwise #table({}, {})"
  },
  {
    question: "Can Power Query handle GraphQL API pagination?",
    shortAnswer: "Yes; by sending POST requests with GraphQL query payloads containing `first` and `after` cursor arguments, navigating `edges` and `pageInfo[endCursor]`.",
    explanation: "GraphQL cursor pagination architecture.",
    hint: "Yes; POST GraphQL query with 'first' and 'after' cursor parameters.",
    level: "expert",
    codeExample: "GraphQL: query { sales(first: 100, after: $cursor) { edges { node { ... } } } }"
  },
  {
    question: "What is the memory impact of loading 500 paginated API pages into Power Query?",
    shortAnswer: "Each page is deserialized into RAM; if tables are large, memory usage increases linearly until `Table.Combine` consolidates them; optimize by removing unneeded JSON columns early on each page.",
    explanation: "Column projection pruning for memory efficiency.",
    hint: "Prune unneeded columns on each page before combining to conserve RAM.",
    level: "expert",
    codeExample: "Remove unused fields inside fx_GetPage before Table.Combine!"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for API Pagination and Authentication?",
    shortAnswer: "Master `List.Generate` for serial cursors and `List.Transform` for parallel pages! Always isolate OAuth token generation in a dedicated query, enforce hard safety bounds (`Page <= 100`) to prevent infinite memory freezes, use maximum allowed page sizes (`limit=1000`) to minimize HTTP latency, and prune unused JSON fields before `Table.Combine` to maintain an ultra-lean memory footprint!",
    explanation: "Stateful functional pagination turns fragmented cloud endpoints into seamless enterprise data lakes!",
    hint: "List.Generate + Dedicated Token Query + Hard Safety Upper Bounds + Table.Combine = Elite API Mastery!",
    level: "expert",
    codeExample: "Rule: List.Generate(()=> Get(1), each [P]<=100 and [Data]<>{}, each Get([P]+1), each [Data]) & Table.Combine!"
  }
];

export default questions;
