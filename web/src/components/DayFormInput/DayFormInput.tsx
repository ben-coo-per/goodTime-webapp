import { TrashIcon } from '@heroicons/react/solid'
import { Day } from 'types/graphql'

import {
  DateField,
  FieldError,
  Label,
  TimeField,
  useFieldArray,
  useForm,
} from '@redwoodjs/forms'

import Button from '../Button/Button'

interface DayFormInputProps {
  day?: Day
}

const DayFormInput = ({ day }: DayFormInputProps) => {
  const formMethods = useForm({
    defaultValues: {
      times: [{ startTime: '', endTime: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'times',
  })

  return (
    <div className="w-full p-4 pt-2 border border-dark-gray rounded-lg">
      <div className="mb-4 ">
        <Label name="day" className="label" errorClassName="label error">
          Date
        </Label>
        <DateField
          name="day"
          className="input w-full"
          errorClassName="input error w-full"
          defaultValue={day ? day.date : null}
          validation={{ required: 'This field is required' }}
        />
        <FieldError name="day" className="field-error" />
      </div>
      <Label name="times" className="label" errorClassName="label error">
        Times
      </Label>
      <div className="w-full p-2 border border-dark-gray rounded-lg flex flex-col">
        {fields.map((field, index) => {
          const inputCols = index === 0 ? 'col-span-6 mb-4' : 'col-span-5 mb-4'
          return (
            <div key={field.id} className="grid grid-cols-12 gap-2 items-top">
              <div className="col-span-6 mb-4">
                <Label
                  name="startTime"
                  className="label"
                  errorClassName="label error"
                >
                  Start
                </Label>
                <TimeField
                  className="input w-full"
                  defaultValue={day ? day.times[index].startTime : ''}
                  errorClassName="input error w-full"
                  validation={{
                    required: 'This field is required',
                    validate: {
                      isLessThanEndTime: (value) => {
                        const endTime =
                          formMethods.getValues().times[index].endTime
                        if (value > endTime) {
                          return 'The start time must be before the end time'
                        }
                        return true
                      },
                    },
                  }}
                  {...formMethods.register(`times.${index}.startTime`)}
                />
                <FieldError
                  name={`times.${index}.startTime`}
                  className="field-error"
                />
              </div>
              <div className={inputCols}>
                <Label
                  name="endTime"
                  className="label"
                  errorClassName="label error"
                >
                  End
                </Label>
                <TimeField
                  defaultValue={day ? day.times[index].endTime : ''}
                  className="input w-full"
                  errorClassName="input error w-full"
                  validation={{
                    required: 'This field is required',
                    validate: {
                      isMoreThanStartTime: (value) => {
                        const startTime =
                          formMethods.getValues().times[index].startTime
                        if (value < startTime) {
                          return 'The end time must be after the start time'
                        }
                        return true
                      },
                    },
                  }}
                  {...formMethods.register(`times.${index}.endTime`)}
                />
                <FieldError
                  name={`times.${index}.endTime`}
                  className="field-error"
                />
              </div>
              {index !== 0 && (
                <div className="h-full flex items-center">
                  <Button
                    additionalClasses="mt-4 h-full w-full"
                    variant="icon"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon color="maroon" />
                  </Button>
                </div>
              )}
            </div>
          )
        })}
        <Button
          variant="link"
          additionalClasses="mb-4"
          type="button"
          onClick={() =>
            append({
              startTime: '',
              endTime: '',
            })
          }
        >
          Add Another Time
        </Button>
      </div>
    </div>
  )
}

export default DayFormInput
