import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #1a1a24;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #f0f0f8;
    --muted: #7878a0;
    --accent1: #7c3aed;
    --accent2: #06b6d4;
    --accent3: #f59e0b;
    --accent4: #10b981;
    --accent5: #ef4444;
    --accent6: #ec4899;
    --font-head: 'Syne', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }
  body { background: var(--bg); color: var(--text); font-family: var(--font-head); }
  .root { min-height: 100vh; }

  /* Header */
  .header { background: linear-gradient(135deg, #0a0a0f 0%, #110d1e 50%, #0a0f1a 100%); padding: 2rem 1.5rem 1.5rem; border-bottom: 1px solid var(--border2); position: relative; overflow: hidden; }
  .header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%); border-radius: 50%; }
  .header::after { content: ''; position: absolute; bottom: -40px; left: 30%; width: 160px; height: 160px; background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%); border-radius: 50%; }
  .header-inner { position: relative; z-index: 1; }
  .header-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); border-radius: 20px; padding: 4px 12px; font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #a78bfa; margin-bottom: 12px; }
  .header h1 { font-size: clamp(20px, 5vw, 28px); font-weight: 800; line-height: 1.15; margin-bottom: 6px; }
  .header h1 span { background: linear-gradient(90deg, #7c3aed, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .header-sub { font-size: 12px; color: var(--muted); font-family: var(--font-mono); }
  .stats-row { display: flex; gap: 16px; margin-top: 16px; flex-wrap: wrap; }
  .stat { display: flex; flex-direction: column; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 10px; padding: 8px 14px; }
  .stat-num { font-size: 18px; font-weight: 800; }
  .stat-lbl { font-size: 9px; color: var(--muted); letter-spacing: 1px; font-family: var(--font-mono); }

  /* Nav tabs */
  .nav { display: flex; overflow-x: auto; background: var(--surface); border-bottom: 1px solid var(--border); scrollbar-width: none; }
  .nav::-webkit-scrollbar { display: none; }
  .nav-btn { flex-shrink: 0; padding: 12px 16px; border: none; background: none; cursor: pointer; font-family: var(--font-head); font-size: 11px; font-weight: 700; letter-spacing: 0.5px; color: var(--muted); border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; }
  .nav-btn.active { color: var(--text); border-bottom-color: var(--active-color, #7c3aed); }
  .nav-btn:hover:not(.active) { color: #aaa; }

  /* Content */
  .content { padding: 1rem; }

  /* Priority badge */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 20px; font-size: 9px; font-weight: 700; letter-spacing: 1px; font-family: var(--font-mono); }
  .badge-must { background: rgba(239,68,68,0.15); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3); }
  .badge-high { background: rgba(245,158,11,0.15); color: #fcd34d; border: 1px solid rgba(245,158,11,0.3); }
  .badge-med { background: rgba(16,185,129,0.15); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.3); }

  /* Section header */
  .sec-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  .sec-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
  .sec-title { font-size: 14px; font-weight: 700; }
  .sec-count { font-size: 10px; color: var(--muted); font-family: var(--font-mono); }

  /* Q cards */
  .q-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
  .q-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; cursor: pointer; transition: border-color 0.2s; }
  .q-card:hover { border-color: var(--border2); }
  .q-card.open { border-color: var(--card-color, rgba(124,58,237,0.4)); }
  .q-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding: 11px 13px; }
  .q-left { display: flex; align-items: flex-start; gap: 10px; flex: 1; }
  .q-num { font-size: 10px; font-weight: 700; color: var(--muted); font-family: var(--font-mono); padding-top: 2px; min-width: 22px; }
  .q-text { font-size: 12px; font-weight: 600; line-height: 1.5; flex: 1; }
  .q-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .q-chevron { font-size: 10px; color: var(--muted); transition: transform 0.2s; }
  .q-card.open .q-chevron { transform: rotate(180deg); }
  .q-body { padding: 0 13px 12px 45px; border-top: 1px solid var(--border); }
  .q-ans-label { font-size: 9px; font-weight: 700; letter-spacing: 1.5px; color: var(--card-color, #7c3aed); margin: 10px 0 6px; font-family: var(--font-mono); }
  .q-ans { font-size: 12px; color: #c8c8e0; line-height: 1.7; font-family: var(--font-mono); }
  .q-tip { margin-top: 8px; padding: 8px 10px; background: rgba(255,255,255,0.03); border-left: 2px solid var(--card-color, #7c3aed); border-radius: 0 6px 6px 0; font-size: 11px; color: var(--muted); font-family: var(--font-mono); }

  /* DSA topic cards */
  .dsa-grid { display: flex; flex-direction: column; gap: 10px; }
  .dsa-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .dsa-card-head { padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .dsa-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .dsa-name { font-size: 13px; font-weight: 700; flex: 1; }
  .dsa-meta { display: flex; align-items: center; gap: 8px; }
  .dsa-problems { font-size: 10px; font-family: var(--font-mono); color: var(--muted); }
  .dsa-body { padding: 0 14px 14px; border-top: 1px solid var(--border); }
  .dsa-section { margin-top: 12px; }
  .dsa-section-title { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: var(--muted); font-family: var(--font-mono); margin-bottom: 8px; }
  .dsa-q-item { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 11px; color: #c8c8e0; font-family: var(--font-mono); }
  .dsa-q-item:last-child { border-bottom: none; }
  .dsa-diff { font-size: 9px; font-weight: 700; padding: 1px 6px; border-radius: 4px; flex-shrink: 0; }
  .diff-e { background: rgba(16,185,129,0.15); color: #6ee7b7; }
  .diff-m { background: rgba(245,158,11,0.15); color: #fcd34d; }
  .diff-h { background: rgba(239,68,68,0.15); color: #fca5a5; }
  .pattern-tag { display: inline-block; font-size: 9px; padding: 2px 7px; background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.2); border-radius: 4px; color: #a78bfa; margin: 2px; font-family: var(--font-mono); }

  /* Progress */
  .prog-bar { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; margin-bottom: 1rem; }
  .prog-fill { height: 100%; background: linear-gradient(90deg, #7c3aed, #06b6d4); border-radius: 2px; }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ROUNDS = [
  { id: "hr", label: "👤 HR", color: "#ec4899" },
  { id: "tech", label: "💻 Technical", color: "#7c3aed" },
  { id: "sd", label: "🏗️ System Design", color: "#06b6d4" },
  { id: "dsa", label: "🧩 DSA", color: "#f59e0b" },
  { id: "beh", label: "⭐ Behavioural", color: "#10b981" },
  { id: "go", label: "🐹 Go Specific", color: "#00ADD8" },
];

const HR_DATA = [
  {
    section: "Self Introduction",
    icon: "🙋",
    color: "#ec4899",
    qs: [
      { q: "Tell me about yourself", priority: "must", a: "Structure: Present → Past → Future. 'I am a [role] with X years of experience in [domain]. Currently at [company] where I [key achievement]. Before that I [relevant past]. Looking for [specific opportunity] to [goal].'", tip: "Keep it under 90 seconds. End with why you're excited about THIS company." },
      { q: "Why do you want to leave your current job?", priority: "must", a: "Always frame positively: growth opportunity, new challenges, align with passion. Never badmouth employer. Example: 'I've learned a lot at my current role, but I'm looking to work on larger-scale distributed systems which I know you do here.'", tip: "Prepare this cold — interviewers always ask this." },
      { q: "What are your strengths and weaknesses?", priority: "must", a: "Strengths: Pick 2-3 relevant to the JD with examples. Weaknesses: Pick a real one you're actively improving. Example weakness: 'I used to over-engineer solutions; I've been practicing writing simple code first and refactoring.' ", tip: "Weakness must be genuine AND show self-awareness + growth." },
      { q: "Where do you see yourself in 5 years?", priority: "high", a: "Show ambition aligned with the role. 'I see myself as a senior/lead engineer, having deep expertise in backend systems, potentially mentoring junior engineers. I want to grow here as the company scales.'", tip: "Tie your 5-year vision to the company's trajectory." },
      { q: "Why do you want to join this company?", priority: "must", a: "Research the company! Mention: specific product/tech stack, culture/values, growth stage, recent achievements. Never say 'good salary' or 'brand name' directly.", tip: "Spend 20 mins researching before every interview. Mention something specific." },
      { q: "What is your expected salary?", priority: "high", a: "Research market rate on Glassdoor/LinkedIn. Give a range, not a fixed number. 'Based on my research and experience, I'm looking at X–Y LPA, but I'm flexible depending on the overall package.'", tip: "Never anchor too low. Know your market value." },
    ]
  },
  {
    section: "Situational / Fit",
    icon: "🔄",
    color: "#f59e0b",
    qs: [
      { q: "Describe a challenging situation and how you handled it", priority: "must", a: "Use STAR format: Situation (context) → Task (your role) → Action (what you did) → Result (measurable outcome). Example: 'Our production DB crashed 2 hrs before a major launch. I [actions]. Result: deployed on time, zero data loss.'", tip: "Have 5-6 STAR stories ready. They cover 80% of behavioural questions." },
      { q: "How do you handle tight deadlines?", priority: "high", a: "Show prioritization: 'I break the work into must-haves vs nice-to-haves, communicate timeline risks early to stakeholders, and parallelize where possible. I'd rather ship a solid MVP than a rushed full feature.'", tip: "Show you communicate proactively, not just grind silently." },
      { q: "Do you prefer working alone or in a team?", priority: "med", a: "'I enjoy both. I do my best deep work solo, but I value code reviews, pair programming for complex problems, and cross-functional collaboration for alignment. Good teams make each other better.'", tip: "Never say you strongly prefer only one. Show balance." },
    ]
  }
];

const TECH_DATA = [
  {
    section: "OOP & Design Principles",
    icon: "🔷",
    color: "#7c3aed",
    qs: [
      { q: "Explain the 4 pillars of OOP", priority: "must", a: "Encapsulation (hide internals, expose interface), Abstraction (expose only what's needed), Inheritance (child reuses parent behavior), Polymorphism (one interface, multiple implementations). Real example for each.", tip: "Most interviewers ask for real code examples. Prepare one per pillar." },
      { q: "What is SOLID?", priority: "must", a: "S: Single Responsibility (one reason to change). O: Open/Closed (open for extension, closed for modification). L: Liskov Substitution (subtypes replaceable). I: Interface Segregation (no fat interfaces). D: Dependency Inversion (depend on abstractions).", tip: "Know which principle is violated by anti-patterns like God Object, Shotgun Surgery." },
      { q: "Composition vs Inheritance — when to use which?", priority: "high", a: "Inheritance: 'is-a' relationship, shared behavior. Composition: 'has-a', more flexible, avoids deep hierarchies. Prefer composition. Example: instead of Vehicle → Car → ElectricCar, use Car with Engine interface injected.", tip: "'Prefer composition over inheritance' — quote this principle." },
      { q: "What are design patterns? Name commonly used ones.", priority: "high", a: "Creational: Singleton, Factory, Builder. Structural: Adapter, Decorator, Proxy, Facade. Behavioural: Observer, Strategy, Command, Iterator. Know when to use each. Factory for object creation without knowing type. Observer for event-driven systems.", tip: "Know Singleton pitfalls (thread safety, global state). Often asked." },
    ]
  },
  {
    section: "Data Structures & CS Fundamentals",
    icon: "📐",
    color: "#06b6d4",
    qs: [
      { q: "Array vs LinkedList — when to use each?", priority: "must", a: "Array: O(1) random access, cache-friendly, fixed/dynamic size. LinkedList: O(1) insert/delete at known node, no reallocation. Use array for indexed access, linked list for frequent mid-insertions. In practice, arrays (slices) win for most cases due to cache locality.", tip: "Cache locality is the real reason arrays outperform LinkedLists in practice." },
      { q: "Explain HashMap internals", priority: "must", a: "Hash function maps key → index. Collision resolution: chaining (linked list at index) or open addressing. Load factor (typically 0.75) triggers resize/rehash. Amortized O(1) get/put. Worst case O(n) with hash collisions.", tip: "Be ready to explain why HashMap isn't thread-safe and what ConcurrentHashMap does differently." },
      { q: "What is a balanced BST? Examples and use cases.", priority: "high", a: "AVL Tree (strict balance, faster lookup), Red-Black Tree (looser balance, faster insert/delete — used in Java TreeMap, C++ std::map). B-Tree used in databases for disk I/O efficiency. O(log n) for all ops.", tip: "Most languages use Red-Black Trees internally. Mention this." },
      { q: "Stack vs Queue — real world usage", priority: "high", a: "Stack (LIFO): function call stack, undo/redo, DFS, expression evaluation, backtracking. Queue (FIFO): BFS, task scheduling, message queues, print spooler. Deque: sliding window problems.", tip: "Mono-stack and sliding window deque are popular DSA patterns to mention." },
    ]
  },
  {
    section: "OS & Memory",
    icon: "⚙️",
    color: "#10b981",
    qs: [
      { q: "Process vs Thread vs Goroutine", priority: "must", a: "Process: isolated memory, OS-managed. Thread: shared memory within process, OS-managed (1MB+ stack). Goroutine: user-space, Go runtime managed, ~2KB stack, multiplexed on OS threads (M:N model). Goroutines are cheaper — you can run millions.", tip: "Context switching cost: Process > Thread > Goroutine. Know the numbers." },
      { q: "What causes a deadlock? How to prevent?", priority: "must", a: "Deadlock requires: Mutual exclusion + Hold and wait + No preemption + Circular wait. Prevent by: always acquire locks in same order, use lock timeouts, avoid nested locks, use channels/message passing.", tip: "Draw the circular wait diagram — interviewers love visual explanations." },
      { q: "Stack vs Heap memory", priority: "high", a: "Stack: fast allocation, LIFO, stores local vars + function frames, limited size (~1-8MB). Heap: slower, manual/GC managed, for dynamic allocation. Stack overflow = too much recursion. Heap leak = objects not freed.", tip: "In Go, compiler decides stack vs heap via escape analysis. Mention this in Go interviews." },
      { q: "What is virtual memory and paging?", priority: "med", a: "Virtual memory gives each process an isolated address space. Pages (4KB) map virtual → physical via page table. Page fault: page not in RAM → load from disk. TLB caches recent translations for speed. Allows programs larger than physical RAM.", tip: "Page fault is why you care about memory access patterns in performance-critical code." },
    ]
  },
  {
    section: "Databases",
    icon: "🗄️",
    color: "#f59e0b",
    qs: [
      { q: "Explain ACID properties", priority: "must", a: "Atomicity (all or nothing), Consistency (DB rules always valid), Isolation (transactions don't interfere), Durability (committed = permanent). PostgreSQL fully ACID. MongoDB per-document atomic, multi-document with transactions (4.0+).", tip: "Know what happens when each property is violated — interviewers test edge cases." },
      { q: "What is database indexing? How does it work?", priority: "must", a: "Index = B-Tree structure on column(s) for fast lookup. Without index: O(n) full table scan. With index: O(log n). Tradeoffs: speeds up reads, slows writes (index must update), uses extra storage. Partial, composite, covering indexes for advanced optimization.", tip: "Explain when NOT to index: low-cardinality columns, write-heavy tables, small tables." },
      { q: "SQL vs NoSQL — when to use each?", priority: "must", a: "SQL: ACID, complex queries, relationships, schema-enforced (Postgres, MySQL). NoSQL: flexible schema, horizontal scale, high write throughput. Document (MongoDB) for nested data. Key-Value (Redis) for cache/sessions. Column-store (Cassandra) for time-series. Graph (Neo4j) for relationships.", tip: "Real answer: use PostgreSQL by default. Move to NoSQL only when you have a specific reason." },
      { q: "Explain database normalization (1NF, 2NF, 3NF)", priority: "high", a: "1NF: atomic values, no repeating groups. 2NF: remove partial dependencies (all non-key columns depend on full PK). 3NF: remove transitive dependencies. Denormalization for read performance. OLTP → normalize. OLAP/reporting → denormalize.", tip: "Know when to intentionally denormalize. Perfect 3NF isn't always the right choice." },
      { q: "What is a database transaction? Isolation levels?", priority: "high", a: "READ UNCOMMITTED (dirty reads) → READ COMMITTED (default PG) → REPEATABLE READ → SERIALIZABLE (strictest). Higher isolation = fewer anomalies but more lock contention. Phantom read: new rows appear between reads in same tx.", tip: "PostgreSQL default is READ COMMITTED. Know the anomalies each level prevents." },
      { q: "Explain database sharding vs replication", priority: "high", a: "Replication: copies data to multiple nodes (primary + replicas) for read scaling + fault tolerance. Sharding: splits data across nodes by shard key for write scaling. Challenges: cross-shard queries, rebalancing, hotspots. Replication is easier; shard only when needed.", tip: "Most systems need replication long before sharding. Don't over-engineer." },
    ]
  },
  {
    section: "Networking & APIs",
    icon: "🌐",
    color: "#ec4899",
    qs: [
      { q: "What happens when you type a URL in the browser?", priority: "must", a: "1. DNS lookup (cache → OS → ISP → root → TLD → authoritative). 2. TCP handshake (SYN/SYN-ACK/ACK). 3. TLS handshake (if HTTPS). 4. HTTP request. 5. Server processes, responds. 6. Browser parses HTML, loads assets, renders.", tip: "This question tests breadth. Go as deep as the interviewer wants on any step." },
      { q: "HTTP vs HTTPS vs HTTP/2 vs HTTP/3", priority: "high", a: "HTTP: plain text. HTTPS: HTTP over TLS (encrypted). HTTP/2: multiplexing (multiple requests on one connection), header compression, server push, binary framing. HTTP/3: QUIC protocol (UDP-based), eliminates head-of-line blocking, better for mobile/high-latency.", tip: "HTTP/2 multiplexing is the key improvement. Know why it matters for performance." },
      { q: "REST vs GraphQL vs gRPC", priority: "high", a: "REST: resource-based, HTTP verbs, wide support, stateless. GraphQL: client specifies needed fields (no over/under-fetching), single endpoint, great for complex UIs. gRPC: binary protobuf, HTTP/2, strongly typed, fast, ideal for microservices. Pick based on consumer needs.", tip: "gRPC for service-to-service. GraphQL for frontend with complex data needs. REST for public APIs." },
      { q: "What is a load balancer? Types?", priority: "high", a: "Distributes traffic across servers. L4 (TCP/IP level, fast, no content inspection) vs L7 (HTTP level, routing by path/header, SSL termination). Algorithms: Round Robin, Least Connections, IP Hash (sticky sessions), Weighted. Examples: Nginx, HAProxy, AWS ALB.", tip: "Know the difference between L4 and L7. L7 can do path-based routing (/api vs /static)." },
    ]
  },
];

const SD_DATA = [
  {
    section: "Core Concepts to Know",
    icon: "🧠",
    color: "#06b6d4",
    qs: [
      { q: "How do you approach a system design question?", priority: "must", a: "1. Clarify requirements (functional + non-functional: scale, latency, consistency). 2. Estimate scale (DAU, QPS, storage). 3. High-level design (components, APIs). 4. Deep dive (DB schema, bottlenecks). 5. Discuss tradeoffs. Always think aloud.", tip: "Never jump into solution. Spend 5 mins on requirements. Interviewers evaluate your process." },
      { q: "Design a URL Shortener (like bit.ly)", priority: "must", a: "API: POST /shorten → shortCode, GET /:code → redirect. DB: URLs table (id, shortCode, longUrl, userId, createdAt). Short code: base62 encoding of auto-increment ID or random 7-char. Cache: Redis for hot URLs (80/20 rule). Scale: CDN at edge for redirects. Rate limiting.", tip: "Classic question. Know the base62 encoding approach vs UUID approach and tradeoffs." },
      { q: "Design a Chat Application (like WhatsApp)", priority: "must", a: "WebSockets for real-time. Message storage: Cassandra (wide-column for time-series). Presence service: Redis with TTL. Fan-out for group messages. Message Queue (Kafka) for async delivery + retry. Push notifications for offline users. End-to-end encryption basics.", tip: "Focus on the fan-out problem for groups. Pull vs push fan-out tradeoff." },
      { q: "Design a Rate Limiter", priority: "must", a: "Algorithms: Token Bucket (smooth, allows bursts), Leaky Bucket (constant rate), Fixed Window Counter (simple, boundary problem), Sliding Window Log (accurate, memory heavy), Sliding Window Counter (hybrid). Redis with atomic Lua scripts for distributed rate limiting. Return 429 + Retry-After.", tip: "Token Bucket is most common in practice (used by AWS, Stripe). Know it deeply." },
      { q: "Design Twitter Feed / News Feed", priority: "high", a: "Fan-out-on-write (push to followers' feed cache on tweet) vs fan-out-on-read (pull at read time). Hybrid: push for normal users, pull for celebrities (millions of followers). Timeline stored in Redis sorted set. ML ranking layer on top of chronological.", tip: "Push vs pull fan-out is the core tradeoff question. Know both with pros/cons." },
      { q: "Design a Notification System", priority: "high", a: "Event producers → Message Queue (Kafka) → Notification Service → Channel workers (Email/SMS/Push). Templates stored in DB. User preferences (opt-in/out). Rate limiting per user. Retry with exponential backoff. Dead letter queue for failures. Delivery tracking.", tip: "Reliability and at-least-once delivery are key concerns. Know idempotency." },
    ]
  },
  {
    section: "Key Concepts & Tradeoffs",
    icon: "⚖️",
    color: "#7c3aed",
    qs: [
      { q: "CAP Theorem — explain with examples", priority: "must", a: "In a distributed system, you can only guarantee 2 of: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (works despite network splits). Partition ALWAYS happens → choice is CP or AP. PostgreSQL: CP. Cassandra/DynamoDB: AP. Spanner: tries to be CA via atomic clocks.", tip: "Partition tolerance isn't optional in real distributed systems. The real choice is C vs A." },
      { q: "What is eventual consistency?", priority: "high", a: "In AP systems, all nodes will EVENTUALLY agree on the same value, but reads may return stale data temporarily. Example: DNS propagation, shopping cart in Amazon. Techniques: version vectors, CRDTs, last-write-wins. Good for: availability matters more than instant consistency.", tip: "Give the DNS example — everyone understands it." },
      { q: "SQL vs NoSQL for different use cases", priority: "high", a: "E-commerce (transactions, inventory) → PostgreSQL. User sessions, caching → Redis. Product catalog (flexible schema) → MongoDB. Social graph → Neo4j. Time-series metrics → InfluxDB/Cassandra. Full-text search → Elasticsearch. Each DB optimized for its use case.", tip: "Knowing which DB fits which problem is senior-level thinking." },
      { q: "What is a CDN and when to use it?", priority: "high", a: "CDN = geographically distributed servers caching static assets closer to users. Reduces latency (serve from edge), reduces origin load, DDoS protection. Use for: images, CSS/JS, videos, API responses with caching. CloudFront, Fastly, Cloudflare. Origin pull vs push model.", tip: "CDN is the easiest win for global performance. Mention it early in system design." },
    ]
  },
];

const BEH_DATA = [
  {
    section: "Leadership & Impact",
    icon: "🎯",
    color: "#10b981",
    qs: [
      { q: "Tell me about a project you led end-to-end", priority: "must", a: "STAR: Pick a project where you owned the full lifecycle — requirements to deployment. Highlight: how you broke it down, handled blockers, collaborated across teams, and measured success. Numbers matter: 'reduced latency by 40%', 'served 2M users'.", tip: "Amazon/Google love ownership stories. Show you didn't wait to be told what to do." },
      { q: "Tell me about a time you failed", priority: "must", a: "Don't pick a fake weakness. Pick a real failure, own it fully. Focus on: what you learned, what you'd do differently, and how you applied that lesson later. Interviewers want to see self-awareness and growth, not perfection.", tip: "The best answer acknowledges the failure quickly and spends 70% on learnings." },
      { q: "Describe a time you disagreed with your manager/team", priority: "high", a: "Show respectful disagreement + data-driven approach. 'I disagreed with X approach, so I gathered data, documented my concerns, proposed an alternative, and presented it. Ultimately [outcome]. I learned to raise concerns early with evidence, not opinions.'", tip: "Companies want people who push back intelligently, not yes-men." },
      { q: "Tell me about a time you improved a process", priority: "high", a: "Show initiative: 'I noticed our deployment took 45 mins and was manual. I automated it with GitHub Actions, reducing it to 8 mins. This saved the team ~3 hrs/week and eliminated deploy-day stress.' Quantify the before/after.", tip: "Engineers who improve the system, not just work within it, are valued." },
    ]
  },
  {
    section: "Teamwork & Conflict",
    icon: "🤝",
    color: "#f59e0b",
    qs: [
      { q: "How do you handle a conflict with a teammate?", priority: "must", a: "STAR: Address it directly (1-on-1 first), focus on the problem not the person, listen actively, find common ground. Escalate to manager only if direct resolution fails. Show you don't let conflict fester. 'I schedule a quick coffee chat before it becomes a real issue.'", tip: "Never say you've never had conflict — it signals low self-awareness." },
      { q: "How do you handle negative feedback / code review criticism?", priority: "high", a: "'I separate the feedback from my ego — the goal is better code, not being right. I ask clarifying questions to understand the concern, apply the feedback, and sometimes propose alternatives with reasoning. I've learned the most from tough reviewers.'", tip: "Show coachability. Interviewers probe for ego fragility." },
      { q: "Tell me about mentoring someone junior", priority: "med", a: "Show you invest in others: 'I paired with an intern for 4 weeks — gave them increasingly complex tasks, regular 1-on-1s, and actionable code review feedback. They shipped their feature independently by week 6. It sharpened my own code communication skills too.'", tip: "Teaching is a senior engineering signal. Mention it proactively." },
    ]
  },
];

const GO_TECH = [
  {
    section: "Go Runtime & Internals",
    icon: "⚙️",
    color: "#00ADD8",
    qs: [
      { q: "How does the Go scheduler work? (GMP model)", priority: "must", a: "G = Goroutines, M = OS threads, P = logical processors (GOMAXPROCS). Scheduler is cooperative+preemptive. P maintains local run queue. M steals from other Ps when idle (work stealing). Goroutines yield on syscall, channel ops, function calls (sysmon preempts long-running G).", tip: "This is deep Go knowledge that impresses. Know work-stealing." },
      { q: "How does garbage collection work in Go?", priority: "must", a: "Tri-color mark-and-sweep, concurrent (runs alongside program). Three phases: Mark setup (STW, short), Mark (concurrent), Mark termination (STW, short). Write barrier tracks pointer mutations during concurrent mark. GC triggered by heap growth (default: 2x since last GC, tuned by GOGC). Go 1.18+ soft memory limit via GOMEMLIMIT.", tip: "STW pauses are the key concern. Know how to tune GOGC for latency-sensitive apps." },
      { q: "What is escape analysis in Go?", priority: "high", a: "Compiler determines if a variable's lifetime exceeds its function's scope. If yes → allocated on heap (escapes). If no → stack (faster, GC-free). Use go build -gcflags='-m' to see decisions. Pointer returns, interface conversions, closures capturing vars commonly cause heap allocation.", tip: "Understanding escape analysis = writing GC-pressure-aware code in performance-critical paths." },
      { q: "What is the difference between make and new?", priority: "high", a: "new(T) allocates zeroed T and returns *T — for any type. make(T, ...) initializes and returns T (not pointer) — only for slice, map, channel. new returns a pointer to zero value; make returns an initialized, ready-to-use value.", tip: "new is rarely needed. make is essential for slices/maps/channels." },
    ]
  },
  {
    section: "Concurrency Deep Dive",
    icon: "⚡",
    color: "#f59e0b",
    qs: [
      { q: "How do you implement a worker pool in Go?", priority: "must", a: "jobs chan Job (buffered). Spawn N goroutines, each reads from jobs. Send work to jobs channel. Close jobs when done. WaitGroup to wait for all workers. Pattern ensures bounded concurrency — no goroutine explosion regardless of input size.", tip: "Implement it from memory. It's the most common Go concurrency interview task." },
      { q: "What is a channel's internal implementation?", priority: "high", a: "hchan struct has: circular buffer (for buffered), sendq/recvq (goroutine wait queues), mutex for synchronization, element count. Send: if receiver waiting → direct copy, else buffer or block. Close: wakes all blocked receivers (returns zero values).", tip: "Deep question for senior roles. Shows you've read the Go runtime source." },
      { q: "sync.Map vs regular map + Mutex — when to use each?", priority: "high", a: "sync.Map optimized for: many reads, writes from different goroutines, key sets don't overlap much. Uses two internal maps (dirty + read) to avoid global lock on reads. Regular map + RWMutex often better when write-heavy or you need Range with consistent view. Benchmark before choosing.", tip: "sync.Map is not always faster. Saying 'it depends + benchmark' is the right answer." },
      { q: "What is the context package and how do you use it correctly?", priority: "must", a: "context.Context carries: cancellation signal, deadline, request-scoped values. Rules: always pass as first arg, never store in struct, don't use context.Background() in library code (accept from caller), only store request-scoped data (request ID, auth), not optional parameters.", tip: "Storing business logic in context values is an anti-pattern. Know the rules cold." },
    ]
  },
  {
    section: "Backend & API Design",
    icon: "🌐",
    color: "#10b981",
    qs: [
      { q: "How do you structure a Go backend project?", priority: "must", a: "Common layout: cmd/ (main packages), internal/ (private app code), pkg/ (public libraries), api/ (proto/OpenAPI specs), configs/. Layers: handler → service → repository. Depend on interfaces, not concrete types. No circular imports.", tip: "Know the Standard Go Project Layout. Mention domain-driven structure for large projects." },
      { q: "How do you handle graceful shutdown in Go?", priority: "high", a: "Listen for SIGINT/SIGTERM via signal.NotifyContext or signal.Notify. Call http.Server.Shutdown(ctx) — stops accepting, waits for in-flight requests. Add timeout context (30s). Close DB connections, flush message queues. Pattern: select on done channel + timer.", tip: "Graceful shutdown is a production must. Kubernetes sends SIGTERM before killing pods." },
      { q: "How do you implement middleware in Go?", priority: "must", a: "func Middleware(next http.Handler) http.Handler { return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { // before next.ServeHTTP(w, r) // after }) }. Chain them: router.Use(Logger, Auth, RateLimit). Each middleware wraps the next.", tip: "Draw the onion model: request goes in, traverses all middleware, hits handler, response goes back out through same middleware." },
      { q: "How do you write testable Go code?", priority: "high", a: "Depend on interfaces not concretions. Inject dependencies (constructor injection). Avoid global state and init() with side effects. Use httptest for HTTP handlers. Use sqlmock for DB. Use table-driven tests. Small functions with single responsibility are easier to test.", tip: "'If it's hard to test, it's hard to maintain.' Design for testability first." },
    ]
  },
];

// ─── DSA DATA ────────────────────────────────────────────────────────────────

const DSA_TOPICS = [
  {
    name: "Arrays & Strings",
    color: "#ef4444",
    priority: "must",
    patterns: ["Two Pointers", "Sliding Window", "Prefix Sum", "Kadane's Algorithm"],
    problems: 15,
    qs: [
      { name: "Two Sum", diff: "e", note: "HashMap approach O(n)" },
      { name: "Best Time to Buy and Sell Stock", diff: "e", note: "Single pass" },
      { name: "Maximum Subarray (Kadane's)", diff: "m", note: "Must know" },
      { name: "Longest Substring Without Repeating", diff: "m", note: "Sliding window" },
      { name: "Container With Most Water", diff: "m", note: "Two pointers" },
      { name: "Trapping Rain Water", diff: "h", note: "Two pointer / stack" },
      { name: "Product of Array Except Self", diff: "m", note: "Prefix + suffix" },
    ]
  },
  {
    name: "HashMap & HashSet",
    color: "#f59e0b",
    priority: "must",
    patterns: ["Frequency Count", "Grouping", "Complement Search"],
    problems: 10,
    qs: [
      { name: "Valid Anagram", diff: "e", note: "Char frequency" },
      { name: "Group Anagrams", diff: "m", note: "Sort key" },
      { name: "Top K Frequent Elements", diff: "m", note: "Bucket sort O(n)" },
      { name: "Longest Consecutive Sequence", diff: "m", note: "HashSet O(n)" },
      { name: "4Sum II", diff: "m", note: "Complement in map" },
    ]
  },
  {
    name: "Linked List",
    color: "#10b981",
    priority: "must",
    patterns: ["Fast & Slow Pointers", "Reversal", "Merge"],
    problems: 10,
    qs: [
      { name: "Reverse Linked List", diff: "e", note: "Iterative + recursive" },
      { name: "Merge Two Sorted Lists", diff: "e", note: "Recursion" },
      { name: "Linked List Cycle (Floyd's)", diff: "e", note: "Fast/slow pointers" },
      { name: "Find Middle of Linked List", diff: "e", note: "Fast/slow" },
      { name: "Remove Nth From End", diff: "m", note: "Two pointers" },
      { name: "Reorder List", diff: "m", note: "Find mid + reverse + merge" },
      { name: "LRU Cache", diff: "m", note: "HashMap + DoublyLinkedList" },
    ]
  },
  {
    name: "Stack & Queue",
    color: "#7c3aed",
    priority: "must",
    patterns: ["Monotonic Stack", "Min Stack", "BFS via Queue"],
    problems: 8,
    qs: [
      { name: "Valid Parentheses", diff: "e", note: "Stack" },
      { name: "Min Stack", diff: "m", note: "Auxiliary stack" },
      { name: "Daily Temperatures", diff: "m", note: "Monotonic stack" },
      { name: "Next Greater Element", diff: "m", note: "Mono stack" },
      { name: "Largest Rectangle in Histogram", diff: "h", note: "Mono stack" },
    ]
  },
  {
    name: "Trees",
    color: "#06b6d4",
    priority: "must",
    patterns: ["DFS (Pre/In/Post)", "BFS (Level Order)", "Path Problems"],
    problems: 15,
    qs: [
      { name: "Invert Binary Tree", diff: "e", note: "Recursion" },
      { name: "Maximum Depth of Binary Tree", diff: "e", note: "DFS" },
      { name: "Diameter of Binary Tree", diff: "e", note: "DFS, global max" },
      { name: "Balanced Binary Tree", diff: "e", note: "Height DFS" },
      { name: "Binary Tree Level Order (BFS)", diff: "m", note: "Queue" },
      { name: "Lowest Common Ancestor", diff: "m", note: "DFS" },
      { name: "Binary Tree Max Path Sum", diff: "h", note: "DFS + global max" },
      { name: "Serialize/Deserialize Binary Tree", diff: "h", note: "BFS or DFS" },
    ]
  },
  {
    name: "Binary Search",
    color: "#ec4899",
    priority: "must",
    patterns: ["Classic BS", "On Answer Space", "Rotated Array"],
    problems: 8,
    qs: [
      { name: "Binary Search", diff: "e", note: "Know all 3 templates" },
      { name: "Search in Rotated Sorted Array", diff: "m", note: "Find pivot" },
      { name: "Find Minimum in Rotated Array", diff: "m", note: "BS variant" },
      { name: "Koko Eating Bananas", diff: "m", note: "BS on answer space" },
      { name: "Median of Two Sorted Arrays", diff: "h", note: "BS on partition" },
    ]
  },
  {
    name: "Graphs",
    color: "#10b981",
    priority: "high",
    patterns: ["BFS", "DFS", "Union Find", "Topological Sort"],
    problems: 12,
    qs: [
      { name: "Number of Islands", diff: "m", note: "DFS/BFS on grid" },
      { name: "Clone Graph", diff: "m", note: "BFS + HashMap" },
      { name: "Course Schedule (Cycle detect)", diff: "m", note: "Topo sort / DFS" },
      { name: "Rotting Oranges", diff: "m", note: "Multi-source BFS" },
      { name: "Walls and Gates", diff: "m", note: "Multi-source BFS" },
      { name: "Pacific Atlantic Water Flow", diff: "m", note: "Reverse DFS" },
      { name: "Word Ladder", diff: "h", note: "BFS shortest path" },
    ]
  },
  {
    name: "Dynamic Programming",
    color: "#f59e0b",
    priority: "high",
    patterns: ["1D DP", "2D DP", "Knapsack", "LCS/LIS"],
    problems: 15,
    qs: [
      { name: "Climbing Stairs", diff: "e", note: "1D DP / Fibonacci" },
      { name: "House Robber", diff: "m", note: "1D DP" },
      { name: "Coin Change", diff: "m", note: "Unbounded knapsack" },
      { name: "Longest Common Subsequence", diff: "m", note: "2D DP" },
      { name: "Longest Increasing Subsequence", diff: "m", note: "DP or BS O(nlogn)" },
      { name: "0/1 Knapsack", diff: "m", note: "Classic DP" },
      { name: "Word Break", diff: "m", note: "DP + set" },
      { name: "Edit Distance", diff: "h", note: "2D DP classic" },
      { name: "Burst Balloons", diff: "h", note: "Interval DP" },
    ]
  },
  {
    name: "Heap / Priority Queue",
    color: "#7c3aed",
    priority: "high",
    patterns: ["Top K", "K-way Merge", "Median Stream"],
    problems: 6,
    qs: [
      { name: "Kth Largest Element", diff: "m", note: "Min heap size K" },
      { name: "Top K Frequent Words", diff: "m", note: "Max heap" },
      { name: "Merge K Sorted Lists", diff: "h", note: "Min heap" },
      { name: "Find Median from Data Stream", diff: "h", note: "Two heaps" },
      { name: "Task Scheduler", diff: "m", note: "Greedy + heap" },
    ]
  },
  {
    name: "Backtracking",
    color: "#ef4444",
    priority: "high",
    patterns: ["Permutations", "Combinations", "Subsets", "Constraint Satisfaction"],
    problems: 8,
    qs: [
      { name: "Subsets", diff: "m", note: "Backtrack or bitmask" },
      { name: "Permutations", diff: "m", note: "Swap + recurse" },
      { name: "Combination Sum", diff: "m", note: "Backtrack with pruning" },
      { name: "N-Queens", diff: "h", note: "Classic constraint" },
      { name: "Sudoku Solver", diff: "h", note: "Backtrack" },
      { name: "Word Search", diff: "m", note: "DFS on grid" },
    ]
  },
  {
    name: "Tries",
    color: "#06b6d4",
    priority: "med",
    patterns: ["Prefix Search", "Word Dict"],
    problems: 4,
    qs: [
      { name: "Implement Trie", diff: "m", note: "Core data structure" },
      { name: "Word Search II", diff: "h", note: "Trie + DFS" },
      { name: "Design Add and Search Words", diff: "m", note: "Trie + wildcard" },
    ]
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function QCard({ item, idx, color, open, onToggle }) {
  return (
    <div className={`q-card${open ? " open" : ""}`} style={{"--card-color": color}} onClick={onToggle}>
      <div className="q-head">
        <div className="q-left">
          <span className="q-num">#{idx+1}</span>
          <span className="q-text">{item.q}</span>
        </div>
        <div className="q-right">
          {item.priority && (
            <span className={`badge badge-${item.priority === "must" ? "must" : item.priority === "high" ? "high" : "med"}`}>
              {item.priority === "must" ? "🔴 MUST" : item.priority === "high" ? "🟡 HIGH" : "🟢 MED"}
            </span>
          )}
          <span className="q-chevron">▼</span>
        </div>
      </div>
      {open && (
        <div className="q-body">
          <div className="q-ans-label">ANSWER</div>
          <div className="q-ans">{item.a}</div>
          {item.tip && <div className="q-tip">💡 {item.tip}</div>}
        </div>
      )}
    </div>
  );
}

function DSAView() {
  const [open, setOpen] = useState(null);
  const priorityOrder = ["must", "high", "med"];
  const sorted = [...DSA_TOPICS].sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
  return (
    <div>
      <div style={{padding: "0 0 14px", borderBottom: "1px solid var(--border)", marginBottom: "14px"}}>
        <div style={{fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono)", lineHeight: 1.8}}>
          Priority guide: <span style={{color:"#fca5a5"}}>🔴 MUST</span> = cover before any interview · <span style={{color:"#fcd34d"}}>🟡 HIGH</span> = cover for product companies · <span style={{color:"#6ee7b7"}}>🟢 MED</span> = senior/FAANG rounds
        </div>
      </div>
      <div className="dsa-grid">
        {sorted.map((topic, ti) => (
          <div key={ti} className="dsa-card" style={{borderLeft: `3px solid ${topic.color}40`}}>
            <div className="dsa-card-head" onClick={() => setOpen(open === ti ? null : ti)}>
              <div className="dsa-dot" style={{background: topic.color}} />
              <div className="dsa-name">{topic.name}</div>
              <div className="dsa-meta">
                <span className={`badge badge-${topic.priority === "must" ? "must" : topic.priority === "high" ? "high" : "med"}`}>
                  {topic.priority === "must" ? "🔴 MUST" : topic.priority === "high" ? "🟡 HIGH" : "🟢 MED"}
                </span>
                <span className="dsa-problems">{topic.problems} probs</span>
                <span style={{color: "var(--muted)", fontSize: "12px"}}>{open === ti ? "▲" : "▼"}</span>
              </div>
            </div>
            {open === ti && (
              <div className="dsa-body">
                <div className="dsa-section">
                  <div className="dsa-section-title">KEY PATTERNS</div>
                  <div style={{marginBottom: "10px"}}>
                    {topic.patterns.map((p, pi) => <span key={pi} className="pattern-tag">{p}</span>)}
                  </div>
                </div>
                <div className="dsa-section">
                  <div className="dsa-section-title">MUST-SOLVE PROBLEMS</div>
                  {topic.qs.map((q, qi) => (
                    <div key={qi} className="dsa-q-item">
                      <span className={`dsa-diff diff-${q.diff}`}>{q.diff.toUpperCase()}</span>
                      <span style={{flex:1}}>{q.name}</span>
                      <span style={{color: "var(--muted)", fontSize: "10px"}}>{q.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function InterviewPrep() {
  const [activeRound, setActiveRound] = useState("hr");
  const [openQ, setOpenQ] = useState(null);

  const renderContent = () => {
    if (activeRound === "dsa") return <DSAView />;

    const dataMap = { hr: HR_DATA, tech: TECH_DATA, sd: SD_DATA, beh: BEH_DATA, go: GO_TECH };
    const data = dataMap[activeRound];

    return data.map((sec, si) => (
    return data.map((sec, si) => (
      <div key={si} style={{marginBottom: "20px"}}>
        <div className="sec-head">
          <div className="sec-icon" style={{background: `${sec.color}18`, border: `1px solid ${sec.color}25`}}>{sec.icon}</div>
          <div>
            <div className="sec-title">{sec.section}</div>
            <div className="sec-count">{sec.qs.length} questions</div>
          </div>
        </div>
        <div className="q-list">
          {sec.qs.map((q, qi) => (
            <QCard key={qi} item={q} idx={qi} color={sec.color}
              open={openQ === `${si}-${qi}`}
              onToggle={() => setOpenQ(openQ === `${si}-${qi}` ? null : `${si}-${qi}`)} />
          ))}
        </div>
      </div>
    ));
  };

  const totalQ = { hr: 9, tech: 22, sd: 10, dsa: 11, beh: 7, go: 12 };
  const activeColor = ROUNDS.find(r => r.id === activeRound)?.color;

  return (
    <>
      <style>{style}</style>
      <div className="root">
        {/* Header */}
        <div className="header">
          <div className="header-inner">
            <div className="header-tag">⚡ INTERVIEW PREP 2025</div>
            <h1>Complete <span>Interview</span><br/>Question Bank</h1>
            <p className="header-sub">All rounds · Priority-ranked · With answers</p>
            <div className="stats-row">
              <div className="stat"><span className="stat-num" style={{color:"#ef4444"}}>60+</span><span className="stat-lbl">QUESTIONS</span></div>
              <div className="stat"><span className="stat-num" style={{color:"#06b6d4"}}>6</span><span className="stat-lbl">ROUNDS</span></div>
              <div className="stat"><span className="stat-num" style={{color:"#10b981"}}>11</span><span className="stat-lbl">DSA TOPICS</span></div>
              <div className="stat"><span className="stat-num" style={{color:"#f59e0b"}}>80+</span><span className="stat-lbl">DSA PROBLEMS</span></div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="nav">
          {ROUNDS.map(r => (
            <button key={r.id} className={`nav-btn${activeRound === r.id ? " active" : ""}`}
              style={{"--active-color": r.color}}
              onClick={() => { setActiveRound(r.id); setOpenQ(null); }}>
              {r.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div style={{padding: "10px 16px 0"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"6px"}}>
            <span style={{fontSize:"11px", fontWeight:700, color: activeColor}}>{ROUNDS.find(r=>r.id===activeRound)?.label}</span>
            <span style={{fontSize:"10px", color:"var(--muted)", fontFamily:"var(--font-mono)"}}>{totalQ[activeRound]} questions</span>
          </div>
          <div className="prog-bar"><div className="prog-fill" style={{width: `${((Object.keys(totalQ).indexOf(activeRound)+1)/6)*100}%`, background: `linear-gradient(90deg, ${activeColor}, #06b6d4)`}} /></div>
        </div>

        {/* Content */}
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
