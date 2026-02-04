import { Card, CardContent } from "@/components/ui/card";
import { link } from "fs";
import {
  Building2,
  Eye,
  GraduationCap,
  HeartHandshake,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="bg-gray-50 dark:bg-gray-950">
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-10 flex justify-center">
          <div className="relative">
            <Image
              src="/front/Main/FundacaoMirimSobreImg.png"
              alt="Fundação Mirim"
              width={900}
              height={300}
              className="rounded-md object-cover"
              priority
            />
            <h1 className="absolute bottom-4 left-4 text-white text-3xl font-bold drop-shadow-lg">
              Nossa Jornada
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Tradição em Educar, Coragem para Inovar
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            Há mais de sete décadas, a Fundação Mirim Araçatuba abre portas para
            o futuro. Unimos tradição e inovação para preparar jovens
            protagonistas, prontos para os desafios do mercado de trabalho
            moderno.
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex ">
            <Image
              src={"/front/Main/FundacaoMirimSobreImg.png"}
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

      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
          <span className="text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-500 uppercase">
            Institucional
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Missão, Visão e Valores
          </h2>

          <div className="w-14 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mt-4 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              {
                icon: <Target size={26} />,
                title: "Missão",
                text: "Promover a formação humana, cidadã e profissional de jovens, preparando-os para o mercado de trabalho com responsabilidade social, ética e inovação.",
              },
              {
                icon: <Eye size={26} />,
                title: "Visão",
                text: "Ser referência regional na formação de jovens para o mundo do trabalho, reconhecida pela excelência educacional e pelo impacto positivo na comunidade.",
              },
              {
                icon: <HeartHandshake size={26} />,
                title: "Valores",
                text: "Compromisso com a educação, respeito ao ser humano, ética, responsabilidade social, inovação e valorização da diversidade.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="group rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                    {item.icon}
                  </div>

                  <h3
                    className="font-semibold text-xl text-gray-900 dark:text-gray-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
     <section className="bg-white dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-6 py-20">
  
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Liderança Acadêmica
      </h2>
      <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
        Os rostos por trás da excelência educacional
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      {[
        {
          name: "Exemplo 1",
          role: "Cargo exemplo 1",
          image: "/images/",
          link: "https://www.linkedin.com/feed/"
        },
        {
          name: "Exemplo 2",
          role: "Cargo explo 2",
          image: "/images/",
          link: "https://www.linkedin.com/feed/2"
        },
        {
          name: "Exmplo 3",
          role: "Cargo exemplo 3",
          image: "/images/",
          link: "https://www.linkedin.com/feed/"
        },
        {
          name: "Exemplo 4",
          role: "Cargo exemplo 4",
          image: "/images/",
        link: "https://www.linkedin.com/feed/"
        },  
      ].map((person, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center"
        >
        <Link href={person.link}>
        
        
        
          <div className="w-22 h-22 rounded-full overflow-hidden shadow-md mb-4">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>

   
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {person.name}
          </h3>

    
          <span className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {person.role}
          </span>
          </Link>
        </div>
        
        
      ))}
      
    </div>
  </div>
</section>
    </main>
  );
};

export default Page;
