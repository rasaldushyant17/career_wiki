const CareerLogo = () => {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
      <div className="relative h-12 w-12">
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-12 w-12 drop-shadow-[0_0_10px_hsl(185_100%_50%_/_0.35)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="blue-static" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41b8ff" />
              <stop offset="100%" stopColor="#0f4cb8" />
            </linearGradient>
            <linearGradient id="gold-static" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6d26b" />
              <stop offset="100%" stopColor="#b8771f" />
            </linearGradient>
          </defs>

          <path d="M33 45 C33 35, 44 30, 52 34 L60 38 L60 79 L50 73 C41 69, 33 62, 33 52 Z" fill="url(#blue-static)" />
          <path d="M87 45 C87 35, 76 30, 68 34 L60 38 L60 79 L70 73 C79 69, 87 62, 87 52 Z" fill="url(#blue-static)" />

          <circle cx="60" cy="60" r="10.5" fill="url(#gold-static)" opacity="0.2" />
          <g transform="translate(60 60)">
            <g fill="none" stroke="url(#gold-static)" strokeWidth="2.1" strokeLinecap="round" opacity="0.95">
              <rect x="-3.2" y="-9.4" width="6.4" height="11.2" rx="3.2" />
              <rect x="-3.2" y="-9.4" width="6.4" height="11.2" rx="3.2" transform="rotate(60)" />
              <rect x="-3.2" y="-9.4" width="6.4" height="11.2" rx="3.2" transform="rotate(120)" />
              <rect x="-3.2" y="-9.4" width="6.4" height="11.2" rx="3.2" transform="rotate(180)" />
              <rect x="-3.2" y="-9.4" width="6.4" height="11.2" rx="3.2" transform="rotate(240)" />
              <rect x="-3.2" y="-9.4" width="6.4" height="11.2" rx="3.2" transform="rotate(300)" />
            </g>
            <circle r="1.9" fill="url(#gold-static)" />
          </g>
        </svg>

        <div
          className="absolute inset-0"
          style={{
            animation: "cw-logo-spin 10s linear infinite",
            transformOrigin: "50% 50%",
            willChange: "transform",
          }}
        >
        <svg
          viewBox="0 0 120 120"
          className="h-12 w-12"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gold-rotate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6d26b" />
              <stop offset="100%" stopColor="#b8771f" />
            </linearGradient>
          </defs>

          <circle cx="60" cy="60" r="38" fill="none" stroke="url(#gold-rotate)" strokeWidth="4" />
          <path d="M60 6 L67 36 L60 30 L53 36 Z" fill="url(#gold-rotate)" />
          <path d="M114 60 L84 67 L90 60 L84 53 Z" fill="url(#gold-rotate)" />
          <path d="M60 114 L53 84 L60 90 L67 84 Z" fill="url(#gold-rotate)" />
          <path d="M6 60 L36 53 L30 60 L36 67 Z" fill="url(#gold-rotate)" />

          <path d="M60 23 L66 53 L60 50 L54 53 Z" fill="url(#gold-rotate)" />
          <path d="M97 60 L67 66 L70 60 L67 54 Z" fill="url(#gold-rotate)" />
          <path d="M60 97 L54 67 L60 70 L66 67 Z" fill="url(#gold-rotate)" />
          <path d="M23 60 L53 54 L50 60 L53 66 Z" fill="url(#gold-rotate)" />
        </svg>
        </div>
      </div>

      <style>{`
        @keyframes cw-logo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CareerLogo;
