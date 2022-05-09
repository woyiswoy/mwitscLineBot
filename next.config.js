/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        LIFF_ID: process.env.LIFF_ID,
    },
}

module.exports = nextConfig