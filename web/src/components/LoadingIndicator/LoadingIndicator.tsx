const LoadingIndicator = () => {
  return (
    <div className="flex flex-row gap-2">
      <img
        src="/flowerIcon.svg"
        className="mr-2 animate-bounce"
        alt="flower icon"
      />
      <p className="animate-text-wiggle font-display text-2xl lowercase">l</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">o</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">a</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">d</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">i</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">n</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">g</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">.</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">.</p>
      <p className="animate-text-wiggle font-display text-2xl lowercase">.</p>
    </div>
  )
}

export default LoadingIndicator
