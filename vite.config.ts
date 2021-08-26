import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import eslint from 'vite-plugin-eslint'
import { resolve } from 'path'

const pathResolver = (pathStr) => {
	return resolve(__dirname, '.', pathStr)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathResolver('./src')
    },
  },
  plugins: [
    reactRefresh(),
    /*
    * @cache: close
    * @fix: auto fix when u save the code
    */
    eslint({
      cache: false,
      fix: true,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/**/*.ts'],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   hack: `true; @import (reference) "@/styles/global.less";`,
        // },
        javascriptEnabled: true,
        additionalData:  `@import "${pathResolver('src/assets/styles/global.less')}";`
      },
    },
  },
})
