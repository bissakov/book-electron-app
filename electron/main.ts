import { app, ipcMain, BrowserWindow } from "electron";
import { createAuthWindow, createLogoutWindow } from "./auth-process";
import createAppWindow from "./app-process";
import {
  refreshTokens,
  getProfile,
  readEncryptedToken,
  storeEncryptedToken,
} from "../services/auth-service";
import { getPrivateData } from "../services/api-service";
import path from "node:path";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

function showWindow() {
  refreshTokens()
    .then(() => {
      createAppWindow();
    })
    .catch(() => {
      createAuthWindow();
    });
}

app.on("ready", () => {
  ipcMain.handle("auth:get-profile", getProfile);
  ipcMain.handle("api:get-private-data", getPrivateData);
  ipcMain.on("auth:readEncryptedToken", readEncryptedToken);
  ipcMain.on("auth:storeEncryptedToken", (_, token) =>
    storeEncryptedToken(token),
  );
  ipcMain.on("auth:log-out", () => {
    BrowserWindow.getAllWindows().forEach((window) => window.close());
    createLogoutWindow();
  });

  showWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
