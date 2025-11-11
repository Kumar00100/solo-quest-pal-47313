import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Target, Zap } from 'lucide-react';

interface DashboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DashboardModal({ open, onOpenChange }: DashboardModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/20 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="day" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/50">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card/50 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                  <Target className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">+0% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">XP Gained</CardTitle>
                  <Zap className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">+0% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                  <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0h</div>
                  <p className="text-xs text-muted-foreground">Across all tasks</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productivity</CardTitle>
                  <TrendingUp className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground">Task completion rate</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 border-primary/20">
              <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
                <CardDescription>Your progress throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  No activity data yet. Start completing tasks!
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-4 pt-4">
            <div className="text-center py-8 text-muted-foreground">
              Weekly stats coming soon
            </div>
          </TabsContent>

          <TabsContent value="month" className="space-y-4 pt-4">
            <div className="text-center py-8 text-muted-foreground">
              Monthly stats coming soon
            </div>
          </TabsContent>

          <TabsContent value="year" className="space-y-4 pt-4">
            <div className="text-center py-8 text-muted-foreground">
              Yearly stats coming soon
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
