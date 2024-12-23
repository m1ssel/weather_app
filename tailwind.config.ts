import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary_s: '#D69E36',
                secondary_s: '#DEAB4D',
                primary_n: '#403B45',
                secondary_n: '#ACA0B7',
                nav: '#2B261D',
            },
        },
    },
    plugins: [],
} satisfies Config;
