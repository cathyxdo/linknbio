export function isValidUrl(url: string): boolean {
    try {
      // Add http:// prefix if it doesn't already start with http or https
      if (!/^https?:\/\//i.test(url)) {
        url = `http://${url}`;
      }
      const parsedUrl = new URL(url);
  
      // Ensure protocol is http or https and hostname contains at least one dot
      return (
        (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") &&
        /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(parsedUrl.hostname)
      );
    } catch {
      return false;
    }
  }
  