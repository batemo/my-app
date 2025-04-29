"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ProfileFormProps {
  profileId?: string; // If provided, form loads and edits this profile
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profileId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [urls, setUrls] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Convex hooks
  const createProfile = useMutation(api.profiles.createProfile);
  const updateProfile = useMutation(api.profiles.updateProfile);
  const deleteProfile = useMutation(api.profiles.deleteProfile);
  const profile = useQuery(api.profiles.getProfile, profileId ? { id: profileId } : "skip");

  // Load profile data if editing
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setEmail(profile.email || "");
      setBio(profile.bio || "");
      setUrls(profile.urls && profile.urls.length > 0 ? profile.urls : [""]);
    }
  }, [profile]);

  // Handlers
  const handleUrlChange = (idx: number, value: string) => {
    setUrls((prev) => prev.map((url, i) => (i === idx ? value : url)));
  };

  const handleAddUrl = () => {
    setUrls((prev) => [...prev, ""]);
  };

  const handleRemoveUrl = (idx: number) => {
    setUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const filteredUrls = urls.filter((url) => url.trim() !== "");
      if (profileId) {
        await updateProfile({
          id: profileId,
          username,
          email,
          bio,
          urls: filteredUrls,
        });
        setSuccess("Profile updated!");
      } else {
        await createProfile({
          username,
          email,
          bio,
          urls: filteredUrls,
        });
        setSuccess("Profile created!");
        setUsername("");
        setEmail("");
        setBio("");
        setUrls([""]);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!profileId) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await deleteProfile({ id: profileId });
      setSuccess("Profile deleted!");
      // Optionally, clear form or redirect
    } catch (err: any) {
      setError(err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Profile</h2>
        <p className="text-muted-foreground text-sm mb-4">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Username</label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <p className="text-xs text-muted-foreground">
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </p>
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <p className="text-xs text-muted-foreground">
          You can manage verified email addresses in your email settings.
        </p>
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Bio</label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="I own a computer."
        />
        <p className="text-xs text-muted-foreground">
          You can @mention other users and organizations to link to them.
        </p>
      </div>
      <div className="space-y-2">
        <label className="block font-medium">URLs</label>
        {urls.map((url, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input
              value={url}
              onChange={(e) => handleUrlChange(idx, e.target.value)}
              placeholder="https://yourwebsite.com"
            />
            {urls.length > 1 && (
              <Button type="button" variant="destructive" onClick={() => handleRemoveUrl(idx)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={handleAddUrl}>
          Add URL
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {profileId ? "Update profile" : "Create profile"}
        </Button>
        {profileId && (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
            Delete profile
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm; 