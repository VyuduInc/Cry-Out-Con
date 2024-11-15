import { createPayloadClient } from 'payload-client';

export const payloadClient = createPayloadClient({
  url: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
});