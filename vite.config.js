import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
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
