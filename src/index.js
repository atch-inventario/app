// Importar dependencias
const { app, BrowserWindow } = require('electron');
const express = require('express');
const sequelize = require('./config/database');
const path = require('path');

// Configuración
const app_express = express();
const PORT = 3000;

// Middleware
app_express.use(express.json());
app_express.set('view engine', 'ejs');
app_express.set('views', path.join(__dirname, 'views'));
app_express.use(express.static(path.join(__dirname, 'public')));

// Rutas 
const UnidadMedidaRoutes = require('./routes/UnidadMedidaRoutes');
const TipoDocumentoRoutes = require('./routes/TipoDocumentoRoutes');
const ArticuloRoutes = require('./routes/ArticuloRoutes');
const EntradaRoutes = require('./routes/EntradaRoutes');
const SalidaRoutes = require('./routes/SalidaRoutes');
const InventarioRoutes = require('./routes/InventarioRoutes');
const viewsRoutes = require('./routes/viewsRoutes');
app_express.use('/api/unidades-medida', UnidadMedidaRoutes);
app_express.use('/api/tipos-documento', TipoDocumentoRoutes);
app_express.use('/api/articulos', ArticuloRoutes);
app_express.use('/api/entradas', EntradaRoutes);
app_express.use('/api/salidas', SalidaRoutes);
app_express.use('/api/inventario', InventarioRoutes);
app_express.use('/', viewsRoutes);

// Servidor
const startServer = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync(); //    { force: true }
      app_express.listen(PORT, () => {
        console.log(`\nServidor corriendo en http://localhost:${PORT}\n`);
      });
    } catch (error) {
      console.error( error);
    }
};startServer();

//-------------------Ventana electron--------------//
let mainWindow;
function createWindow() {
  if (mainWindow) { mainWindow.focus(); return;}
  mainWindow = new BrowserWindow({
      width: 1024,
      height: 600,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
      },
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(`http://localhost:${PORT}`);
  mainWindow.on('closed', () => {mainWindow = null;});
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
});
app.on('activate', () => {
  if (mainWindow === null) { createWindow(); }
});


/*--------------------------------------------------------/•/
npm init -y
npm install sqlite3 sequelize express ejs
npm install electron --save-dev
npm install electron-packager
npm list --depth=0

{
  "productName":"Inventario",
  ...
  "main": "src/index.js",
  "scripts": {
    "start": "electron src/index.js",
    "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/icon.icns --prune=true --out=release-builds",
    "package-win": "electron-packager . inventario --overwrite --platform=win32 --asar --arch=x64 --icon=assets/icons/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Inventario\"",
    "package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"
  },
}

npm start
npm run package-win
npm run package-mac
npm run package-linux
/•-------------------------------------------------------/*/