import {
  FieldError,
  Form,
  Label,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import Button from '../Button/Button'

const CREATE_FEEDBACK_SUBMISSION_MUTATION = gql`
  mutation createFeedbackSubmission($input: CreateFeedbackSubmissionInput!) {
    createFeedbackSubmission(input: $input) {
      id
    }
  }
`

const FeedbackForm = () => {
  const formMethods = useForm()
  const [createFeebackSubmission, { loading }] = useMutation(
    CREATE_FEEDBACK_SUBMISSION_MUTATION,
    {
      onCompleted: (event) => {
        toast.success(
          `Your feedback was submitted!

          Seriously, thank you for taking the time. Your feedback will help shape the app moving forward`,
          {
            duration: 8000,
            icon: '🤗',
          }
        )
        formMethods.reset()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  function handleSendResponse(data) {
    createFeebackSubmission({ variables: { input: data } })
  }

  return (
    <div className="my-8 flex flex-col gap-6 rounded py-8 sm:px-20">
      <Form
        onSubmit={handleSendResponse}
        formMethods={formMethods}
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
        <Button type="submit" additionalClasses="mt-4" disabled={loading}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default FeedbackForm
