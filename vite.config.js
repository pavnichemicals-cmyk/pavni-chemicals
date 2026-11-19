import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  plugins: [
    {
      name: 'clean-urls-dev-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && !req.url.includes('.') && !req.url.startsWith('/@') && !req.url.startsWith('/node_modules')) {
            const urlPath = req.url.split('?')[0];
            const candidate = resolve(__dirname, urlPath.slice(1) + '.html');
            if (fs.existsSync(candidate)) {
              req.url = req.url.replace(urlPath, urlPath + '.html');
            }
          }
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        products: resolve(__dirname, 'products.html'),
        industries: resolve(__dirname, 'industries.html'),
        productDetail: resolve(__dirname, 'product-detail.html'),
        causticLye: resolve(__dirname, 'product-detail-caustic-lye.html'),
        causticFlakes: resolve(__dirname, 'product-detail-caustic-flakes.html'),
        hcl: resolve(__dirname, 'product-detail-hcl.html'),
        h2o2: resolve(__dirname, 'product-detail-h2o2.html'),
      },
    },
  },
});
