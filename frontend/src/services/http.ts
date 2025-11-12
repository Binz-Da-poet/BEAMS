export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpHeaders = Record<string, string>;

export interface HttpRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: HttpHeaders;
  body?: TBody;
  signal?: AbortSignal;
}

export interface HttpClientOptions {
  baseUrl?: string;
  defaultHeaders?: HttpHeaders;
  getAccessToken?: () => Promise<string | null> | string | null;
  onUnauthorized?: (error: HttpError) => Promise<boolean> | boolean;
}

export class HttpError extends Error {
  status: number;
  statusText: string;
  responseBody?: unknown;
  constructor(message: string, status: number, statusText: string, responseBody?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.responseBody = responseBody;
  }
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: HttpHeaders;
  private readonly getAccessTokenFn?: () => Promise<string | null> | string | null;
  private readonly onUnauthorizedFn?: (error: HttpError) => Promise<boolean> | boolean;

  constructor(options: HttpClientOptions = {}) {
    this.baseUrl = (options.baseUrl || '').replace(/\/$/, '');
    this.defaultHeaders = Object.assign({ 'Content-Type': 'application/json' }, options.defaultHeaders || {});
    this.getAccessTokenFn = options.getAccessToken;
    this.onUnauthorizedFn = options.onUnauthorized;
  }

  private buildUrl(pathname: string): string {
    if (!this.baseUrl) return pathname;
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `${this.baseUrl}${path}`;
  }

  private async resolveAccessToken(): Promise<string | null> {
    if (!this.getAccessTokenFn) {
      return null;
    }
    try {
      const tokenOrPromise = this.getAccessTokenFn();
      if (typeof (tokenOrPromise as Promise<unknown>)?.then === 'function') {
        return await (tokenOrPromise as Promise<string | null>);
      }
      return tokenOrPromise as string | null;
    } catch {
      return null;
    }
  }

  async request<TResponse = unknown, TBody = unknown>(
    pathname: string,
    { method = 'GET', headers, body, signal }: HttpRequestOptions<TBody> = {},
    hasRetried = false,
  ): Promise<TResponse> {
    const url = this.buildUrl(pathname);

    const isJsonBody = body != null && typeof body !== 'string' && !(body instanceof FormData);
    const finalHeaders: HeadersInit = Object.assign({}, this.defaultHeaders, headers || {});

    const token = await this.resolveAccessToken();
    if (token) {
      (finalHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const payload: BodyInit | undefined = isJsonBody ? JSON.stringify(body) : (body as unknown as BodyInit | undefined);

    const res = await fetch(url, { method, headers: finalHeaders, body: payload, signal });
    const contentType = res.headers.get('content-type') || '';
    let data: unknown = undefined;
    try {
      if (contentType.includes('application/json')) data = await res.json();
      else data = await res.text();
    } catch {}

    if (!res.ok) {
      const error = new HttpError(`Request failed: ${res.status}`, res.status, res.statusText, data);
      if (!hasRetried && error.status === 401 && this.onUnauthorizedFn) {
        const shouldRetry = await this.onUnauthorizedFn(error);
        if (shouldRetry) {
          return this.request<TResponse, TBody>(pathname, { method, headers, body, signal }, true);
        }
      }
      throw error;
    }
    return data as TResponse;
  }

  get<TResponse = unknown>(pathname: string, options?: Omit<HttpRequestOptions<never>, 'method' | 'body'>) {
    return this.request<TResponse>(pathname, { ...options, method: 'GET' });
  }
  post<TResponse = unknown, TBody = unknown>(pathname: string, body?: TBody, options?: Omit<HttpRequestOptions<TBody>, 'method'>) {
    return this.request<TResponse, TBody>(pathname, { ...options, method: 'POST', body });
  }
  put<TResponse = unknown, TBody = unknown>(pathname: string, body?: TBody, options?: Omit<HttpRequestOptions<TBody>, 'method'>) {
    return this.request<TResponse, TBody>(pathname, { ...options, method: 'PUT', body });
  }
  patch<TResponse = unknown, TBody = unknown>(pathname: string, body?: TBody, options?: Omit<HttpRequestOptions<TBody>, 'method'>) {
    return this.request<TResponse, TBody>(pathname, { ...options, method: 'PATCH', body });
  }
  delete<TResponse = unknown>(pathname: string, options?: Omit<HttpRequestOptions<never>, 'method' | 'body'>) {
    return this.request<TResponse>(pathname, { ...options, method: 'DELETE' });
  }
}

// Default client without baseUrl; apps can create a configured instance elsewhere
export const httpClient = new HttpClient();
