import { handler } from './sendTwilioSms'
import {
  missingEventId,
  missingMsgType,
  missingPhoneNumber,
  updateMissingUserAndEventName,
  standard,
} from './sendTwilioSms.scenarios'

describe('sendTwilioSms function', () => {
  it('Should respond with 200 and include data when user & event name are provided', async () => {
    const response = await handler(standard(), null)
    const { data } = JSON.parse(response.body)
    const { eventId, user, eventName } = JSON.parse(standard().body)

    expect(response.statusCode).toBe(200)
    expect(data.sent).toBe(true)
    expect(data.message).toContain(eventId)
    expect(data.message).toContain(user)
    expect(data.message).toContain(eventName)
  })

  it("Should respond with 200 without user and event name when they aren't provided", async () => {
    const response = await handler(updateMissingUserAndEventName(), null)
    const { data } = JSON.parse(response.body)
    const { eventId } = JSON.parse(updateMissingUserAndEventName().body)

    expect(response.statusCode).toBe(200)
    expect(data.sent).toBe(true)
    expect(data.message).toContain(eventId)
    expect(data.message).toContain('someone')
    expect(data.message).toContain('your event')
    expect(data.message).toContain('changed their response')
  })

  it("Should respond with 400 when a message type isn't provided", async () => {
    const response = await handler(missingMsgType(), null)

    expect(response.statusCode).toBe(400)
  })

  it("Should respond with 400 when an event id isn't provided", async () => {
    const response = await handler(missingEventId(), null)

    expect(response.statusCode).toBe(400)
  })

  it("Should respond with 400 when a phone number isn't provided", async () => {
    const response = await handler(missingPhoneNumber(), null)

    expect(response.statusCode).toBe(400)
  })
})
