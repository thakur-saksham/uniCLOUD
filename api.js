/**
 * uniCLOUD — Frontend API Client  (js/api.js)
 * ============================================
 * Exposes window.unicloud with helpers that every page uses.
 * Uses fetch() with credentials:include so the session cookie
 * is sent on every request automatically.
 *
 * Usage in any HTML page:
 *   <script src="js/api.js"></script>
 *   window.unicloud.post('/auth/login', { email, password })
 *     .then(data => { if (data.error) ... else redirect ... })
 */
(function () {
  'use strict';

  // ── Base URL ─────────────────────────────────────────────────────────
  // Auto-detect: if window.UNICLOUD_API_BASE is set, use it.
  // Otherwise, use the current page's origin (works when Express serves the HTML).
  // For local dev without Express (file://), falls back to localhost:3000.
  const BASE = window.UNICLOUD_API_BASE ||
    (window.location.protocol === 'file:' ? 'http://localhost:3000' : window.location.origin);

  // ── Core fetch wrapper ────────────────────────────────────────────────
  async function request(method, path, body) {
    const opts = {
      method,
      credentials: 'include',           // send session cookie
      headers: { 'Content-Type': 'application/json' }
    };
    if (body !== undefined) opts.body = JSON.stringify(body);

    const url = BASE + (path.startsWith('/') ? path : '/' + path);

    try {
      const res  = await fetch(url, opts);
      const data = await res.json().catch(() => ({}));

      // Attach status and error field for pages that check data.error
      data._status = res.status;
      if (!res.ok && !data.error) data.error = data.message || 'Request failed';

      // Throw on 401 for protected routes; return error body for login/signup attempts
      const isAuthAttempt = /^\/auth\/(login|signup|google)/.test(path);
      if (res.status === 401 && !isAuthAttempt) {
        const err = new Error(data.error || 'Not authenticated');
        err.status = 401;
        throw err;
      }

      return data;
    } catch (err) {
      if (err.status) throw err; // re-throw auth errors
      // Network failure
      return { error: 'Network error — is the server running?' };
    }
  }

  // ── Public API ────────────────────────────────────────────────────────
  window.unicloud = {
    get:   (path)        => request('GET',    path),
    post:  (path, body)  => request('POST',   path, body),
    patch: (path, body)  => request('PATCH',  path, body),
    put:   (path, body)  => request('PUT',    path, body),
    del:   (path)        => request('DELETE', path),

    /** Logout: destroy server session then redirect */
    logout() {
      return request('POST', '/auth/logout').finally(() => {
        sessionStorage.clear();
        window.location.href = '/login.html';
      });
    },

    /** Check if user is authenticated (async) — returns user or null, never throws */
    async checkAuth() {
      try {
        const data = await fetch(BASE + '/auth/me', { credentials: 'include' }).then(r => r.json());
        return data?.user || null;
      } catch {
        return null;
      }
    }
  };

  // ── Auto-guard protected pages ────────────────────────────────────────
  const PUBLIC = ['login.html'];

  (async function guardPage() {
    const page = window.location.pathname.split('/').pop() || '';
    if (PUBLIC.some(p => page === p || page.endsWith(p))) return;

    const user = await window.unicloud.checkAuth();
    if (!user) {
      window.location.href = '/login.html';
    }
  })();

  console.log('[uniCLOUD] API client ready →', BASE);
})();
