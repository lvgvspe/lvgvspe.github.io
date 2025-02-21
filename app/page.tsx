"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/toggle-theme";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 mb-10">
      <div className="fixed right-0 bottom-0 m-5">
        <ModeToggle />
      </div>
      {/* Seção de Perfil */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/avatar.jpg" alt="Avatar" />
          <AvatarFallback>LC</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Lucas Camargo</h1>
          <p className="text-gray-500">
            Desenvolvedor Full Stack | React & Python
          </p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">
        Olá! Meu nome é Lucas. Sou desenvolvedor de software há 3 anos, apaixonado por
        criar soluções inovadoras e eficientes. Com experiência em diversas
        tecnologias, estou sempre buscando aprender e me aprimorar.
      </p>

      {/* Seção de Habilidades */}
      <ProjectCard
        title="Habilidades"
        tags={[
          { name: "Python" },
          { name: "Flask", variant: "outline" },
          { name: "FastAPI", variant: "outline" },
          { name: "Tk Interface", variant: "outline" },
          { name: "TypeScript/JavaScript" },
          { name: "React/React Native", variant: "outline" },
          {
            name: "Electron/Nextron (Windows, Linux e macOS)",
            variant: "outline",
          },
          { name: "Expo (Android e iOS)", variant: "outline" },
          { name: "Next.js", variant: "outline" },
          { name: "Node.js", variant: "outline" },
          { name: "Docker" },
          { name: "AWS" },
          { name: "Lambda", variant: "outline" },
          { name: "Gateway", variant: "outline" },
          { name: "ECS/Fargate", variant: "outline" },
          { name: "S3", variant: "outline" },
          { name: ".NET" },
          { name: "Windows Forms", variant: "outline" },
          { name: "SQL" },
          { name: "PostgreSQL", variant: "outline" },
          { name: "MySQL", variant: "outline" },
          { name: "SQLite", variant: "outline" },
          { name: "Git" },
          { name: "Linux" },
          { name: "Web Hosting" },
        ]}
      />

      <Separator />

      {/* Projetos em Destaque */}
      <h2 className="text-xl font-semibold">Projetos Recentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          title="Projeto Totem"
          description="Aplicativo Windows e API em nuvem para totem de autoatendimento."
          tags={[
            { name: "Electron/Nextron" },
            { name: "React" },
            { name: "Next.js" },
            { name: "Mantine" },
            { name: "Gateway de pagamento/PDV" },
            { name: "AWS" },
            { name: "Python" },
          ]}
        />
        <ProjectCard
          title="Robô Viral"
          description="Aplicativo Windows e API em nuvem para replicação de vídeos entre diferentes redes sociais."
          tags={[
            { name: "Electron/Nextron" },
            { name: "React" },
            { name: "Next.js" },
            { name: "AWS" },
            { name: "Python" },
          ]}
        />
        <ProjectCard
          title="Vision Web"
          description="Aplicativo Android TV e dashboard Web com API em nuvem para exibição de anúncios publicitários."
          tags={[
            { name: "Expo (Android)" },
            { name: "React Native" },
            { name: "Node.js" },
            { name: "AWS" },
            { name: "Python" },
          ]}
        />
        <ProjectCard
          title="ElectroKraft"
          description="Sistema web de gerenciamento de pagamentos e controle de horário de prestadores de serviço."
          tags={[
            { name: "React" },
            { name: "Mantine" },
            { name: "Web Hosting" },
            { name: "PostgreSQL" },
            { name: "Vercel" },
          ]}
        />
      </div>

      <Separator />

      {/* Chamada para Contato */}
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">
          Interessado em trabalhar comigo?
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Entre em contato</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => window.open("https://wa.me/5562998030059")}
            >
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open("mailto:lvgvspe@icloud.com")}
            >
              Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open("https://t.me/lvgvspe")}
            >
              Telegram
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open("tel:62998030059")}>
              Telefone
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-right text-xs">Lucas Camargo © 2025</p>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  description?: string;
  tags: {
    name: string;
    variant?:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | null
      | undefined;
  }[];
}

function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <Card className="pt-4">
      <CardContent>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.name} variant={tag.variant}>
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
