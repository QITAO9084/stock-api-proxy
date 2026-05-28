export const config = { runtime: 'edge' };

export default async (request) => {
  const targetUrl = 'https://stock-api.gml4.onrender.com';
  const url = new URL(request.url);
  // 去掉 /api 前缀
  const forwardPath = url.pathname.replace(/^\/api/, '');
  const target = `${targetUrl}${forwardPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const response = await fetch(target, {
    method: request.method,
    headers: headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('access-control-allow-origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
};
