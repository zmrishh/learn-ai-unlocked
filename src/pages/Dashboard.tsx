
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, Clock, FileText, Trophy } from "lucide-react";

// Sample data for charts
const subjectData = [
  { name: "Computer Science", hours: 12, quizScore: 85 },
  { name: "Mathematics", hours: 8, quizScore: 72 },
  { name: "Physics", hours: 5, quizScore: 90 },
  { name: "Chemistry", hours: 3, quizScore: 65 },
];

// Recent activity data
const recentActivity = [
  { id: 1, type: "quiz", subject: "Computer Science", score: "85%", date: "2 hours ago" },
  { id: 2, type: "notes", subject: "Mathematics", date: "Yesterday" },
  { id: 3, type: "chat", subject: "Physics Textbook", date: "2 days ago" },
  { id: 4, type: "flashcards", subject: "Chemistry", date: "3 days ago" },
];

const Dashboard = () => {
  const totalHours = subjectData.reduce((sum, subject) => sum + subject.hours, 0);
  const avgScore = Math.round(
    subjectData.reduce((sum, subject) => sum + subject.quizScore, 0) / subjectData.length
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <Trophy className="h-4 w-4 text-primary" />;
      case "notes":
        return <FileText className="h-4 w-4 text-primary" />;
      case "chat":
        return <BookOpen className="h-4 w-4 text-primary" />;
      case "flashcards":
        return <Clock className="h-4 w-4 text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6 p-1 md:p-4 fade-in">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your learning progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours} hours</div>
            <p className="text-xs text-muted-foreground">
              +2 hours from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <Progress value={avgScore} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjectData.length}</div>
            <p className="text-xs text-muted-foreground">
              Across various disciplines
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up!
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hours" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hours">Learning Hours</TabsTrigger>
          <TabsTrigger value="scores">Quiz Scores</TabsTrigger>
        </TabsList>
        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hours by Subject</CardTitle>
              <CardDescription>
                Your learning time distribution across subjects
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" name="Hours Spent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance</CardTitle>
              <CardDescription>
                Your average quiz scores by subject
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quizScore" fill="#82ca9d" name="Quiz Score (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="rounded-full bg-secondary p-2">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    {activity.score && ` • Score: ${activity.score}`}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
