import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedLinkedInText, setCopiedLinkedInText] = useState(false);
  const [copiedWhatsAppText, setCopiedWhatsAppText] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'linkedin_kit' | 'google_seo'>('share');

  if (!isOpen) return null;

  const siteUrl = 'https://bachatradar.com/';

  // Viral WhatsApp message
  const whatsAppMessage = `🛒 *BachatRadar (बचत रडार) — India's #1 Daily Quick-Commerce Price Tracker!*

Ever noticed how Blinkit, Zepto, Swiggy Instamart, and BigBasket charge totally different prices for the exact same milk, vegetables, and atta?

Families are saving *₹1,500 to ₹3,500 every month* using BachatRadar!
⚡ Compare 10-minute darkstores in 1 tap
🥦 Avoid surge charges & find secret discounts
🎉 *100% FREE for all Indian families (Zero fees)*

Founded by *Gopagani Arun*.
Check prices now: ${siteUrl}`;

  // LinkedIn Post Content
  const linkedInPostText = `🚀 Excited to publicly announce BachatRadar (बचत रडार) — India's 1st Real-Time Quick-Commerce Price Aggregator & Arbitrage Platform!

🛒 THE PROBLEM:
Millions of Indian households in Hyderabad, Bengaluru, Delhi NCR, and Mumbai order daily groceries from Blinkit, Zepto, Swiggy Instamart, BigBasket, and Flipkart Minutes.
Due to dynamic surge pricing and delivery fees, an average Indian family overpays by ₹1,500 – ₹3,500 every month on basic staples.

💡 THE SOLUTION:
BachatRadar aggregates live darkstore rates side-by-side:
✅ 1-Tap Price Comparison across all quick-commerce darkstores
✅ Multi-Store Cart Splitter maximizing grocery savings
✅ Hyperlocal Darkstore Locator for your specific pincode
✅ 100% Free Public Utility — Zero fees, zero commissions
✅ Zero-Photo Privacy: Strict cellular SMS OTP authentication (no member cameras)

Proudly 100% Founded & Bootstrapped by Gopagani Arun.

Try it live: https://bachatradar.com/

#QuickCommerce #StartupIndia #BachatRadar #ECommerce #Blinkit #Zepto #SwiggyInstamart #BigBasket #GrocerySavings #FinTech #IndiaTech #FounderStory`;

  const twitterText = `Tired of overpaying on grocery apps? Compare Blinkit, Zepto, Swiggy Instamart & BigBasket in 1 tap on BachatRadar! Save ₹2,000+ monthly. 100% Free: https://bachatradar.com/ by @GopaganiArun #QuickCommerce #BachatRadar`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyLinkedIn = () => {
    navigator.clipboard.writeText(linkedInPostText);
    setCopiedLinkedInText(true);
    setTimeout(() => setCopiedLinkedInText(false), 2000);
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsAppMessage);
    setCopiedWhatsAppText(true);
    setTimeout(() => setCopiedWhatsAppText(false), 2000);
  };

  const shareToLinkedIn = () => {
    handleCopyLinkedIn();
    const url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(siteUrl);
    window.open(url, '_blank');
  };

  const shareToWhatsApp = () => {
    const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(whatsAppMessage);
    window.open(url, '_blank');
  };

  const shareToTwitter = () => {
    const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(twitterText);
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(siteUrl);
    window.open(url, '_blank');
  };

  const shareToTelegram = () => {
    const url = 'https://t.me/share/url?url=' + encodeURIComponent(siteUrl) + '&text=' + encodeURIComponent('Save ₹1,500+ every month comparing Blinkit, Zepto, and Instamart!');
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-750 rounded-3xl p-6 text-white shadow-2xl space-y-6">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 shrink-0">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Publish & Telecast BachatRadar Freely
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Broadcast across LinkedIn, WhatsApp, Google Search, and all social platforms.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('share')}
              className={'pb-2.5 transition-all flex items-center gap-1.5 border-b-2 ' + (
                activeTab === 'share'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              )}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>1-Click Social Telecast</span>
            </button>
            <button
              onClick={() => setActiveTab('linkedin_kit')}
              className={'pb-2.5 transition-all flex items-center gap-1.5 border-b-2 ' + (
                activeTab === 'linkedin_kit'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founder LinkedIn Kit</span>
            </button>
            <button
              onClick={() => setActiveTab('google_seo')}
              className={'pb-2.5 transition-all flex items-center gap-1.5 border-b-2 ' + (
                activeTab === 'google_seo'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              )}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Google Search & SEO</span>
            </button>
          </div>

          {/* TAB 1: 1-CLICK SOCIAL TELECAST */}
          {activeTab === 'share' && (
            <div className="space-y-4">
              {/* Domain & URL Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Official Web Address:</div>
                    <div className="font-mono text-emerald-400 text-sm">{siteUrl}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied URL!' : 'Copy Live Link'}</span>
                </button>
              </div>

              {/* Social Telecast Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* LinkedIn */}
                <button
                  onClick={shareToLinkedIn}
                  className="p-3.5 rounded-2xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/40 text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0A66C2]">LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0A66C2] opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-semibold leading-tight">
                    Publish Founder Launch Announcement
                  </div>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={shareToWhatsApp}
                  className="p-3.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#25D366]">WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#25D366] opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-semibold leading-tight">
                    Share Viral Grocery Savings to Groups
                  </div>
                </button>

                {/* X / Twitter */}
                <button
                  onClick={shareToTwitter}
                  className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">X (Twitter)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-semibold leading-tight">
                    Tweet Quick-Commerce Arbitrage Demo
                  </div>
                </button>

                {/* Facebook */}
                <button
                  onClick={shareToFacebook}
                  className="p-3.5 rounded-2xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/40 text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1877F2]">Facebook</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#1877F2] opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-semibold leading-tight">
                    Post to Housing & Family Communities
                  </div>
                </button>

                {/* Telegram */}
                <button
                  onClick={shareToTelegram}
                  className="p-3.5 rounded-2xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/40 text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#229ED9]">Telegram</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#229ED9] opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-semibold leading-tight">
                    Broadcast to Grocery & Deals Channels
                  </div>
                </button>

                {/* Copy WhatsApp Blast Text */}
                <button
                  onClick={handleCopyWhatsApp}
                  className="p-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-400">Copy Blast</span>
                    <Copy className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-semibold leading-tight">
                    {copiedWhatsAppText ? 'Copied to Clipboard!' : 'Copy Formatted Viral Message'}
                  </div>
                </button>
              </div>

              {/* Free Platform Guarantee */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>100% Free Public Telecast:</strong> Public shoppers and families never pay any fees or subscriptions. All store pricing is aggregated transparently.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: FOUNDER LINKEDIN KIT */}
          {activeTab === 'linkedin_kit' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-300 font-bold">
                  Ready-to-Post LinkedIn Launch Story (Gopagani Arun):
                </div>
                <button
                  onClick={handleCopyLinkedIn}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  {copiedLinkedInText ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLinkedInText ? 'Copied Post!' : 'Copy Full Post'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {linkedInPostText}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={shareToLinkedIn}
                  className="flex-1 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open LinkedIn & Paste Announcement</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE SEARCH & SEO STATUS */}
          {activeTab === 'google_seo' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2.5 text-xs">
                <div className="font-extrabold text-white text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Google Search Indexing & Crawler Verification</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Structured JSON-LD Schema:</strong> Configured for <em>BachatRadar Technologies Pvt. Ltd.</em> and Founder & CEO <em>Gopagani Arun</em>.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">XML Sitemap Active:</strong> <code className="text-emerald-400">/sitemap.xml</code> with hourly indexing for Hyderabad, Bengaluru, Mumbai, Delhi NCR, and all categories.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Robots Exclusion Standard:</strong> <code className="text-emerald-400">/robots.txt</code> allows Googlebot, Bingbot, Twitterbot, and LinkedIn crawler.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Rich OpenGraph (OG) Snippets:</strong> Dynamic 1200x630 cards rendered on LinkedIn, WhatsApp, Facebook, and Twitter.
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Google Search Console Instructions */}
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 leading-relaxed">
                <strong>How to index on Google in 60 seconds:</strong>
                <ol className="list-decimal list-inside mt-1 space-y-1 text-slate-300 text-[11px]">
                  <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-300 underline font-bold">Google Search Console</a>.</li>
                  <li>Enter your domain <code>https://bachatradar.com</code> (or your deployment URL).</li>
                  <li>Click <strong>Sitemaps</strong> in the left sidebar and submit <code>sitemap.xml</code>.</li>
                  <li>Google will crawl and rank BachatRadar across Hyderabad, Bengaluru, Mumbai, and all covered areas!</li>
                </ol>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-slate-800 pt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div>
              100% Free Public Utility • <strong className="text-white">BachatRadar Technologies Pvt. Ltd.</strong>
            </div>
            <div className="text-emerald-400 font-semibold">
              Zero Fees • Transparent Multi-Store Arbitrage
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};