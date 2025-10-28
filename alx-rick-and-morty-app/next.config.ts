import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

const sentryWebpackPluginOptions = {

  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);