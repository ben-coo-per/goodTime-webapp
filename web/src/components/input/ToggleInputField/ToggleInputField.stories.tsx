import { Form } from '@redwoodjs/forms'

import ToggleInputField from './ToggleInputField'

export default {
  title: 'Components/Inputs/ToggleInputField',
  component: ToggleInputField,
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
  },
}

const Template = (args) => (
  <Form className="grid h-screen place-items-center">
    <div>
      <ToggleInputField {...args} />
    </div>
  </Form>
)

export const v1 = Template.bind({})
v1.args = {
  label: 'toggle me',
  name: 'test',
}
