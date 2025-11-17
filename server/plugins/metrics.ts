import { defineNitroPlugin } from '#imports';
import { initializeAllMetrics } from '../utils/metrics';
import { scopedLogger } from '../utils/logger';

const log = scopedLogger('metrics-plugin');

export default defineNitroPlugin(async () => {
  try {
    // Skip file-based metrics initialization in serverless environments
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      log.info('Running in serverless environment - skipping file-based metrics initialization');
      return;
    }
    
    log.info('Initializing metrics at startup...');
    await initializeAllMetrics();
    log.info('Metrics initialized.');
  } catch (error) {
    log.error('Failed to initialize metrics at startup', {
      error: error instanceof Error ? error.message : String(error),
    });
    // Don't throw - allow server to start even if metrics fail
  }
});



