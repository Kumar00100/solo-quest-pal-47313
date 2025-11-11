import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ListTodo, Plus, Trophy, Clock, Repeat } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
  time?: string;
  recurrence?: string;
}

export function TasksSlideOver() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Morning workout', completed: false, xp: 50, time: '07:00', recurrence: 'daily' },
    { id: '2', title: 'Read for 30 minutes', completed: true, xp: 30, time: '20:00' },
    { id: '3', title: 'Learn programming', completed: false, xp: 100, time: '14:00' },
  ]);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        xp: 25,
      }]);
      setNewTask('');
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalXP = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.xp, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-primary hover:shadow-glow-lg shadow-glow z-50">
          <ListTodo className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-primary/20">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Your Tasks
          </SheetTitle>
        </SheetHeader>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="bg-card border border-primary/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Trophy className="w-4 h-4" />
              Completed
            </div>
            <div className="text-2xl font-bold text-primary">{completedCount}/{tasks.length}</div>
          </div>
          <div className="bg-card border border-primary/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Trophy className="w-4 h-4 text-secondary" />
              XP Earned
            </div>
            <div className="text-2xl font-bold text-secondary">{totalXP}</div>
          </div>
        </div>

        {/* Add new task */}
        <div className="space-y-2 mb-6">
          <Label>Add New Task</Label>
          <div className="flex gap-2">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="What do you want to accomplish?"
              className="bg-input border-primary/20"
            />
            <Button onClick={addTask} size="icon" className="bg-gradient-primary">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Task list */}
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`
                  p-4 rounded-2xl border transition-all
                  ${task.completed 
                    ? 'bg-primary/5 border-primary/30' 
                    : 'bg-card border-primary/20 hover:border-primary/40'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      {task.time && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </div>
                      )}
                      {task.recurrence && (
                        <div className="flex items-center gap-1">
                          <Repeat className="w-3 h-3" />
                          {task.recurrence}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-secondary">
                        <Trophy className="w-3 h-3" />
                        {task.xp} XP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
