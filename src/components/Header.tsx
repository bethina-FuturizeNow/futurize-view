import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Futurize Now
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Funcionalidades
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Preços
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">
              Entrar
            </Button>
            <Button className="bg-gradient-primary">
              Começar Grátis
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
                Preços
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contato
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Entrar
                </Button>
                <Button className="w-full bg-gradient-primary">
                  Começar Grátis
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};