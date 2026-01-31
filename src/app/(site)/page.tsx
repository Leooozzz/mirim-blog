import { PostHomePage } from "@/components/posts/postHomePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Page = () => {
  return (
    <main>
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="flex justify-center">
            <Image
              src="/front/main/Venhafazerparte--.png"
              alt="Educação colaborativa na Fundação Mirim"
              width={520}
              height={360}
              priority
              className="rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Educação que <span className="text-blue-600">Transforma</span>,{" "}
              <br />
              Inovação que Inspira
            </h1>

            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Todo grande futuro começa com uma decisão: dar o primeiro passo.
              Na Fundação Mirim, você encontra o apoio, a estrutura e as
              oportunidades que precisa para transformar seu potencial em
              profissão.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
              <Button asChild className="px-6 py-6 text-base">
                <a href="/Blog">Nosso blog</a>
              </Button>

              <Button asChild variant="outline" className="px-6 py-6 text-base">
                <a href="/Contatos">Entre em contato</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 dark:bg-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
            Diferenciais
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white dark:text-gray-900 text-center">
            Por que escolher nossa instituição?
          </h2>

          <div className="w-14 h-1 bg-blue-500 rounded-full mt-4 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <Card className="rounded-xl shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <GraduationCap size={24} />
                </div>

                <h3 className="font-semibold text-lg">Nossa Metodologia</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Metodologia inovadora baseada em projetos reais (PBL), que
                  prioriza a prática e prepara os alunos para os desafios do
                  mercado de trabalho no século XXI.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Building2 size={24} />
                </div>

                <h3 className="font-semibold text-lg">Infraestrutura</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Laboratórios de informatica, antendimento odontologico,
                  dinamicas que encentivam o planejados para fomentar a
                  criatividade e o estudo.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Users size={24} />
                </div>

                <h3 className="font-semibold text-lg">Corpo Docente</h3>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Time composto por professores com ampla vivência acadêmica e
                  forte atuação no mercado de trabalho atual.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <Card className="w-full max-w-3xl rounded-2xl shadow-lg">
            <CardContent className="p-10 flex flex-col items-center text-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Pronto para começar sua
              </h2>
              <h2 className="text-blue-500 dark:text-blue-950 text-3xl md:text-4xl font-bold">
                jornada?
              </h2>

              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xl">
                Entre em contato conosco para fazer sua inscrição e iniciar sua
                jornada no mercado de trabalho.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href={"/Contatos"}>
                   <Button className="px-8 py-6 text-base">Fale Conosco</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="bg-gray-900 dark:bg-gray-200 py-20">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-white dark:text-gray-900">
            Post mais recentes
          </h1>
          <Button>
            
          </Button>
          </div>
          <p className="mt-2 text-gray-300 dark:text-gray-700">
            Confira os conteúdos mais recentes publicados.
          </p>
          <div className="mt-5">
            <PostHomePage/>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Page;
