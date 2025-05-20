"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { SparklesCore } from "@/components/ui/sparkles";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [topic, setTopic] = useState("");
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [savedTasks, setSavedTasks] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  const fetchSavedTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/get`);
      const data = await response.json();
      setSavedTasks(data);
      setProgress(
        Math.floor(
          (data.filter((task: any) => task.completed).length / data.length) * 100
        ) || 0
      );
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchSavedTasks();
  }, []);

  const generateTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({topic})
      });
      const data = await response.json();
      setGeneratedTasks(data.tasks);
    } catch (error) {
      console.error("Error generating tasks", error);
    }
  };

  const saveTask = async (task: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: task })
      });
      if (response.ok) {
        fetchSavedTasks();
      }
    } catch (error) {
      console.error("Error saving task", error);
    }
  };
  useEffect(() => {

    const completedCount = savedTasks.filter((task) => task.completed).length;

    const totalCount = savedTasks.length;

    setProgress(totalCount === 0 ? 0 : Math.floor((completedCount / totalCount) * 100));

  }, [savedTasks]);

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SparklesCore
          background="black"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="white"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Task Generator Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic (e.g., Learn Python)"
                className="w-full md:w-2/3"
              />
              <Button onClick={generateTasks} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md shadow-lg transition duration-300">
                ✨ Generate
              </Button>
            </div>

            {generatedTasks.length > 0 && (
              <ScrollArea className="h-60 w-full rounded-md border p-3 bg-gray-900 text-white">
                <div className="space-y-3">
                  {generatedTasks.map((task, idx) => (
                    <Card key={idx} className="bg-gray-800 border border-gray-700">
                      <CardContent className="p-4 flex justify-between items-center">
                        <span>{task}</span>
                        <Button variant="outline" className="border border-purple-500 text-purple-400 hover:bg-purple-900" onClick={() => saveTask(task)}>
                          💾 Save
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Your Tasks</CardTitle>
            <div className="relative h-4 w-full bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm text-white font-medium">
                {progress}%
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedTasks.map((task: any) => (
                <Card key={task.id} className="bg-gray-700 border border-gray-600">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={async () => {
                          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task.id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ completed: !task.completed })
                          });
                          fetchSavedTasks();
                        }}
                      />
                      <span className={cn("text-white", task.completed && "line-through text-gray-400")}>{task.content}</span>
                    </div>
                    <Button
                      variant="destructive"
                      className="text-white hover:bg-red-600"
                      onClick={async () => {
                        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${task.id}`, {
                          method: "DELETE"
                        });
                        fetchSavedTasks();
                      }}
                    >
                      🗑 Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
