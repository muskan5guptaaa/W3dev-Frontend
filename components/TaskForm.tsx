import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TaskForm({ onGenerate }: { onGenerate: (topic: string) => void }) {
  const [topic, setTopic] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate(topic);
        setTopic("");
      }}
      className="flex gap-2"
    >
      <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic" />
      <Button type="submit">Generate</Button>
    </form>
  );
}
