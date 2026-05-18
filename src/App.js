import { useState } from "react";

const roadmapData = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Go Language Fundamentals",
    duration: "3–4 weeks",
    color: "#0F6E56",
    bg: "#E1F5EE",
    border: "#1D9E75",
    icon: "🏁",
    topics: [
      {
        name: "Go Setup & Tooling",
        subtopics: ["Installing Go, GOPATH, Go modules", "go build, go run, go test, go fmt, go vet", "go mod init, go mod tidy", "IDE setup (VS Code + gopls)"]
      },
      {
        name: "Basic Syntax",
        subtopics: ["Variables, constants, zero values", "Data types: int, float, string, bool, byte, rune", "Type inference with :=", "Type conversion & type aliases"]
      },
      {
        name: "Control Flow",
        subtopics: ["if/else, switch (no fallthrough by default)", "for loop (Go's only loop)", "defer, panic, recover", "Labels and goto (rarely used)"]
      },
      {
        name: "Functions",
        subtopics: ["Multiple return values", "Named return values", "Variadic functions", "First-class functions, closures", "init() function"]
      },
      {
        name: "Data Structures",
        subtopics: ["Arrays vs Slices (append, copy, len, cap)", "Maps (make, delete, nil maps)", "Structs (embedding, anonymous structs)", "Pointers and pointer arithmetic"]
      },
      {
        name: "Packages & Modules",
        subtopics: ["Package declaration and imports", "Exported vs unexported identifiers", "go.mod and go.sum", "Internal packages", "Blank identifier _"]
      }
    ],
    interview: [
      { q: "What is the difference between an array and a slice in Go?", a: "Arrays have fixed size; slices are dynamic views over arrays with length and capacity." },
      { q: "Explain defer, panic, and recover.", a: "defer schedules a function to run at function exit. panic stops execution; recover catches panics in deferred functions." },
      { q: "What are zero values in Go?", a: "Default values for uninitialized variables: 0 for numerics, false for bool, \"\" for string, nil for pointers/slices/maps/channels." },
      { q: "What is the difference between := and = ?", a: ":= declares and assigns (short variable declaration); = assigns to an existing variable." },
      { q: "How does Go handle multiple return values?", a: "Functions can return multiple values: func divide(a, b int) (int, error). The caller unpacks them." },
      { q: "What is a rune in Go?", a: "A rune is an alias for int32, representing a Unicode code point. Used when iterating over strings character by character." }
    ]
  },
  {
    id: 2,
    phase: "Phase 2",
    title: "OOP Patterns & Interfaces",
    duration: "2–3 weeks",
    color: "#185FA5",
    bg: "#E6F1FB",
    border: "#378ADD",
    icon: "🔷",
    topics: [
      {
        name: "Structs & Methods",
        subtopics: ["Value receivers vs pointer receivers", "Method sets", "Constructor patterns (NewX functions)", "Struct embedding (composition over inheritance)"]
      },
      {
        name: "Interfaces",
        subtopics: ["Interface definition and implicit implementation", "Empty interface{} / any", "Type assertions and type switches", "Interface composition", "Stringer, Reader, Writer interfaces"]
      },
      {
        name: "Error Handling",
        subtopics: ["error interface", "errors.New, fmt.Errorf", "Custom error types", "errors.Is, errors.As (Go 1.13+)", "Sentinel errors", "Wrapping errors with %w"]
      },
      {
        name: "Generics (Go 1.18+)",
        subtopics: ["Type parameters", "Constraints and ~type", "Generic functions and types", "When to use generics vs interfaces"]
      }
    ],
    interview: [
      { q: "How does Go implement OOP without classes?", a: "Via structs with methods, interfaces for polymorphism, and embedding for composition." },
      { q: "Difference between value receiver and pointer receiver?", a: "Value receiver gets a copy; pointer receiver can mutate the original. Pointer receivers are needed for large structs or mutation." },
      { q: "What is the error interface?", a: "type error interface { Error() string }. Any type implementing Error() string satisfies the error interface." },
      { q: "How do errors.Is and errors.As differ?", a: "errors.Is checks equality (sentinel); errors.As checks if the error wraps a specific type and unwraps it." },
      { q: "Can a nil interface equal a nil pointer?", a: "No. An interface holds (type, value). A nil pointer stored in an interface is not nil because the type part is set." },
      { q: "What are generics used for in Go?", a: "Writing type-safe reusable functions/data structures without code duplication, e.g., generic min, map, filter functions." }
    ]
  },
  {
    id: 3,
    phase: "Phase 3",
    title: "Concurrency (Go's Superpower)",
    duration: "3–4 weeks",
    color: "#854F0B",
    bg: "#FAEEDA",
    border: "#BA7517",
    icon: "⚡",
    topics: [
      {
        name: "Goroutines",
        subtopics: ["go keyword", "Goroutine lifecycle", "Runtime scheduler (M:N threading)", "Goroutine leaks and prevention"]
      },
      {
        name: "Channels",
        subtopics: ["Buffered vs unbuffered channels", "Channel direction (chan<-, <-chan)", "Closing channels", "Range over channel", "select statement", "nil channels"]
      },
      {
        name: "Sync Package",
        subtopics: ["sync.Mutex, sync.RWMutex", "sync.WaitGroup", "sync.Once", "sync.Map", "sync.Pool", "sync.Cond"]
      },
      {
        name: "Context Package",
        subtopics: ["context.Background, context.TODO", "context.WithCancel", "context.WithTimeout, context.WithDeadline", "context.WithValue", "Propagating cancellation"]
      },
      {
        name: "Concurrency Patterns",
        subtopics: ["Fan-out, fan-in", "Pipeline pattern", "Worker pool", "Semaphore pattern", "Errgroup (golang.org/x/sync)"]
      },
      {
        name: "Race Conditions",
        subtopics: ["go race detector", "Data races vs race conditions", "atomic package (sync/atomic)", "Memory model basics"]
      }
    ],
    interview: [
      { q: "What is a goroutine and how is it different from a thread?", a: "Goroutines are lightweight (2KB stack) cooperative tasks managed by the Go runtime. Threads are OS-managed (MB stack)." },
      { q: "What happens when you send to a closed channel?", a: "Panic. Reading from a closed channel returns zero value + false. Always close from the sender side." },
      { q: "What is a deadlock? How does Go detect it?", a: "All goroutines blocked waiting = deadlock. Go runtime detects and panics: 'all goroutines are asleep'." },
      { q: "Explain the select statement.", a: "select waits on multiple channel operations, executing whichever is ready. With default, it's non-blocking." },
      { q: "When would you use sync.Mutex over channels?", a: "Mutex for protecting shared state; channels for communication. Rule: share by communicating." },
      { q: "What is context cancellation?", a: "context.WithCancel returns a cancel func. Calling it signals Done() channel, letting goroutines stop gracefully." },
      { q: "How does sync.WaitGroup work?", a: "Add(n) increments counter, Done() decrements, Wait() blocks until counter is 0." }
    ]
  },
  {
    id: 4,
    phase: "Phase 4",
    title: "Standard Library & I/O",
    duration: "2 weeks",
    color: "#533AB7",
    bg: "#EEEDFE",
    border: "#7F77DD",
    icon: "📚",
    topics: [
      {
        name: "I/O & File System",
        subtopics: ["io.Reader, io.Writer interfaces", "bufio for buffered I/O", "os package: files, env vars", "io/fs and embed packages", "filepath package"]
      },
      {
        name: "Encoding",
        subtopics: ["encoding/json (Marshal/Unmarshal, struct tags)", "encoding/xml", "encoding/csv", "encoding/gob", "base64, hex"]
      },
      {
        name: "Strings & Regex",
        subtopics: ["strings package (Builder, Reader)", "strconv (Itoa, Atoi, ParseFloat)", "fmt (Sprintf, Fprintf, Sscanf)", "regexp package"]
      },
      {
        name: "Time & Math",
        subtopics: ["time.Time, time.Duration", "time.Now, time.Since, time.Until", "time.Ticker, time.Timer", "math/rand (rand/v2 in Go 1.22)"]
      }
    ],
    interview: [
      { q: "What is the io.Reader interface?", a: "type Reader interface { Read(p []byte) (n int, err error) }. Foundation of all streaming I/O in Go." },
      { q: "How do JSON struct tags work?", a: "json:\"field_name,omitempty\" maps struct fields to JSON keys. omitempty skips zero values." },
      { q: "What is the difference between fmt.Println and fmt.Fprintf?", a: "Println writes to stdout; Fprintf writes to any io.Writer, enabling testable I/O." },
      { q: "How does time.Duration work?", a: "Duration is int64 nanoseconds. Constants: time.Second = 1e9. Arithmetic: 2*time.Minute + 30*time.Second." }
    ]
  },
  {
    id: 5,
    phase: "Phase 5",
    title: "HTTP & REST API Development",
    duration: "3–4 weeks",
    color: "#3B6D11",
    bg: "#EAF3DE",
    border: "#639922",
    icon: "🌐",
    topics: [
      {
        name: "net/http Package",
        subtopics: ["http.Handler interface", "http.ServeMux", "http.Request (Body, Header, URL, Method)", "http.ResponseWriter", "http.Client and custom transports"]
      },
      {
        name: "Router Frameworks",
        subtopics: ["Chi (lightweight, idiomatic)", "Gin (high performance)", "Echo (middleware-rich)", "Gorilla Mux (classic)", "Fiber (Express-like)"]
      },
      {
        name: "Middleware",
        subtopics: ["Logging middleware", "Authentication middleware", "CORS middleware", "Rate limiting", "Request ID injection", "Panic recovery"]
      },
      {
        name: "Request/Response",
        subtopics: ["Path parameters & query strings", "JSON binding & validation", "File uploads (multipart/form-data)", "Streaming responses", "HTTP/2 and SSE"]
      },
      {
        name: "REST Best Practices",
        subtopics: ["RESTful resource naming", "HTTP status codes (200, 201, 400, 401, 403, 404, 409, 422, 500)", "Versioning (URL, header)", "HATEOAS basics", "OpenAPI/Swagger with swaggo"]
      }
    ],
    interview: [
      { q: "What is the http.Handler interface?", a: "type Handler interface { ServeHTTP(ResponseWriter, *Request) }. Any type implementing this can handle HTTP." },
      { q: "How do you implement middleware in Go?", a: "A function that takes and returns http.Handler: func Middleware(next http.Handler) http.Handler { ... }" },
      { q: "How do you read JSON from a request body?", a: "json.NewDecoder(r.Body).Decode(&target). Always close body with defer r.Body.Close()." },
      { q: "What is the difference between 401 and 403?", a: "401 Unauthorized = not authenticated. 403 Forbidden = authenticated but not permitted." },
      { q: "How do you handle CORS in Go?", a: "Set Access-Control-Allow-Origin header. Use middleware (rs/cors package) to manage preflight OPTIONS requests." },
      { q: "How does graceful shutdown work in Go HTTP servers?", a: "http.Server.Shutdown(ctx) stops accepting new connections and waits for active ones to finish." }
    ]
  },
  {
    id: 6,
    phase: "Phase 6",
    title: "Database & Persistence",
    duration: "3–4 weeks",
    color: "#993C1D",
    bg: "#FAECE7",
    border: "#D85A30",
    icon: "🗄️",
    topics: [
      {
        name: "database/sql",
        subtopics: ["DB, Tx, Stmt, Rows", "Connection pooling (SetMaxOpenConns, SetMaxIdleConns)", "Query vs Exec vs QueryRow", "Prepared statements", "Null types (sql.NullString etc)"]
      },
      {
        name: "PostgreSQL with pgx",
        subtopics: ["pgx vs lib/pq", "pgxpool for connection pooling", "LISTEN/NOTIFY", "COPY protocol", "pgtype package"]
      },
      {
        name: "ORM: GORM",
        subtopics: ["Model definition and migrations", "CRUD operations", "Associations (has one, has many, many2many)", "Preloading, hooks", "Raw SQL with GORM"]
      },
      {
        name: "Query Builder: sqlc / sqlx",
        subtopics: ["sqlc: generate type-safe Go from SQL", "sqlx: named queries, struct scanning", "Squirrel: SQL builder", "When to use ORM vs query builder vs raw SQL"]
      },
      {
        name: "Migrations",
        subtopics: ["golang-migrate", "goose", "Atlas", "Migration best practices (idempotent, rollback)"]
      },
      {
        name: "NoSQL",
        subtopics: ["MongoDB (mongo-driver)", "Redis (go-redis)", "Key patterns for Redis caching", "Redis pub/sub", "Sorted sets for leaderboards"]
      }
    ],
    interview: [
      { q: "How does connection pooling work in database/sql?", a: "sql.DB maintains a pool. SetMaxOpenConns limits total; SetMaxIdleConns limits idle. Connections are reused across goroutines." },
      { q: "What is the N+1 query problem?", a: "Loading N parent records then N separate queries for children. Fix with JOINs or preloading." },
      { q: "How do you handle database transactions in Go?", a: "db.Begin() returns a *sql.Tx. Use tx.Commit() on success, defer tx.Rollback() for safety." },
      { q: "Why use sqlc over GORM?", a: "sqlc generates type-safe code from SQL at compile time, no runtime reflection, no magic. GORM is more convenient but slower." },
      { q: "How do you prevent SQL injection in Go?", a: "Use parameterized queries: db.Query('SELECT * FROM users WHERE id = $1', id). Never interpolate user input." },
      { q: "When would you use Redis over a relational DB?", a: "For caching, session storage, rate limiting, pub/sub, leaderboards — where speed matters more than durability." }
    ]
  },
  {
    id: 7,
    phase: "Phase 7",
    title: "Authentication & Security",
    duration: "2 weeks",
    color: "#993556",
    bg: "#FBEAF0",
    border: "#D4537E",
    icon: "🔐",
    topics: [
      {
        name: "JWT & Sessions",
        subtopics: ["JWT structure (header.payload.signature)", "golang-jwt/jwt library", "Access tokens + refresh tokens", "Session-based auth with cookies", "Secure cookie flags (HttpOnly, SameSite, Secure)"]
      },
      {
        name: "OAuth2 & OpenID Connect",
        subtopics: ["OAuth2 flows (Authorization Code, Client Credentials)", "golang.org/x/oauth2", "OIDC with coreos/go-oidc", "Social login integration"]
      },
      {
        name: "Password & Hashing",
        subtopics: ["bcrypt (golang.org/x/crypto/bcrypt)", "Argon2id (preferred)", "Password strength validation", "Timing-safe comparison"]
      },
      {
        name: "Security Practices",
        subtopics: ["HTTPS with TLS (crypto/tls)", "Rate limiting (token bucket)", "Input validation & sanitization", "CSRF protection", "Security headers (helmet-like)"]
      }
    ],
    interview: [
      { q: "What is the structure of a JWT?", a: "Three base64url-encoded parts: Header (alg, typ), Payload (claims), Signature. Separated by dots." },
      { q: "Why use refresh tokens?", a: "Access tokens are short-lived (15 min). Refresh tokens are long-lived and stored securely to mint new access tokens." },
      { q: "Why is bcrypt preferred for password hashing?", a: "It's intentionally slow (work factor), has built-in salt, and is resistant to GPU cracking." },
      { q: "What is CSRF and how do you prevent it?", a: "Cross-Site Request Forgery tricks a browser into making authenticated requests. Prevent with CSRF tokens or SameSite cookies." }
    ]
  },
  {
    id: 8,
    phase: "Phase 8",
    title: "Testing",
    duration: "2 weeks",
    color: "#0F6E56",
    bg: "#E1F5EE",
    border: "#1D9E75",
    icon: "🧪",
    topics: [
      {
        name: "Unit Testing",
        subtopics: ["testing package", "Table-driven tests", "TestMain", "t.Helper, t.Parallel", "Subtests with t.Run"]
      },
      {
        name: "Mocking",
        subtopics: ["Interface-based mocking", "testify/mock", "gomock (mockgen)", "httptest.NewRecorder for HTTP handlers", "sqlmock for DB testing"]
      },
      {
        name: "Integration & E2E",
        subtopics: ["testcontainers-go (real DB in tests)", "httptest.NewServer", "Test database setup/teardown", "Fixtures and seeding"]
      },
      {
        name: "Benchmarking & Coverage",
        subtopics: ["Benchmark functions (BenchmarkXxx)", "go test -bench -benchmem", "go test -cover -coverprofile", "Fuzz testing (go 1.18+)"]
      }
    ],
    interview: [
      { q: "What is a table-driven test?", a: "A test with a slice of input/expected pairs iterated in a loop, reducing boilerplate and improving coverage." },
      { q: "How do you mock a database in Go?", a: "Define a repository interface. In tests, pass a mock struct implementing it. Use sqlmock for sql.DB mocking." },
      { q: "What is the difference between t.Error and t.Fatal?", a: "t.Error marks failure and continues; t.Fatal marks failure and stops the test immediately." },
      { q: "How do you benchmark a function?", a: "func BenchmarkFoo(b *testing.B) { for i := 0; i < b.N; i++ { Foo() } }. Run with go test -bench=." }
    ]
  },
  {
    id: 9,
    phase: "Phase 9",
    title: "Microservices & gRPC",
    duration: "3–4 weeks",
    color: "#185FA5",
    bg: "#E6F1FB",
    border: "#378ADD",
    icon: "🔗",
    topics: [
      {
        name: "gRPC",
        subtopics: ["Protocol Buffers (protobuf)", "Unary, server streaming, client streaming, bidirectional", "protoc-gen-go, grpc-gateway", "Interceptors (middleware)", "Status codes and error handling"]
      },
      {
        name: "Microservice Design",
        subtopics: ["Service decomposition principles", "API Gateway pattern", "Service mesh basics (Istio, Linkerd)", "Circuit breaker (sony/gobreaker)", "Retry with backoff"]
      },
      {
        name: "Message Queues",
        subtopics: ["Kafka with confluent-kafka-go / segmentio/kafka-go", "RabbitMQ with amqp091-go", "NATS with nats.go", "Outbox pattern", "Idempotent consumers"]
      },
      {
        name: "Service Discovery",
        subtopics: ["Consul", "etcd", "Kubernetes DNS", "Health check endpoints (/health, /ready)"]
      }
    ],
    interview: [
      { q: "What is the difference between REST and gRPC?", a: "REST uses JSON over HTTP/1.1 (text). gRPC uses protobuf over HTTP/2 (binary), faster and strongly typed." },
      { q: "What is a circuit breaker?", a: "A pattern that stops calling a failing service after N failures, returning errors immediately until the service recovers." },
      { q: "What is the outbox pattern?", a: "Write to a DB outbox table and publish messages from it transactionally to avoid lost messages between DB writes and queue publishes." },
      { q: "What are gRPC interceptors?", a: "Middleware for gRPC: UnaryInterceptor and StreamInterceptor, used for logging, auth, and tracing." }
    ]
  },
  {
    id: 10,
    phase: "Phase 10",
    title: "DevOps & Production",
    duration: "2–3 weeks",
    color: "#5F5E5A",
    bg: "#F1EFE8",
    border: "#888780",
    icon: "🚀",
    topics: [
      {
        name: "Docker & Containers",
        subtopics: ["Multi-stage Dockerfile for Go", "Distroless/scratch base images", "Docker Compose for local dev", ".dockerignore", "Build caching tricks"]
      },
      {
        name: "Kubernetes",
        subtopics: ["Deployments, Services, Ingress", "ConfigMaps & Secrets", "Horizontal Pod Autoscaler", "Liveness & readiness probes", "Helm charts basics"]
      },
      {
        name: "Observability",
        subtopics: ["Structured logging (zerolog, zap, slog)", "Metrics with Prometheus + promhttp", "Distributed tracing (OpenTelemetry)", "Grafana dashboards", "Error tracking (Sentry)"]
      },
      {
        name: "CI/CD",
        subtopics: ["GitHub Actions for Go", "golangci-lint", "go test in CI", "goreleaser for binary releases", "Semantic versioning"]
      },
      {
        name: "Performance",
        subtopics: ["pprof profiling (CPU, memory, goroutine)", "go tool trace", "Escape analysis (gcflags=-m)", "GOMAXPROCS tuning", "Memory allocation patterns"]
      }
    ],
    interview: [
      { q: "How do you write a minimal Dockerfile for a Go app?", a: "Multi-stage: build stage with golang:alpine, final stage from scratch or distroless. COPY binary + RUN CGO_ENABLED=0." },
      { q: "What is pprof?", a: "Go's built-in profiling tool. Import net/http/pprof, expose /debug/pprof endpoint, analyze with go tool pprof." },
      { q: "What is structured logging?", a: "Logging in JSON or key-value format (vs plain text) so logs are machine-parseable by tools like Loki/Elasticsearch." },
      { q: "What is OpenTelemetry?", a: "Vendor-neutral observability framework for traces, metrics, and logs. Go SDK instruments your code; export to Jaeger, Tempo, etc." },
      { q: "What is GOMAXPROCS?", a: "Sets the number of OS threads running Go code simultaneously. Defaults to number of CPU cores. Tune for I/O-heavy workloads." }
    ]
  }
];

export default function GoRoadmap() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTab, setActiveTab] = useState("topics");
  const [expandedQ, setExpandedQ] = useState(null);

  const phase = roadmapData[activePhase];

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", background: "var(--color-background-primary)", minHeight: "100vh", paddingBottom: "2rem" }}>
      
      {/* Header */}
      <div style={{ background: "#0D1117", padding: "2rem 1.5rem 1.5rem", borderBottom: "2px solid #21262D" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" }}>
          <div style={{ background: "#00ADD8", borderRadius: "8px", padding: "6px 12px", color: "#fff", fontSize: "13px", fontWeight: 600, letterSpacing: "1px" }}>GO</div>
          <span style={{ color: "#8B949E", fontSize: "13px" }}>backend developer</span>
        </div>
        <h1 style={{ color: "#E6EDF3", fontSize: "22px", fontWeight: 700, margin: "0 0 0.4rem", letterSpacing: "-0.5px" }}>Complete Backend Roadmap</h1>
        <p style={{ color: "#8B949E", fontSize: "13px", margin: 0 }}>10 phases · 25+ weeks · interview-ready</p>
      </div>

      {/* Phase selector */}
      <div style={{ overflowX: "auto", background: "#161B22", borderBottom: "1px solid #21262D" }}>
        <div style={{ display: "flex", gap: "0", minWidth: "max-content" }}>
          {roadmapData.map((p, i) => (
            <button key={p.id} onClick={() => { setActivePhase(i); setActiveTab("topics"); setExpandedQ(null); }}
              style={{ padding: "10px 14px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px", transition: "all 0.15s", whiteSpace: "nowrap", fontFamily: "inherit",
                background: activePhase === i ? "#21262D" : "transparent",
                color: activePhase === i ? "#E6EDF3" : "#8B949E",
                borderBottom: activePhase === i ? `2px solid ${p.border}` : "2px solid transparent" }}>
              {p.icon} P{p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Phase header */}
      <div style={{ padding: "1.25rem 1.5rem 0", borderBottom: "1px solid var(--color-border-tertiary)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, color: phase.color, letterSpacing: "1.5px", marginBottom: "4px" }}>{phase.phase.toUpperCase()}</div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 4px", color: "var(--color-text-primary)" }}>{phase.title}</h2>
          <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>⏱ {phase.duration}</div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["topics", "interview"].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setExpandedQ(null); }}
              style={{ padding: "6px 14px", border: "1px solid", cursor: "pointer", borderRadius: "6px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px", fontFamily: "inherit", transition: "all 0.15s",
                background: activeTab === tab ? phase.color : "transparent",
                color: activeTab === tab ? "#fff" : "var(--color-text-secondary)",
                borderColor: activeTab === tab ? phase.color : "var(--color-border-tertiary)" }}>
              {tab === "topics" ? "📖 Topics" : "🎯 Interview Qs"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1rem 1.5rem" }}>
        {activeTab === "topics" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
            {phase.topics.map((topic, ti) => (
              <div key={ti} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "10px", padding: "1rem", borderLeft: `3px solid ${phase.border}` }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "4px", background: phase.bg, color: phase.color, fontSize: "10px", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{ti+1}</span>
                  {topic.name}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {topic.subtopics.map((sub, si) => (
                    <li key={si} style={{ fontSize: "11px", color: "var(--color-text-secondary)", padding: "3px 0", borderBottom: si < topic.subtopics.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                      <span style={{ color: phase.color, flexShrink: 0, marginTop: "1px" }}>›</span>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {phase.interview.map((item, qi) => (
              <div key={qi} style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "10px", overflow: "hidden", cursor: "pointer" }}
                onClick={() => setExpandedQ(expandedQ === qi ? null : qi)}>
                <div style={{ padding: "12px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", background: expandedQ === qi ? phase.bg : "var(--color-background-primary)" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: phase.color, minWidth: "24px", marginTop: "1px" }}>Q{qi+1}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.5 }}>{item.q}</span>
                  </div>
                  <span style={{ color: phase.color, fontSize: "14px", flexShrink: 0 }}>{expandedQ === qi ? "▲" : "▼"}</span>
                </div>
                {expandedQ === qi && (
                  <div style={{ padding: "10px 14px 14px 48px", background: "var(--color-background-secondary)", borderTop: `1px solid ${phase.border}30` }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: phase.color, display: "block", marginBottom: "4px" }}>ANSWER</span>
                    <p style={{ fontSize: "12px", color: "var(--color-text-primary)", margin: 0, lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ padding: "0 1.5rem", marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, height: "4px", background: "var(--color-background-secondary)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: phase.color, width: `${((activePhase + 1) / roadmapData.length) * 100}%`, transition: "width 0.3s ease", borderRadius: "2px" }} />
          </div>
          <span style={{ fontSize: "11px", color: "var(--color-text-secondary)", fontWeight: 600 }}>{activePhase + 1}/{roadmapData.length}</span>
        </div>
      </div>

      {/* Nav arrows */}
      <div style={{ padding: "0.75rem 1.5rem 0", display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => { setActivePhase(p => Math.max(0, p - 1)); setActiveTab("topics"); setExpandedQ(null); }}
          disabled={activePhase === 0}
          style={{ padding: "7px 16px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: activePhase === 0 ? "not-allowed" : "pointer", fontFamily: "inherit", background: "transparent", color: activePhase === 0 ? "var(--color-text-secondary)" : "var(--color-text-primary)", opacity: activePhase === 0 ? 0.4 : 1 }}>
          ← prev phase
        </button>
        <button onClick={() => { setActivePhase(p => Math.min(roadmapData.length - 1, p + 1)); setActiveTab("topics"); setExpandedQ(null); }}
          disabled={activePhase === roadmapData.length - 1}
          style={{ padding: "7px 16px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: activePhase === roadmapData.length - 1 ? "not-allowed" : "pointer", fontFamily: "inherit", background: "transparent", color: activePhase === roadmapData.length - 1 ? "var(--color-text-secondary)" : "var(--color-text-primary)", opacity: activePhase === roadmapData.length - 1 ? 0.4 : 1 }}>
          next phase →
        </button>
      </div>
    </div>
  );
}
