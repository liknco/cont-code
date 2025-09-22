const fs = require("fs");
const path = require("path");

function analyzeDirectory(dirPath, ignoredDirs = []) {
  let stats = {
    files: 0,
    directories: 0,
    lines: 0,
    characters: 0,
    words: 0,
  };

  function walk(currentPath) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(currentPath, item.name);

      // Ignora diretórios especificados
      if (item.isDirectory()) {
        if (ignoredDirs.includes(item.name)) {
          continue;
        }
        stats.directories++;
        walk(fullPath);
      } else if (item.isFile()) {
        stats.files++;

        const content = fs.readFileSync(fullPath, "utf8");
        stats.characters += content.length;
        stats.lines += content.split(/\r?\n/).length;
        stats.words += content.split(/\s+/).filter(Boolean).length;
      }
    }
  }

  walk(dirPath);
  return stats;
}

// Exemplo de uso:
// node script.js ./meuProjeto node_modules dist
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Uso: node script.js <diretório> [subdir_ignorado...]");
    process.exit(1);
  }

  const targetDir = path.resolve(args[0]);
  const ignored = args.slice(1);

  const result = analyzeDirectory(targetDir, ignored);
  console.log("Resumo da análise:");
  console.log(result);
}

module.exports = analyzeDirectory;
