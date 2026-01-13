// Cluster: uruchamianie wielu workerów (procesów) nasłuchujących na jednym porcie.
// Przydatne do wykorzystania wielu rdzeni CPU dla zadań I/O (HTTP).
const cluster = require("cluster"); // moduł cluster
const http = require("http"); // serwer HTTP
const os = require("os"); // liczba rdzeni

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length; // ile rdzeni
  console.log(`Master PID ${process.pid} startuje ${cpuCount} workerów`); // log

  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork(); // twórz workery (procesy)
  }

  // Logowanie, gdy worker umiera
  cluster.on("exit", (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} zmarł (code=${code}, signal=${signal}). Restart...`); // log
    cluster.fork(); // restart nowego workera
  });
} else {
  // Kod wykonywany w workerach: prosty serwer HTTP
  const server = http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, pid: process.pid }));
      return;
    }
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  });

  const PORT = process.env.PORT || 3000; // port do nasłuchu
  server.listen(PORT, () => {
    console.log(`Worker PID ${process.pid} nasłuchuje na http://localhost:${PORT}`);
  });
}

// ---
// Dlaczego tak:
// - cluster pozwala prosto wykorzystać wiele rdzeni bez zmiany kodu serwera HTTP.
// - Master forkuje tyle workerów, ile rdzeni, i restartuje padające procesy.
// - Workery współdzielą port i obsługują żądania równolegle, co zwiększa throughput przy I/O bound.
// - Ścieżka /health umożliwia szybkie sprawdzenie działania i PID obsługującego żądanie.
