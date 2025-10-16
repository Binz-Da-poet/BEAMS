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

  constructor(options: HttpClientOptions = {}) {
    this.baseUrl = (options.baseUrl || '').replace(/\/$/, '');
    this.defaultHeaders = Object.assign({ 'Content-Type': 'application/json' }, options.defaultHeaders || {});
  }

  private buildUrl(pathname: string): string {
    if (!this.baseUrl) return pathname;
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `${this.baseUrl}${path}`;
  }

  async request<TResponse = unknown, TBody = unknown>(pathname: string, { method = 'GET', headers, body, signal }: HttpRequestOptions<TBody> = {}): Promise<TResponse> {
    const url = this.buildUrl(pathname);

    const isJsonBody = body != null && typeof body !== 'string' && !(body instanceof FormData);
    const finalHeaders: HeadersInit = Object.assign({}, this.defaultHeaders, headers || {});
    const payload: BodyInit | undefined = isJsonBody ? JSON.stringify(body) : (body as unknown as BodyInit | undefined);

    const res = await fetch(url, { method, headers: finalHeaders, body: payload, signal });
    const contentType = res.headers.get('content-type') || '';
    let data: unknown = undefined;
    try {
      if (contentType.includes('application/json')) data = await res.json();
      else data = await res.text();
    } catch {}

    if (!res.ok) {
      throw new HttpError(`Request failed: ${res.status}`, res.status, res.statusText, data);
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
