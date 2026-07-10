import os from "os";
import { exec } from "child_process";
import path from "path";

const PLATFORM = os.platform();
const PATH = path.resolve(process.argv[2]);

if (PLATFORM == "linux") {
  exec(`bash script.sh ${PATH}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return;
    }
    console.log(stdout);
  });
}

