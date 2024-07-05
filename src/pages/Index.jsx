import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({ id: "", title: "", description: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddTask = () => {
    setTasks([...tasks, { ...currentTask, id: uuidv4() }]);
    setCurrentTask({ id: "", title: "", description: "" });
  };

  const handleEditTask = () => {
    setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    setCurrentTask({ id: "", title: "", description: "" });
    setIsEditMode(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todo Application</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setIsEditMode(false)}>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Task" : "Add Task"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={currentTask.title}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={currentTask.description}
                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCurrentTask({ id: "", title: "", description: "" })}>
                  Cancel
                </Button>
                <Button onClick={isEditMode ? handleEditTask : handleAddTask}>
                  {isEditMode ? "Save" : "Add"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentTask(task);
                  setIsEditMode(true);
                }}
              >
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;