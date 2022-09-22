import moment from 'moment'

import SummaryTimeCell from './SummaryTimeCell'

const fakeUsers = [
  {
    id: '1',
    displayName: 'ben',
    phoneNumber: '7132546843',
  },
  {
    id: '2',
    displayName: 'kirby',
    phoneNumber: '7132546843',
  },
  {
    id: '3',
    displayName: 'zeus',
    phoneNumber: '7132546843',
  },
]

export default {
  title: 'Components/Calendars/Components/SummaryTimeCell',
  component: SummaryTimeCell,
  argTypes: {
    time: {
      table: {
        disable: true,
      },
    },
    isCollapsed: {
      table: {
        disable: true,
      },
    },
    availableUsers: {
      options: Object.keys(fakeUsers),
      mapping: fakeUsers,
      control: {
        type: 'multi-select',
        // labels: ['ben', 'kirby', 'zeus'],
      },
    },
  },
}

const Template = (args) => (
  <div className="grid h-screen place-items-center">
    {/* {JSON.stringify(args.availableUsers)} */}
    <SummaryTimeCell time={moment()} {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  availableUsers: [],
  totalNumRespondents: 0,
}
