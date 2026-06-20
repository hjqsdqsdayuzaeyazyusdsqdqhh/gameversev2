interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-lg", inner: "text-xs" },
    md: { icon: "w-9 h-9", text: "text-xl", inner: "text-sm" },
    lg: { icon: "w-12 h-12", text: "text-2xl", inner: "text-base" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.icon} relative flex-shrink-0`}>
        <div className={`w-full h-full rounded-xl brand-gradient flex items-center justify-center font-bold text-white ${s.inner} relative z-10 shadow-lg shadow-neon-blue/25`}>
          GV
        </div>
        <div className="absolute inset-0 rounded-xl bg-neon-blue/20 blur-xl animate-pulse-slow" />
      </div>
      {showText && (
        <div className="flex items-baseline">
          <span className={`${s.text} font-extrabold tracking-tight`}>
            <span className="text-gradient">Game</span>
            <span className="text-white">Verse</span>
          </span>
          <span className="ml-1.5 text-[8px] font-bold text-neon-blue/60 tracking-widest uppercase hidden sm:inline">.GG</span>
        </div>
      )}
    </div>
  );
}
