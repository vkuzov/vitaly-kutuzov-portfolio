/** Resolve local paths under the hosting base, preserving external links and anchors. */
export function siteUrl(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${import.meta.env.BASE_URL}${path.slice(1)}`;
}

export function sitePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const local = base && (pathname === base || pathname.startsWith(`${base}/`))
    ? pathname.slice(base.length)
    : pathname;
  return local.replace(/\/+$/, '') || '/';
}
