import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { AuthModal } from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { Zap, Target, TrendingUp, Award } from 'lucide-react';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-glow blur-3xl opacity-30 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="inline-block">
              <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary mb-6">
                Level Up Your Life
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent text-glow">
                SoloLevel
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your AI-powered personal assistant that transforms daily tasks into an epic journey. 
              Gain XP, level up, and conquer your goals with intelligent guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow-lg text-lg px-8 py-6 rounded-2xl group transition-all"
                onClick={() => setAuthModalOpen(true)}
              >
                Let's go
                <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-2xl border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: 'Smart Task Planning',
              description: 'AI suggests and organizes your daily routines based on your goals',
              gradient: 'from-blue-500 to-cyan-500',
            },
            {
              icon: TrendingUp,
              title: 'Level & XP System',
              description: 'Complete tasks to earn XP and level up your skills',
              gradient: 'from-purple-500 to-pink-500',
            },
            {
              icon: Award,
              title: 'Achievements',
              description: 'Unlock rewards and track your progress over time',
              gradient: 'from-orange-500 to-yellow-500',
            },
            {
              icon: Zap,
              title: 'AI Assistant',
              description: 'Get personalized suggestions and motivational support',
              gradient: 'from-green-500 to-emerald-500',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card border border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-glow"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-card border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow blur-3xl opacity-20" />
          <div className="relative grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                1M+
              </div>
              <div className="text-muted-foreground">Tasks Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to start your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              leveling journey?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who are already transforming their daily routines into achievements
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow-lg text-lg px-8 py-6 rounded-2xl mt-6"
            onClick={() => setAuthModalOpen(true)}
          >
            Get Started Now
          </Button>
        </div>
      </div>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        mode="signup"
      />
    </div>
  );
};

export default Index;
