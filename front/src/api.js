export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) },
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(body.error ?? `Erreur ${res.status}`, res.status, body);
  return body;
}

export const api = {
  home: () => request('/home'),
  project: (slug) => request(`/projects/${encodeURIComponent(slug)}`),
  journey: () => request('/journey'),
  contact: (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
};
