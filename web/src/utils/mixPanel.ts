import mixpanel from 'mixpanel-browser'
mixpanel.init('039f9b0f12e14f9a8bd1521d879771ce', {
  debug: true,
  ignore_dnt: true,
  opt_out_tracking_by_default: false,
})

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
  opt_out_tracking: (options?: object) => {
    if (env_check) mixpanel.opt_out_tracking(options)
  },
  opt_in_tracking: (options?: object) => {
    if (env_check) mixpanel.opt_in_tracking(options)
  },
  get_tracking_state: (): boolean => {
    if (env_check) return mixpanel.has_opted_in_tracking()
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props)
    },
  },
}

export const Mixpanel = actions
