#!/usr/bin/env node
"use strict";

import { exec } from "node:child_process";
import { promisify } from "node:util";
import { resolve } from "node:path";

const _path = process.argv[2];
const execAsync = promisify(exec);

async function runScript() {
  if (_path) {
    try {
      // Tornar executável
      await execAsync("chmod +x script.sh");
      // Executar script
      const { stdout, stderr } = await execAsync(`./script.sh ${_path}`);

      if (stderr) console.error("Stderr:", stderr);
      console.log(stdout);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.error("Error: Path required");
    process.exit(1);
  }
}

runScript();
