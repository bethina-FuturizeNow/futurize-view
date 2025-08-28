import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ArrowRight, Lightbulb, Target, Users, BarChart3 } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);

  const handleLogin = (email: string, password: string, role: string) => {
    // Simulação de login
    setCurrentUser({ name: email.split('@')[0], role });
    setIsLoggedIn(true);
  };

  if (isLoggedIn && currentUser) {
    return <Dashboard user={currentUser} onLogout={() => {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Futurize Now
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transforme suas ideias em realidade com nossa plataforma de gestão de projetos e inovação
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-primary hover:shadow-primary transition-all duration-300">
                  Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <LoginModal onLogin={handleLogin} />
            </Dialog>
            
            <Button variant="outline" size="lg">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Funcionalidades Poderosas</h2>
            <p className="text-xl text-muted-foreground">Tudo que você precisa para gerenciar projetos inovadores</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Lightbulb className="h-8 w-8 text-primary" />}
              title="Gestão de Ideias"
              description="Capture e organize suas ideias mais inovadoras"
            />
            <FeatureCard
              icon={<Target className="h-8 w-8 text-accent" />}
              title="Controle de Projetos"
              description="Acompanhe o progresso de todos os seus projetos"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Feedback de Clientes"
              description="Colete e gerencie feedbacks dos seus clientes"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-accent" />}
              title="Analytics"
              description="Visualize métricas e progresso em tempo real"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-lg bg-card border shadow-card hover:shadow-primary transition-all duration-300">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const LoginModal = ({ onLogin }: { onLogin: (email: string, password: string, role: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("colaborador");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Login - Futurize Now</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Função</Label>
          <Tabs value={role} onValueChange={setRole}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="colaborador">Colaborador</TabsTrigger>
              <TabsTrigger value="observador">Observador</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button type="submit" className="w-full bg-gradient-primary">
          Entrar
        </Button>
      </form>
    </DialogContent>
  );
};

const Dashboard = ({ user, onLogout }: { user: { name: string; role: string }; onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={onLogout} />
      
      <div className="flex">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} userRole={user.role} />
        
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "projects" && <ProjectsPage userRole={user.role} />}
          {activeTab === "ideas" && <IdeasPage userRole={user.role} />}
          {activeTab === "feedback" && <FeedbackPage userRole={user.role} />}
        </main>
      </div>
    </div>
  );
};

const DashboardHeader = ({ user, onLogout }: { user: { name: string; role: string }; onLogout: () => void }) => (
  <header className="border-b bg-card/50 backdrop-blur-sm">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Futurize Now
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          Sair
        </Button>
      </div>
    </div>
  </header>
);

const DashboardSidebar = ({ activeTab, onTabChange, userRole }: { activeTab: string; onTabChange: (tab: string) => void; userRole: string }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, roles: ["admin", "colaborador", "observador"] },
    { id: "projects", label: "Projetos", icon: Target, roles: ["admin", "colaborador", "observador"] },
    { id: "ideas", label: "Ideias", icon: Lightbulb, roles: ["admin", "colaborador"] },
    { id: "feedback", label: "Feedback", icon: Users, roles: ["admin", "colaborador", "observador"] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-card border-r">
      <nav className="p-4 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

const DashboardOverview = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Dashboard</h1>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Projetos Ativos" value="12" trend="+2" />
      <StatsCard title="Ideias Registradas" value="28" trend="+5" />
      <StatsCard title="Feedbacks Recebidos" value="156" trend="+12" />
      <StatsCard title="Taxa de Conclusão" value="78%" trend="+3%" />
    </div>
    
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-6 bg-card rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Projetos Recentes</h3>
        <div className="space-y-3">
          <ProjectItem name="App Mobile" status="Em Andamento" priority="Alta" />
          <ProjectItem name="Website Redesign" status="Concluído" priority="Média" />
          <ProjectItem name="API Integration" status="Planejamento" priority="Alta" />
        </div>
      </div>
      
      <div className="p-6 bg-card rounded-lg border">
        <h3 className="text-xl font-semibold mb-4">Atividades Recentes</h3>
        <div className="space-y-3">
          <ActivityItem text="Nova ideia adicionada: 'Chatbot IA'" time="2h atrás" />
          <ActivityItem text="Feedback recebido no projeto Mobile" time="4h atrás" />
          <ActivityItem text="Projeto Website aprovado" time="1d atrás" />
        </div>
      </div>
    </div>
  </div>
);

const StatsCard = ({ title, value, trend }: { title: string; value: string; trend: string }) => (
  <div className="p-6 bg-card rounded-lg border">
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <div className="flex items-baseline space-x-2">
      <p className="text-2xl font-bold">{value}</p>
      <span className="text-sm text-success">{trend}</span>
    </div>
  </div>
);

const ProjectItem = ({ name, status, priority }: { name: string; status: string; priority: string }) => (
  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
    <span className={`px-2 py-1 text-xs rounded ${
      priority === "Alta" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
    }`}>
      {priority}
    </span>
  </div>
);

const ActivityItem = ({ text, time }: { text: string; time: string }) => (
  <div className="flex items-start space-x-3">
    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
    <div>
      <p className="text-sm">{text}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

const ProjectsPage = ({ userRole }: { userRole: string }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Projetos</h1>
      {(userRole === "admin" || userRole === "colaborador") && (
        <Button className="bg-gradient-primary">+ Novo Projeto</Button>
      )}
    </div>
    
    <div className="flex space-x-4 mb-6">
      <Button variant="outline" size="sm">Todos</Button>
      <Button variant="outline" size="sm">Em Andamento</Button>
      <Button variant="outline" size="sm">Concluídos</Button>
      <Button variant="outline" size="sm">Pausados</Button>
    </div>
    
    <div className="grid gap-6">
      <ProjectCard
        title="App Mobile Futurize"
        description="Desenvolvimento do aplicativo mobile principal da plataforma"
        status="Em Andamento"
        priority="Alta"
        progress={65}
        canEdit={userRole !== "observador"}
      />
      <ProjectCard
        title="Website Institucional"
        description="Redesign completo do website da empresa"
        status="Concluído"
        priority="Média"
        progress={100}
        canEdit={userRole !== "observador"}
      />
      <ProjectCard
        title="Integração com APIs"
        description="Implementação de integrações com sistemas externos"
        status="Planejamento"
        priority="Alta"
        progress={20}
        canEdit={userRole !== "observador"}
      />
    </div>
  </div>
);

const ProjectCard = ({ title, description, status, priority, progress, canEdit }: {
  title: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  canEdit: boolean;
}) => (
  <div className="p-6 bg-card rounded-lg border shadow-card hover:shadow-primary transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {canEdit && (
        <Button variant="outline" size="sm">Editar</Button>
      )}
    </div>
    
    <div className="flex items-center space-x-4 mb-4">
      <span className={`px-2 py-1 text-xs rounded ${
        status === "Concluído" ? "bg-success/20 text-success" :
        status === "Em Andamento" ? "bg-primary/20 text-primary" :
        "bg-warning/20 text-warning"
      }`}>
        {status}
      </span>
      <span className={`px-2 py-1 text-xs rounded ${
        priority === "Alta" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
      }`}>
        {priority}
      </span>
    </div>
    
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Progresso</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const IdeasPage = ({ userRole }: { userRole: string }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Ideias</h1>
      <Button className="bg-gradient-primary">+ Nova Ideia</Button>
    </div>
    
    <div className="grid gap-4">
      <IdeaCard
        title="Chatbot com IA"
        description="Implementar um chatbot inteligente para atendimento ao cliente"
        author="João Silva"
        date="Há 2 dias"
        votes={12}
      />
      <IdeaCard
        title="Dashboard Analítico"
        description="Criar dashboard com métricas avançadas de performance"
        author="Maria Santos"
        date="Há 1 semana"
        votes={8}
      />
      <IdeaCard
        title="App de Realidade Aumentada"
        description="Desenvolver funcionalidades de AR para visualização de projetos"
        author="Pedro Costa"
        date="Há 2 semanas"
        votes={15}
      />
    </div>
  </div>
);

const IdeaCard = ({ title, description, author, date, votes }: {
  title: string;
  description: string;
  author: string;
  date: string;
  votes: number;
}) => (
  <div className="p-6 bg-card rounded-lg border hover:shadow-card transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Por {author}</span>
          <span>{date}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">👍 {votes}</Button>
        <Button variant="outline" size="sm">Comentar</Button>
      </div>
    </div>
  </div>
);

const FeedbackPage = ({ userRole }: { userRole: string }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Feedback de Clientes</h1>
      {userRole === "admin" && (
        <Button className="bg-gradient-primary">+ Novo Feedback</Button>
      )}
    </div>
    
    <div className="flex space-x-4 mb-6">
      <Button variant="outline" size="sm">Todos</Button>
      <Button variant="outline" size="sm">Positivos</Button>
      <Button variant="outline" size="sm">Negativos</Button>
      <Button variant="outline" size="sm">Pendentes</Button>
    </div>
    
    <div className="grid gap-4">
      <FeedbackCard
        client="TechCorp"
        project="App Mobile"
        message="Excelente trabalho! O app ficou muito intuitivo e rápido."
        rating={5}
        date="Há 1 dia"
        status="Respondido"
      />
      <FeedbackCard
        client="StartupXYZ"
        project="Website"
        message="Gostaria de algumas modificações no layout da homepage."
        rating={3}
        date="Há 3 dias"
        status="Pendente"
      />
      <FeedbackCard
        client="InnovaCorp"
        project="Dashboard"
        message="Funcionalidade incrível! Vai nos economizar muito tempo."
        rating={5}
        date="Há 1 semana"
        status="Respondido"
      />
    </div>
  </div>
);

const FeedbackCard = ({ client, project, message, rating, date, status }: {
  client: string;
  project: string;
  message: string;
  rating: number;
  date: string;
  status: string;
}) => (
  <div className="p-6 bg-card rounded-lg border hover:shadow-card transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="flex items-center space-x-4 mb-2">
          <h3 className="font-semibold">{client}</h3>
          <span className="text-sm text-muted-foreground">Projeto: {project}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-warning" : "text-muted"}>★</span>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground mb-2">{message}</p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{date}</span>
          <span className={`px-2 py-1 rounded ${
            status === "Respondido" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
          }`}>
            {status}
          </span>
        </div>
      </div>
      <Button variant="outline" size="sm">Responder</Button>
    </div>
  </div>
);

export default Index;