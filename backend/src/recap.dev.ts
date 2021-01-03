import { traceExpress, captureConsoleLogs } from '@recap.dev/client';
import express from 'express';

export const trace = () => {
  if (
    process.env.RECAP_DEV_ENABLED &&
    process.env.RECAP_DEV_ENABLED === 'true'
  ) {
    traceExpress(express);
    captureConsoleLogs();
  }
};
