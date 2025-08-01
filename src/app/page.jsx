"use client";

import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Users, ArrowRight } from "lucide-react";

export default function Home() {
  const { role, switchRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to appropriate dashboard after a short delay
    const timer = setTimeout(() => {
      if (role === "recruiter") {
        router.push("/recruiter/dashboard");
      } else {
        router.push("/seeker/profile");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [role, router]);

  const handleRoleSelect = (selectedRole) => {
    switchRole(selectedRole);
    if (selectedRole === "recruiter") {
      router.push("/recruiter/dashboard");
    } else {
      router.push("/seeker/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ChakriKhujo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-Powered Recruitment & Career Guidance Platform
          </p>
          <p className="text-lg text-muted-foreground">
            Connecting talent with opportunities through intelligent matching
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" onClick={() => handleRoleSelect("recruiter")}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCog className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>For Recruiters</CardTitle>
              <CardDescription>
                Find the best talent with AI-powered candidate matching and streamlined hiring workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Enter Recruiter Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" onClick={() => handleRoleSelect("seeker")}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle>For Job Seekers</CardTitle>
              <CardDescription>
                Discover opportunities, get career guidance, and land your dream job with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Enter Job Seeker Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground">
          Currently viewing as: <span className="font-medium capitalize">{role}</span> • 
          Auto-redirecting in 2 seconds...
        </p>
      </div>
    </div>
  );
}
