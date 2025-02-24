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
const languageCount = projetos.data.reduce((acc, projeto) => {
  projeto.linguagens.forEach((lang) => {
    acc[lang] = (acc[lang] || 0) + 1;
  });
  return acc;
}, {} as Record<string, number>);

const chartData = Object.keys(languageCount)
  .map((lang) => ({
    name: lang,
    value: languageCount[lang],
    fill: `var(--color-${lang.toLowerCase()})`,
  }))
  .sort((a, b) => b.value - a.value);

function generatePastelColor(index: number): string {
  let angulo = 200;
  let maxCol = 100; // pra desativar é só colocar maior do que o tamanho da lista
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
  python: {
    label: "Python",
    theme: {
      light: generatePastelColor(0),
      dark: generatePastelColor(8),
    }
  },
  javascript: {
    label: "Javascript",
    theme: {
      light: generatePastelColor(1),
      dark: generatePastelColor(9),
    }
  },
  net: {
    label: ".NET",
    theme: {
      light: generatePastelColor(2),
      dark: generatePastelColor(10),
    }
  },
  bash: {
    label: "Bash",
    theme: {
      light: generatePastelColor(3),
      dark: generatePastelColor(11),
    }
  },
  powershell: {
    label: "PowerShell",
    theme: {
      light: generatePastelColor(4),
      dark: generatePastelColor(12),
    }
  }
} satisfies ChartConfig;

export function LangChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Linguagens</CardTitle>
        <CardDescription>Linguagens utilizadas nos projetos</CardDescription>
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
