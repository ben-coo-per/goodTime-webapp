import mixpanel from 'mixpanel-browser'
mixpanel.init(process.env.MIXPANEL_TOKEN)

const env_check = process.env.NODE_ENV === 'production'

const actions = {
  identify: (id: number | string) => {
    if (env_check) mixpanel.identify(id)
  },
  alias: (id: number | string) => {
    if (env_check) mixpanel.alias(id)
  },
  track: (name: string, props?: object) => {
    if (env_check) mixpanel.track(name, props)
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props)
    },
  },
}

export const Mixpanel = actions
