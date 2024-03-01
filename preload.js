// const fs = require("fs");
// const path = require("path");

// const { app, BrowserWindow } = require("electron");
// const { ipcRenderer } = require("electron");

// const sourceFilePath = path.join(__dirname, "largefile");
// const targetFilePath = path.join(__dirname, "b.txt");

// ipcRenderer.on("start", () => {
//   console.log("started");
//   const readStream = fs.createReadStream(sourceFilePath);
//   const writeStream = fs.createWriteStream(targetFilePath);
//   readStream.on("end", () => {
//     console.log("File read complete.");
//   });

//   readStream.on("data", () => {
//     console.log("data");
//   });

//   writeStream.on("finish", () => {
//     console.log("File write complete.");
//   });

//   writeStream.on("error", (err) => {
//     console.error("Error writing file:", err);
//   });
//   readStream.pipe(writeStream);
// });
