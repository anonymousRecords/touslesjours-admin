/** @type {import('next').NextConfig} */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

module.exports = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

const nextConfig = {
  reactStrictMode: false,
};
