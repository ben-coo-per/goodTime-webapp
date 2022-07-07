import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Link to={routes.createEvent()}>
        <Button color="maroon" size="lg">
          Find a Time
        </Button>
      </Link>
    </>
  )
}

export default HomePage
