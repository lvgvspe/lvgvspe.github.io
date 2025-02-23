"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import projetos from "@/public/projetos.json";
// Dados para o gráfico de pizza (Distribuição de linguagens)
const techCount = projetos.data.reduce((acc, projeto) => {
  projeto.tecnologias.forEach((tech) => {
    acc[tech] = (acc[tech] || 0) + 1;
  });
  return acc;
}, {} as Record<string, number>);


const chartData = Object.keys(techCount).map((tech) => ({
  name: tech,
  value: techCount[tech],
  fill: `var(--color-${tech.toLowerCase()})`,
}));

function generatePastelColor(index: number): string {
  let angulo = 200;
  let maxCol = 5 // pra desativar é só colocar maior do que o tamanho da lista
  let deslocamento = 8;

  // Gera um matiz (hue) baseado no índice, distribuído uniformemente
  const hue = (((index % maxCol) + deslocamento) * angulo) % 360; // 137.508 é um ângulo que distribui bem as cores

  // Varia a saturação entre 60% e 100% para cores mais vibrantes
  const saturation = 40 + (index % 4) * 10; // Varia entre 60% e 100%

  // Varia a luminosidade entre 40% e 70% para cores mais contrastantes
  const lightness = 35 + (index % 4) * 10; // Varia entre 40% e 60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const chartConfig = {
  react: {
    label: "React",
    color: generatePastelColor(0),
  },
  nextjs: {
    label: "Next.JS",
    color: generatePastelColor(1),
  },
  aws: {
    label: "AWS",
    color: generatePastelColor(2),
  },
  docker: {
    label: "Docker",
    color: generatePastelColor(3),
  },
  mysql: {
    label: "MySQL",
    color: generatePastelColor(4),
  },
  electron: {
    label: "Electron/Nextron",
    color: generatePastelColor(5),
  },
  postgresql: {
    label: "PostgreSQL",
    color: generatePastelColor(6),
  },
  expo: {
    label: "Expo",
    color: generatePastelColor(7),
  },
  reactnative: {
    label: "React Native",
    color: generatePastelColor(8),
  },
} satisfies ChartConfig;

export function TechChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tecnologias</CardTitle>
        <CardDescription>Tecnologias utilizadas nos projetos</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie data={chartData} dataKey="value">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
