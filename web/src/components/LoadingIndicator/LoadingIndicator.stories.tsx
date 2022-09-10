import LoadingIndicator from './LoadingIndicator'

export const generated = (args) => {
  return (
    <div className="grid h-screen place-items-center">
      <LoadingIndicator {...args} />
    </div>
  )
}

export default { title: 'Components/LoadingIndicator' }
