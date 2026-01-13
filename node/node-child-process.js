// child_process: exec (prosty), spawn (strumienie), z komentarzami
const { exec, spawn } = require("child_process"); // moduł procesów potomnych

// exec: uruchamia komendę w shellu, buforuje cały output
function runExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error); // błąd procesu
      if (stderr) console.warn("stderr:", stderr); // ostrzeżenia
      resolve(stdout.trim()); // zwracamy stdout
    });
  });
}

// spawn: strumieniuje stdout/stderr, lepszy dla dużych danych
function runSpawn(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "pipe" }); // stdio w pipe
    let output = ""; // bufor stdout
    let errors = ""; // bufor stderr

    child.stdout.on("data", (data) => { output += data.toString(); }); // zbieraj stdout
    child.stderr.on("data", (data) => { errors += data.toString(); }); // zbieraj stderr
    child.on("close", (code) => {
      if (code === 0) resolve(output.trim()); // sukces
      else reject(new Error(`Exit code ${code}: ${errors}`)); // błąd z kodem
    });
  });
}

// Przykładowe użycie gdy plik uruchamiany bezpośrednio
if (require.main === module) {
  runExec("node -v").then((v) => console.log("exec node -v =>", v));
  runSpawn("node", ["-e", "console.log('hello from spawn')"])
    .then((out) => console.log("spawn =>", out));
}

module.exports = { runExec, runSpawn };

// ---
// Dlaczego tak:
// - exec jest wygodny dla krótkiego outputu (buforuje całość), spawn lepszy dla strumieni/dużych danych.
// - Promise ułatwia użycie w async/await i w testach.
// - Zbieranie stdout/stderr i kodu wyjścia pozwala jasno raportować błędy procesów potomnych.
// - require.main blok demonstruje szybkie odpalenie przykładów z CLI bez dodatkowych skryptów.
