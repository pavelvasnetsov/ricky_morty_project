require('dotenv').config();

const isDev = process.env.NODE_ENV === 'production' ? false : true;

export default {
    ssr: process.env.SSR_MODE === 'true',

    server: {
        port: process.env.PORT_DEVELOPMENT,
    },

    router: {
        middleware: ['layout'],
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Nuxt Starter',
        htmlAttrs: {
            lang: 'ru',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'Nuxt Starter', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/styles/antd-ui.less'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['@/plugins/antd-ui.ts'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxtjs/dotenv',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        'lodash',
    ],

    styleResources: {
        less: [`@/assets/scss/variables.less`],
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: isDev,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|less)$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },
        loaders: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
};
