import AuthenticatedUserMenu from './AuthenticatedUserMenu'

export default {
  title: 'Components/AuthenticatedUserMenu',
  component: AuthenticatedUserMenu,
  argTypes: {
    logOut: {
      table: {
        disable: true,
      },
    },
  },
}

const Template = (args) => (
  <div className="grid h-screen place-items-center">
    <div className="relative">
      <AuthenticatedUserMenu
        {...args}
        logOut={async () => console.log('log out')}
      />
    </div>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  displayName: 'Ben',
  phoneNumber: '7132546843',
}
