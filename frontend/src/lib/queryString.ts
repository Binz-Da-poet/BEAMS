export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export function toQueryString(params: QueryParams): string {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;
    usp.set(key, String(value));
  });
  const s = usp.toString();
  return s ? `?${s}` : '';
}

export function fromQueryString(search: string): Record<string, string> {
  const usp = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const out: Record<string, string> = {};
  usp.forEach((v, k) => (out[k] = v));
  return out;
}
