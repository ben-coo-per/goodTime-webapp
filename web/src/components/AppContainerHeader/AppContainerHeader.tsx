type AppContainerHeaderProps = {
  title: string
  showBackButton?: boolean
  additionalClasses?: string
}

const AppContainerHeader = ({
  title,
  showBackButton = false,
  additionalClasses,
}: AppContainerHeaderProps) => {
  function getClasses() {
    return 'w-full flex justify-center ' + additionalClasses
  }
  return (
    <div className={getClasses()}>
      {showBackButton && <span>back</span>}
      <h2 className="font-display text-3xl lowercase">{title}</h2>
    </div>
  )
}

export default AppContainerHeader
