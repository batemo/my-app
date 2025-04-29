import * as React from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";

export function ProfileForm() {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Profile updated!\n" + JSON.stringify(form, null, 2));
  };

  return (
    <form className="max-w-lg w-full" onSubmit={handleSubmit}>
      <InputField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Enter your username"
        required
      />
      <InputField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Enter your email"
        required
      />
      <InputField
        label="Bio"
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Tell us about yourself"
      />
      <Button type="submit" className="mt-4">Update profile</Button>
    </form>
  );
} 