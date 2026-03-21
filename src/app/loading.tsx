export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 w-full">
      <div className="relative flex w-16 h-16 animate-spin items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent">
        <div className="h-14 w-14 rounded-full bg-background"></div>
      </div>
      <p className="text-muted-foreground font-medium animate-pulse text-lg">Loading...</p>
    </div>
  );
}
