import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UserPlus, 
  TrendingUp, 
  Flag, 
  MessageSquare, 
  FileUp, 
  Users, 
  Calendar, 
  Mail,
  Database 
} from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      title: "Smart Lead Capture",
      description: "Our AI-powered form identifies high-potential candidates instantly. No more guessing - know exactly who's ready to become your next sales superstar.",
      icon: UserPlus,
      imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      imageAlt: "Team meeting discussing leads"
    },
    {
      title: "Visual Pipeline Management",
      description: "Watch your recruitment funnel come to life with our intuitive pipeline visualization. Track movement, identify bottlenecks, and optimize your hiring process in real-time.",
      icon: TrendingUp,
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      imageAlt: "Business analytics dashboard"
    },
    {
      title: "Intelligent Status Tracking",
      description: "Never lose track of a promising candidate again. Our smart status tracking system keeps you informed of every candidate's progress, ensuring no opportunity slips through the cracks.",
      icon: Flag,
      imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      imageAlt: "Person tracking progress on computer"
    },
    {
      title: "Seamless Communication Hub",
      description: "Keep all your candidate conversations in one place. From initial contact to final offer, every interaction is logged and easily accessible when you need it.",
      icon: MessageSquare,
      imageSrc: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      imageAlt: "People having a business discussion"
    },
    {
      title: "Document Management",
      description: "Say goodbye to scattered files. Our centralized document hub keeps resumes, assessments, and onboarding paperwork organized and instantly accessible.",
      icon: FileUp,
      imageSrc: "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
      imageAlt: "Organized desktop workspace"
    },
    {
      title: "Task Assignment & Tracking",
      description: "Delegate with confidence. Assign tasks to your team, set deadlines, and track progress - all while maintaining clear accountability and communication.",
      icon: Users,
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      imageAlt: "Team collaboration meeting"
    },
    {
      title: "Smart Follow-up Scheduling",
      description: "Never miss a follow-up again. Our intelligent scheduling system reminds you when to reach out, helping you maintain momentum with promising candidates.",
      icon: Calendar,
      imageSrc: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
      imageAlt: "Calendar and planning tools"
    },
    {
      title: "Integrated Email System",
      description: "Streamline your communication with our powerful email integration. Send personalized messages, track responses, and maintain professional relationships effortlessly.",
      icon: Mail,
      imageSrc: "https://images.unsplash.com/photo-1557200134-90327ee9fafa",
      imageAlt: "Person working on laptop with emails"
    },
    {
      title: "Data Analytics Dashboard",
      description: "Make data-driven decisions with our comprehensive analytics dashboard. Track key metrics, identify trends, and optimize your recruitment process with real-time insights.",
      icon: Database,
      imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      imageAlt: "Person using MacBook Pro with analytics"
    },
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
          Features That Make The Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-lift overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.imageSrc}
                  alt={feature.imageAlt}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <feature.icon className="absolute bottom-4 right-4 h-8 w-8 text-cream" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};