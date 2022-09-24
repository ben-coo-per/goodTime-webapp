import type { APIGatewayEvent } from 'aws-lambda'

import { useRequireAuth } from '@redwoodjs/graphql-server'

import { getCurrentUser } from 'src/lib/auth'
import { logger } from 'src/lib/logger'

const twilio = require('twilio')

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

type RequestBody = {
  msgType: 'event-response' | 'event-response-update' | 'event-update' | string
  phoneNumber: string
  eventId: number
  user?: string
  eventName?: string
}

export const sendSMS = async (event: APIGatewayEvent) => {
  logger.info('Invoked the twilioSendSMS function')

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

  // eslint-disable-next-line new-cap
  const client = new twilio(accountSid, authToken)

  try {
    // get the message and recipient's phone number from the query string
    const { msgType, phoneNumber, eventId, user, eventName } = JSON.parse(
      event.body
    ) as RequestBody

    if (!msgType || !phoneNumber || !eventId) {
      throw Error('Please provide a phone number, message type, and event id')
    }

    const formattedMessage = `

${getMessageContent(msgType, user, eventName)}
www.goodtime.to/respond/${eventId}
    `
    // validate the phone number
    const validatedPhoneNumber = validatePhoneNumber(phoneNumber)

    await client.messages
      .create({
        body: formattedMessage,
        to: validatedPhoneNumber, // Text this number
        from: twilioPhoneNumber, // From a valid Twilio number
      })
      .then(() => logger.info('Sent sms message.'))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          sent: true,
          message: formattedMessage,
        },
      }),
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 400,
      body: {
        message: error.message,
      },
    }
  }
}

export const handler = useRequireAuth({
  handlerFn: sendSMS,
  getCurrentUser,
})

function validatePhoneNumber(phoneNumber: string) {
  logger.info('Validating provided phone number...')

  const pattern = /^[0-9]{10}$/i // 10 digit number

  if (pattern.test(phoneNumber)) {
    return phoneNumber
  } else {
    throw Error('Please provide a valid phone number')
  }
}

function getMessageContent(
  msgType: 'event-response' | 'event-response-update' | 'event-update' | string,
  user?: string,
  eventName?: string
) {
  if (msgType == 'event-response') {
    return `${
      user ? userPhoneNumberFormatting(user) : 'someone'
    } has responded to ${eventName ? eventName : 'your event'}.`
  } else if (msgType == 'event-response-update') {
    return `${
      user ? userPhoneNumberFormatting(user) : 'someone'
    } has changed their response to ${eventName ? eventName : 'your event'}.`
  } else if (msgType == 'event-update') {
    // not currently used, but keeping jic I want it in the future.
    return `${
      user ? userPhoneNumberFormatting(user) : 'the event creator'
    } has updated the possible times for ${
      eventName ? eventName : "an event you've responsed to"
    }.`
  } else {
    throw Error('Please provide a valid message type')
  }
}

function userPhoneNumberFormatting(str: string) {
  //Filter only numbers from the input
  const cleaned = ('' + str).replace(/\D/g, '')

  //Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

  // If the user is a phone number, not a display name, format it
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }

  // otherwise, just return the display name
  return str
}
