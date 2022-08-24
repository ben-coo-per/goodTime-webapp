import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Button from 'src/components/Button/Button'

const AboutPage = () => {
  return (
    <>
      <MetaTags
        title="About"
        description="goodtime is the quickest way to find the meeting time that works"
      />

      <div className="flex h-full flex-col gap-6 rounded py-8 sm:px-20">
        <h1 className="font-display text-3xl lowercase">About goodtime</h1>
        <p className="lowercase leading-relaxed">
          Goodtime is the quickest way to find the meeting time that works
        </p>
        <p className="lowercase leading-relaxed">
          I built the website because I was tired of texting multiple people
          individually to find out what times they were available to meet
        </p>
        <p className="lowercase leading-relaxed">
          Of course there are wonderful products out there like Calendly, but
          that felt too formal and heavy-duty for the types of plans I'm making
          on a daily basis
        </p>
        <p className="lowercase leading-relaxed">
          This is still very much a work in progress and I would love any
          feedback you can provide
        </p>
      </div>
    </>
  )
}

export default AboutPage
