export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Only POST allowed', { status: 405 });
    }
    const body = await request.text();
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body,
    });
    const respBody = await upstream.text();
    return new Response(respBody, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
