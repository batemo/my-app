import { mutation, query } from "convex/server";
import { v } from "convex/values";

// Create a new profile
export const createProfile = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    bio: v.string(),
    urls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("profiles", args);
    return { id };
  },
});

// Get a profile by id
export const getProfile = query({
  args: { id: v.id("profiles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update a profile by id
export const updateProfile = mutation({
  args: {
    id: v.id("profiles"),
    username: v.string(),
    email: v.string(),
    bio: v.string(),
    urls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      username: args.username,
      email: args.email,
      bio: args.bio,
      urls: args.urls,
    });
    return { success: true };
  },
});

// Delete a profile by id
export const deleteProfile = mutation({
  args: { id: v.id("profiles") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
}); 