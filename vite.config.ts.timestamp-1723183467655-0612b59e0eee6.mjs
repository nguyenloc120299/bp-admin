// vite.config.ts
import { defineConfig } from "file:///D:/bo-admin/node_modules/vite/dist/node/index.js";
import react from "file:///D:/bo-admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwind from "file:///D:/bo-admin/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/bo-admin/node_modules/autoprefixer/lib/autoprefixer.js";
import { createHtmlPlugin } from "file:///D:/bo-admin/node_modules/vite-plugin-html/dist/index.mjs";

// config.ts
var CONFIG = {
  appName: "Xoso",
  helpLink: "https://github.com/arifszn/reforge",
  enablePWA: true,
  theme: {
    accentColor: "#0a0c10",
    sidebarLayout: "mix" /* MIX */,
    showBreadcrumb: true
  },
  metaTags: {
    title: "Reforge",
    description: "An out-of-box UI solution for enterprise applications as a React boilerplate.",
    imageURL: "logo.svg"
  }
};
var config_default = CONFIG;

// tailwind.config.mjs
var tailwind_config_default = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: config_default.theme.accentColor
      }
    }
  },
  plugins: []
};

// vite.config.ts
import { VitePWA } from "file:///D:/bo-admin/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: config_default.appName,
          metaTitle: config_default.metaTags.title,
          metaDescription: config_default.metaTags.description,
          metaImageURL: config_default.metaTags.imageURL
        }
      }
    }),
    ...config_default.enablePWA ? [
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["icon.png"],
        manifest: {
          name: config_default.appName,
          short_name: config_default.appName,
          description: config_default.metaTags.description,
          theme_color: config_default.theme.accentColor,
          icons: [
            {
              src: "icon.png",
              sizes: "64x64 32x32 24x24 16x16 192x192 512x512",
              type: "image/png"
            }
          ]
        }
      })
    ] : []
  ],
  css: {
    postcss: {
      plugins: [tailwind(tailwind_config_default), autoprefixer]
    }
  },
  define: {
    CONFIG: config_default
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY29uZmlnLnRzIiwgInRhaWx3aW5kLmNvbmZpZy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxiby1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYm8tYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2JvLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcbmltcG9ydCB0YWlsd2luZENvbmZpZyBmcm9tICcuL3RhaWx3aW5kLmNvbmZpZy5tanMnO1xuaW1wb3J0IENPTkZJRyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgaW5qZWN0OiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0aXRsZTogQ09ORklHLmFwcE5hbWUsXG4gICAgICAgICAgbWV0YVRpdGxlOiBDT05GSUcubWV0YVRhZ3MudGl0bGUsXG4gICAgICAgICAgbWV0YURlc2NyaXB0aW9uOiBDT05GSUcubWV0YVRhZ3MuZGVzY3JpcHRpb24sXG4gICAgICAgICAgbWV0YUltYWdlVVJMOiBDT05GSUcubWV0YVRhZ3MuaW1hZ2VVUkwsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIC4uLihDT05GSUcuZW5hYmxlUFdBXG4gICAgICA/IFtcbiAgICAgICAgICBWaXRlUFdBKHtcbiAgICAgICAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgICAgICAgaW5jbHVkZUFzc2V0czogWydpY29uLnBuZyddLFxuICAgICAgICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgICAgICAgbmFtZTogQ09ORklHLmFwcE5hbWUsXG4gICAgICAgICAgICAgIHNob3J0X25hbWU6IENPTkZJRy5hcHBOYW1lLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogQ09ORklHLm1ldGFUYWdzLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICB0aGVtZV9jb2xvcjogQ09ORklHLnRoZW1lLmFjY2VudENvbG9yLFxuICAgICAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHNyYzogJ2ljb24ucG5nJyxcbiAgICAgICAgICAgICAgICAgIHNpemVzOiAnNjR4NjQgMzJ4MzIgMjR4MjQgMTZ4MTYgMTkyeDE5MiA1MTJ4NTEyJyxcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICBdXG4gICAgICA6IFtdKSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW3RhaWx3aW5kKHRhaWx3aW5kQ29uZmlnKSwgYXV0b3ByZWZpeGVyXSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBDT05GSUc6IENPTkZJRyxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxiby1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYm8tYWRtaW5cXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9iby1hZG1pbi9jb25maWcudHNcIjsvL2NvbmZpZy50c1xyXG5cclxuZW51bSBMYXlvdXRUeXBlIHtcclxuICBNSVggPSAnbWl4JyxcclxuICBUT1AgPSAndG9wJyxcclxuICBTSURFID0gJ3NpZGUnLFxyXG59XHJcblxyXG5jb25zdCBDT05GSUcgPSB7XHJcbiAgYXBwTmFtZTogJ1hvc28nLFxyXG4gIGhlbHBMaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2FyaWZzem4vcmVmb3JnZScsXHJcbiAgZW5hYmxlUFdBOiB0cnVlLFxyXG4gIHRoZW1lOiB7XHJcbiAgICBhY2NlbnRDb2xvcjogJyMwYTBjMTAnLFxyXG4gICAgc2lkZWJhckxheW91dDogTGF5b3V0VHlwZS5NSVgsXHJcbiAgICBzaG93QnJlYWRjcnVtYjogdHJ1ZSxcclxuICB9LFxyXG4gIG1ldGFUYWdzOiB7XHJcbiAgICB0aXRsZTogJ1JlZm9yZ2UnLFxyXG4gICAgZGVzY3JpcHRpb246XHJcbiAgICAgICdBbiBvdXQtb2YtYm94IFVJIHNvbHV0aW9uIGZvciBlbnRlcnByaXNlIGFwcGxpY2F0aW9ucyBhcyBhIFJlYWN0IGJvaWxlcnBsYXRlLicsXHJcbiAgICBpbWFnZVVSTDogJ2xvZ28uc3ZnJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ09ORklHO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGJvLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxiby1hZG1pblxcXFx0YWlsd2luZC5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9iby1hZG1pbi90YWlsd2luZC5jb25maWcubWpzXCI7aW1wb3J0IENPTkZJRyBmcm9tICcuL2NvbmZpZyc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd0YWlsd2luZGNzcycpLkNvbmZpZ30gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29udGVudDogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMvKiovKi57anMsdHMsanN4LHRzeH0nXSxcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHtcbiAgICAgIGNvbG9yczoge1xuICAgICAgICBwcmltYXJ5OiBDT05GSUcudGhlbWUuYWNjZW50Q29sb3IsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtdLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdU4sU0FBUyxvQkFBb0I7QUFDcFAsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLHdCQUF3Qjs7O0FDSWpDLElBQU0sU0FBUztBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLGFBQ0U7QUFBQSxJQUNGLFVBQVU7QUFBQSxFQUNaO0FBQ0Y7QUFFQSxJQUFPLGlCQUFROzs7QUN0QmYsSUFBTywwQkFBUTtBQUFBLEVBQ2IsU0FBUyxDQUFDLGdCQUFnQiw0QkFBNEI7QUFBQSxFQUN0RCxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixTQUFTLGVBQU8sTUFBTTtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQztBQUNaOzs7QUZOQSxTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04saUJBQWlCO0FBQUEsTUFDZixRQUFRO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixPQUFPLGVBQU87QUFBQSxVQUNkLFdBQVcsZUFBTyxTQUFTO0FBQUEsVUFDM0IsaUJBQWlCLGVBQU8sU0FBUztBQUFBLFVBQ2pDLGNBQWMsZUFBTyxTQUFTO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxHQUFJLGVBQU8sWUFDUDtBQUFBLE1BQ0UsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFFBQ2QsZUFBZSxDQUFDLFVBQVU7QUFBQSxRQUMxQixVQUFVO0FBQUEsVUFDUixNQUFNLGVBQU87QUFBQSxVQUNiLFlBQVksZUFBTztBQUFBLFVBQ25CLGFBQWEsZUFBTyxTQUFTO0FBQUEsVUFDN0IsYUFBYSxlQUFPLE1BQU07QUFBQSxVQUMxQixPQUFPO0FBQUEsWUFDTDtBQUFBLGNBQ0UsS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsSUFDQSxDQUFDO0FBQUEsRUFDUDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFNBQVMsdUJBQWMsR0FBRyxZQUFZO0FBQUEsSUFDbEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
