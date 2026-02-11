import { GetPostsComponents } from "@/components/posts/postHomePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="bg-gray-50 dark:bg-gray-950">
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="flex justify-center">
            <Image
              src="/front/Main/Venhafazerparte.png"
              alt="Educação colaborativa na Fundação Mirim"
              width={420}
              height={560}
              priority
              className="rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
              Educação que{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Transforma
              </span>
              , <br />
              Inovação que Inspira
            </h1>

            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Todo grande futuro começa com uma decisão: dar o primeiro passo.
              Na Fundação Mirim, você encontra o apoio, a estrutura e as
              oportunidades que precisa para transformar seu potencial em
              profissão.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
              <Button asChild className="px-6 py-6 text-base">
                <Link href="/Blog">Nosso blog</Link>
              </Button>

              <Button asChild variant="outline" className="px-6 py-6 text-base">
                <Link href="/Contatos">Entre em contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <span className="text-sm font-semibold tracking-widest text-blue-600 dark:text-blue-500 uppercase">
            Diferenciais
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Por que escolher nossa instituição?
          </h2>

          <div className="w-14 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mt-4 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              {
                icon: <GraduationCap size={24} />,
                title: "Nossa Metodologia",
                text: "Metodologia inovadora baseada em projetos reais (PBL), preparando os alunos para o mercado de trabalho.",
              },
              {
                icon: <Building2 size={24} />,
                title: "Infraestrutura",
                text: "Laboratórios, atendimento odontológico e ambientes planejados para estimular criatividade e aprendizado.",
              },
              {
                icon: <Users size={24} />,
                title: "Corpo Docente",
                text: "Professores experientes, com forte atuação acadêmica e no mercado atual.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="
    group
    rounded-xl border
    bg-white dark:bg-gray-900 dark:border-gray-800
    transition-all duration-300
    hover:-translate-y-2 hover:shadow-xl
  "
              >
                <CardContent className="p-8 flex flex-col gap-4">
                  <div
                    className="
        w-12 h-12 flex items-center justify-center rounded-lg
        bg-blue-100 text-blue-600
        dark:bg-blue-950 dark:text-blue-400
        transition-colors duration-300
        group-hover:bg-blue-600 group-hover:text-white
        dark:group-hover:bg-blue-500 dark:group-hover:text-white
      "
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
        font-semibold text-xl
        text-gray-900 dark:text-gray-100
        transition-colors
        group-hover:text-blue-600 dark:group-hover:text-blue-400
      "
                  >
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

      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <Card className="w-full max-w-3xl rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-950">
            <CardContent className="p-10 flex flex-col items-center text-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Pronto para começar sua{" "}
                <span className="text-blue-600 dark:text-blue-500">
                  jornada?
                </span>
              </h2>

              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                Entre em contato conosco para fazer sua inscrição e iniciar sua
                jornada no mercado de trabalho.
              </p>

              <Link href="/Contatos">
                <Button className="px-8 py-6 text-base">Fale Conosco</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Posts mais recentes
            </h1>

            <Link href="/Blog">
              <Button variant="secondary" className="cursor-pointer">Ir para o Blog</Button>
            </Link>
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
            Acompanhe os conteúdos mais recentes publicados e fique por dentro das novidades.
          </p>

          <div className="w-full flex flex-col gap-5 mt-10">
            <GetPostsComponents />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
