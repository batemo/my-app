import * as React from "react";
import { Menu } from "../components/Menu";
import { ProfileForm } from "../components/ProfileForm";

const options = [
  "Profile",
  "Account",
  "Appearance",
  "Notifications",
  "Display",
];

export default function ProfilePage() {
  const [active, setActive] = React.useState<string>("Profile");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-50 p-6 border-r">
        <Menu active={active} onSelect={setActive} />
      </aside>
      <main className="flex-1 flex justify-center items-start p-10">
        <Menu active={active} onSelect={setActive} />
        <ProfileForm />
      </main>
    </div>
  );
} 