import { exec } from "child_process";
import os from "os";

const operationalSystem = os.type();

let readFileCommand = operationalSystem === "Windows_NT" ? "type" : "cat";

exec(`${readFileCommand} text.txt`, (err, stdout, stderr) =>{
   console.log("STDOUT: ", stdout);
});
