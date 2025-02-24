import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

const chartData = Object.keys(techCount)
  .map((tech) => ({
    name: tech,
    value: techCount[tech],
    fill: `var(--color-${tech.toLowerCase()})`,
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
  react: {
    label: "React",
    theme: {
      light: generatePastelColor(0),
      dark: generatePastelColor(8),
    }
  },
  nextjs: {
    label: "Next.JS",
    theme: {
      light: generatePastelColor(1),
      dark: generatePastelColor(9),
    }
  },
  aws: {
    label: "AWS",
    theme: {
      light: generatePastelColor(2),
      dark: generatePastelColor(10),
    }
  },
  docker: {
    label: "Docker",
    theme: {
      light: generatePastelColor(3),
      dark: generatePastelColor(11),
    }
  },
  sql: {
    label: "SQL",
    theme: {
      light: generatePastelColor(4),
      dark: generatePastelColor(12),
    }
  },
  electron: {
    label: "Electron",
    theme: {
      light: generatePastelColor(5),
      dark: generatePastelColor(13),
    }
  },
  expo: {
    label: "Expo",
    theme: {
      light: generatePastelColor(6),
      dark: generatePastelColor(14),
    }
  },
  reactnative: {
    label: "React Native",
    theme: {
      light: generatePastelColor(7),
      dark: generatePastelColor(15),
    }
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
