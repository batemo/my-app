import { defineSchema, defineTable } from 'convex/schema';

export default defineSchema({
  profiles: defineTable({
    username: 'string',
    email: 'string',
    bio: 'string',
    urls: 'array', // array of strings
  }),
}); 