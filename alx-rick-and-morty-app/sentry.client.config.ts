import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "SENTRY_DSN_HERE",
  tracesSampleRate: 1.0,

});