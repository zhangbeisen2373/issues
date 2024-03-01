const fs = require("fs");
const path = require("path");

const { ipcRenderer } = require("electron");

const sourceFilePath = path.join(__dirname, "a.txt");
const targetFilePath = path.join(__dirname, "b.txt");

console.log("pid", process.pid);

ipcRenderer.on("start", () => {
  console.log("Start");
  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(targetFilePath);
  // setInterval(() => {
  //   console.log("readStream", readStream);
  // }, 1000);
  // readStream.on("end", () => {
  //   console.log("File read complete.");
  // });

  // readStream.on("data", () => {
  //   console.log("data");
  // });

  // writeStream.on("finish", () => {
  //   console.log("File write complete.");
  // });

  // writeStream.on("error", (err) => {
  //   console.error("Error writing file:", err);
  // });

  readStream.pipe(writeStream);
});

setInterval(() => {
  console.log("still running");
}, 1000);
