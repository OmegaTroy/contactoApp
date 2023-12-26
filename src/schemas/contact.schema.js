import {z} from 'zod'

export const contactSchema = z.object({
  name: z.string({
    required_error: 'name is required'
  }),
  number: z.string({
    required_error: 'number is required',
  })
})
