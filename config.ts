//config.ts

enum LayoutType {
  MIX = 'mix',
  TOP = 'top',
  SIDE = 'side',
}

const CONFIG = {
  appName: 'Xoso',
  helpLink: 'https://github.com/arifszn/reforge',
  enablePWA: true,
  theme: {
    accentColor: '#0a0c10',
    sidebarLayout: LayoutType.MIX,
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'Reforge',
    description:
      'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    imageURL: 'logo.svg',
  },
};

export default CONFIG;
