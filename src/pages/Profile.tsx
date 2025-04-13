
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, BarChart3, UserCog, Bell, Shield, Languages, BookMarked } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sample user data
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "January 15, 2023",
  learningStreak: 7,
  totalHours: 87,
  completedQuizzes: 24,
  studiedSubjects: 5,
};

// Subject learning data
const subjectData = [
  { name: "Computer Science", hours: 32, percentage: 45 },
  { name: "Mathematics", hours: 18, percentage: 20 },
  { name: "Physics", hours: 15, percentage: 17 },
  { name: "Chemistry", hours: 12, percentage: 14 },
  { name: "Biology", hours: 10, percentage: 11 },
];

// Color codes for pie chart
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

// Weekly learning hours
const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 3.8 },
  { day: "Sun", hours: 2.1 },
];

// Recent achievements
const achievements = [
  { id: 1, title: "Learning Streak", description: "7 days in a row", date: "Today" },
  { id: 2, title: "Quiz Master", description: "Scored 90%+ on 5 quizzes", date: "Yesterday" },
  { id: 3, title: "Knowledge Explorer", description: "Studied 5 different subjects", date: "3 days ago" },
  { id: 4, title: "Dedicated Learner", description: "Reached 50 hours of learning", date: "1 week ago" },
];

const Profile = () => {
  return (
    <div className="container mx-auto max-w-6xl fade-in">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and view your learning statistics
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    AJ
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                <div className="flex mt-2 space-x-1">
                  <Badge variant="secondary" className="text-xs">Premium</Badge>
                  <Badge variant="outline" className="text-xs">Student</Badge>
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  <UserCog className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stats at a Glance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member Since</span>
                </div>
                <span className="text-sm font-medium">{userData.joinDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Learning Time</span>
                </div>
                <span className="text-sm font-medium">{userData.totalHours} hours</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BookMarked className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Subjects Studied</span>
                </div>
                <span className="text-sm font-medium">{userData.studiedSubjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Quizzes Completed</span>
                </div>
                <span className="text-sm font-medium">{userData.completedQuizzes}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notification Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Privacy Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Languages className="mr-2 h-4 w-4" />
                Language Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5 space-y-6">
          <Tabs defaultValue="statistics" className="space-y-4">
            <TabsList>
              <TabsTrigger value="statistics">Learning Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="statistics" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subject Distribution</CardTitle>
                    <CardDescription>
                      Time spent on each subject
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="percentage"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {subjectData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Learning Hours</CardTitle>
                    <CardDescription>
                      Your daily study time for the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} hours`, "Time Spent"]} />
                        <Bar dataKey="hours" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subject Breakdown</CardTitle>
                  <CardDescription>
                    Detailed view of your learning by subject
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectData.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-medium">{subject.name}</h4>
                          <span className="text-sm text-muted-foreground">{subject.hours} hours</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${subject.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Achievements</CardTitle>
                  <CardDescription>
                    Milestones and accomplishments in your learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {achievements.map((achievement, index) => (
                      <div key={achievement.id}>
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Trophy className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{achievement.title}</h4>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{achievement.date}</span>
                        </div>
                        {index < achievements.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Custom Trophy icon for achievements
const Trophy = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  );
};

export default Profile;
