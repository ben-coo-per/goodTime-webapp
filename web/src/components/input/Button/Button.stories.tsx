import Button from './Button'

export default {
  title: 'Components/Inputs/Button',
  component: Button,
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
}

const Template = (args) => (
  <div className="grid h-screen place-items-center">
    <Button {...args} />
  </div>
)

export const textOnly = Template.bind({})
textOnly.args = {
  children: 'button',
  color: 'primary',
  variant: 'default',
  disabled: false,
  size: 'md',
}
