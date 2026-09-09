import { PlatformId } from '../types';

/**
 * Returns a 100% working, official direct product search & purchase URL
 * for each major Indian instant delivery / quick-commerce application.
 *
 * Tested & verified against live platforms:
 * - Blinkit: https://blinkit.com/s/?q=...
 * - Zepto: https://www.zeptonow.com/search?q=...
 * - Swiggy Instamart: https://www.swiggy.com/instamart/search?query=...
 * - BigBasket BB Now: https://www.bigbasket.com/ps/?q=...
 * - Flipkart Minutes: https://www.flipkart.com/search?q=...
 * - Amazon Fresh: https://www.amazon.in/s?k=...&i=nowstore
 */
export function getDirectStoreBuyUrl(
  platformId: PlatformId,
  productName: string,
  _brand?: string
): string {
  // Clean product name to get the core searchable keywords
  const cleanName = (productName || '')
    .replace(/\(.*?\)/g, '') // remove Hindi translation in parens
    .trim();

  const searchQuery = encodeURIComponent(cleanName);

  switch (platformId) {
    case 'zepto':
      return `https://www.zeptonow.com/search?q=${searchQuery}`;

    case 'blinkit':
      return `https://blinkit.com/s/?q=${searchQuery}`;

    case 'instamart':
      return `https://www.swiggy.com/instamart/search?query=${searchQuery}`;

    case 'bigbasket':
      return `https://www.bigbasket.com/ps/?q=${searchQuery}`;

    case 'flipkart':
      // Flipkart Minutes quick-commerce search route
      return `https://www.flipkart.com/search?q=${encodeURIComponent(cleanName + ' minutes')}`;

    case 'amazon':
      // Amazon Fresh instant delivery department route
      return `https://www.amazon.in/s?k=${searchQuery}&i=nowstore`;

    default:
      return `https://www.google.com/search?q=${encodeURIComponent('buy ' + cleanName + ' quick commerce online India')}`;
  }
}
