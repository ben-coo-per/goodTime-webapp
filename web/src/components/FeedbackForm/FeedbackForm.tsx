import {
  FieldError,
  Form,
  Label,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import Button from '../Button/Button'

const FeedbackForm = () => {
  function handleSendResponse(data) {
    console.log(data)
  }

  return (
    <div className="my-8 flex flex-col gap-6 rounded py-8 sm:px-20">
      <Form
        onSubmit={handleSendResponse}
        className="my-4 flex flex-col gap-2 rounded-xl bg-white p-8 shadow dark:bg-indigo-800"
      >
        <h2 className="mb-4 font-display text-xl lowercase">
          Tell us how we're doing
        </h2>
        <Label name="message" className="label">
          your message
        </Label>
        <TextAreaField
          name="message"
          className="input "
          errorClassName="input error"
          validation={{
            required: {
              value: true,
              message: 'a message is required',
            },
          }}
        />
        <FieldError name="message" className="field-error" />

        <Label name="email" className="label mt-8">
          email (optional)
        </Label>
        <TextField
          name="email"
          className="input "
          errorClassName="input error"
          validation={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
        />
        <FieldError name="email" className="field-error" />
        <Button type="submit" additionalClasses="mt-4">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default FeedbackForm
