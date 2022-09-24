import { mockHttpEvent } from '@redwoodjs/testing/api'

export const missingMsgType = () =>
  mockHttpEvent({
    body: JSON.stringify({
      phoneNumber: '7132546843',
      eventId: '4',
      user: 'Ben',
      eventName: 'test event',
    }),
  })

export const missingPhoneNumber = () =>
  mockHttpEvent({
    body: JSON.stringify({
      msgType: 'event-response',
      eventId: '4',
      user: 'Ben',
      eventName: 'test event',
    }),
  })

export const missingEventId = () =>
  mockHttpEvent({
    body: JSON.stringify({
      msgType: 'event-response',
      phoneNumber: '7132546843',
      user: 'Ben',
      eventName: 'test event',
    }),
  })

export const missingUserAndEventName = () =>
  mockHttpEvent({
    body: JSON.stringify({
      msgType: 'event-response',
      phoneNumber: '7132546843',
      eventId: '4',
    }),
  })

export const standard = () =>
  mockHttpEvent({
    body: JSON.stringify({
      msgType: 'event-response',
      phoneNumber: '7132546843',
      eventId: '4',
      user: 'Ben',
      eventName: 'test event',
    }),
  })
