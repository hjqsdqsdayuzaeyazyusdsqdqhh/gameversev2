"use client";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/games/${slug}` : `/games/${slug}`;
  const text = `Check out ${title} on GameVerse!`;

  const share = async (platform: string) => {
    switch (platform) {
      case "copy": {
        try {
          await navigator.clipboard.writeText(url);
          alert("Link copied!");
        } catch { /* ignore */ }
        break;
      }
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "reddit":
        window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, "_blank");
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Share:</span>
      <button onClick={() => share("copy")} className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors" title="Copy link">
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
      </button>
      <button onClick={() => share("twitter")} className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors" title="Share on Twitter">
        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </button>
      <button onClick={() => share("facebook")} className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors" title="Share on Facebook">
        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
      </button>
      <button onClick={() => share("reddit")} className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors" title="Share on Reddit">
        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0012 24 12 12 0 0012 0zM18.99 8.49c.68 0 1.23.55 1.23 1.23 0 .5-.3.93-.73 1.12.08.36.12.74.12 1.13 0 3.35-3.71 6.06-8.29 6.06s-8.29-2.71-8.29-6.06c0-.39.04-.77.12-1.13-.43-.19-.73-.62-.73-1.12 0-.68.55-1.23 1.23-1.23.34 0 .65.14.87.37 1.34-.97 3.2-1.59 5.25-1.66l1-4.63c.04-.17.19-.29.36-.29l3.26-.43c.15 0 .29.07.37.19.12.19.06.43-.13.55-.19.12-.43.06-.55-.13l-2.96.39-.9 4.17c2.01.08 3.82.69 5.13 1.64.22-.22.53-.36.87-.36zM8.93 12.97c-.68 0-1.23.55-1.23 1.23 0 .68.55 1.23 1.23 1.23s1.23-.55 1.23-1.23c0-.68-.55-1.23-1.23-1.23zm6.51.14c-.48-.48-1.26-.48-1.74 0-.48.48-.48 1.26 0 1.74.48.48 1.26.48 1.74 0 .48-.48.48-1.26 0-1.74zm-.25 3.04c-.94.73-2.74.84-3.37.84-.63 0-2.43-.11-3.37-.84-.18-.14-.27-.37-.17-.58.1-.21.33-.31.54-.21 0 0 1.2.86 3 .86s3-.86 3-.86c.21-.1.44 0 .54.21.1.21.01.44-.17.58z" /></svg>
      </button>
    </div>
  );
}
