// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { ipcMain } = require("electron");

console.log("main pid", process.pid);
let count = 0;
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      sandbox: false, // add this
    },
  });

  // 加载 index.html
  mainWindow.loadFile("index.html");
  mainWindow.webContents.setWindowOpenHandler(() => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        webPreferences: {
          preload: path.join(__dirname, "./child/preload.js"),
          nodeIntegration: true,
          contextIsolation: true,
          sandbox: false, // add this
          devTools: true,
        },
      },
    };
  });
  // 打开开发工具
  // mainWindow.webContents.openDevTools()
};

app.whenReady().then(() => {
  // for (let i = 0; i < 10; i++) {
  createWindow();
  // }
  setTimeout(() => {
    BrowserWindow.getAllWindows().forEach((win, index) => {
      win.webContents.openDevTools({
        mode: "bottom",
      });
    });
  }, 1000);

  setTimeout(() => {
    BrowserWindow.getAllWindows().forEach((win, index) => {
      if (index === 9) {
        win.webContents.send("start");
      }
    });
  }, 3000);

  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
