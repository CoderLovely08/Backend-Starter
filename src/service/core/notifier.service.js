import config from '@/config/app.config.js';
import { customLogger } from '@/middlewares/logging.middleware.js';
import { MESSAGE_URL } from '@/utils/constants/app.constant.js';
import axios from 'axios';

export const sendTelegramMessage = async ({
  message = 'No message',
  stack = '',
  method = '',
  path = '',
  body = {},
  query = {},
  user = 'Unknown',
}) => {
  try {
    const now = new Date().toISOString();

    const formattedMessage = `
🚨 *Backend Error Alert*
*${config.APP_NAME}*
*Time:* ${now}
*Environment:* ${config.ENV}
*User:* ${user}
*Path:* \`${method} ${path}\`
*Query:* \`${JSON.stringify(query)}\`
*Body:* \`${JSON.stringify(body)}\`

*Error:* \`${message}\`
*Stack Trace:*
\`\`\`
${stack?.split('\n').slice(0, 5).join('\n') || 'N/A'}
\`\`\`
`.trim();

    const response = await axios.post(MESSAGE_URL(config.TELEGRAM.BOT_TOKEN), {
      chat_id: config.TELEGRAM.CHAT_ID,
      text: formattedMessage,
      parse_mode: 'Markdown',
    });

    return response.data;
  } catch (error) {
    customLogger.error('Telegram Notification Failed', {
      message: error.message,
      stack: error.stack,
    });
    // Don't throw to avoid interfering with main error handling
    return null;
  }
};
