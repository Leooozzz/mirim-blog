import { Card, CardContent } from "@/components/ui/card";
import { Award, Eye, Heart, HeartHandshake, Target, Users } from "lucide-react";
import Image from "next/image";

const anoFundacao = 1949;
const anoAtual = new Date().getFullYear();

const anosFundacao = anoAtual - anoFundacao;

const institucional = [
  {
    icon: Target,
    title: "Missão",
    text: "Promover a formação humana, cidadã e profissional de jovens, preparando-os para o mercado de trabalho com responsabilidade social, ética e inovação.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser referência regional na formação de jovens para o mundo do trabalho, reconhecida pela excelência educacional e pelo impacto positivo na comunidade.",
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    text: "Compromisso com a educação, respeito ao ser humano, ética, responsabilidade social, inovação e valorização da diversidade.",
  },
];
const Page = () => {
  return (
    <main className="bg-gray-50 ">
      <section className="w-full bg-white py-20">
        <div className="flex justify-center items-center flex-col gap-3 text-center">
          <span className="uppercase text-blue-500 font-extrabold">
            Sobre nós
          </span>
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-6 text-blue-500">
            Fundação Mirim de Araçatuba
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Há mais de {anosFundacao} anos transformando a vida de jovens através da
            educação profissional e inserção no mercado de trabalho.
          </p>
        </div>
      </section>

      <section className="">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex ">
            <Image
              src={"/front/Main/Venhafazerparte.png"}
              alt={""}
              width={500}
              height={500}
            />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-500 uppercase">
              Nossa História
            </span>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Raízes Fortes na Comunidade
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Nascemos da visão de educadores que enxergavam na educação o
              verdadeiro motor da transformação social. Ao longo das décadas,
              nossas estruturas cresceram e nossos currículos evoluíram, mas
              nossa essência humanista permanece intacta.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Hoje, o sucesso da Fundação Mirim não é medido apenas por números
              e aprovações, mas pelo legado de cidadania e pelo impacto positivo
              que nossos jovens geram no mundo.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
          <span className="text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-500 uppercase">
            Institucional
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-center">
            Missão, Visão e Valores
          </h2>

          <div className="w-14 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mt-4 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {institucional.map((item, i) => {
              const Icon = item.icon;

              return (
                <Card
                  key={i}
                  className="group rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <CardContent className="p-8 flex flex-col gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                      <Icon size={26} />
                    </div>

                    <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900"></section>
    </main>
  );
};

export default Page;
