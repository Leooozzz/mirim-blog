import Image from "next/image";
import Link from "next/link";
import { GetPostsComponents } from "@/components/posts/postHomePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MedalIcon,
  Users,
} from "lucide-react";

const anoFundacao = 1949;
const anoAtual = new Date().getFullYear();

const anosFundacao = anoAtual - anoFundacao;
const stats = [
  { value: anosFundacao, suffix: "+", label: "Anos transformando vidas" },
  { value: 5000, suffix: "+", label: "Jovens capacitados" },
  { value: 50, suffix: "+", label: "Empresas parceiras" },
  { value: 100, suffix: "%", label: "Totalmente gratuito" },
];

const diferenciais = [
  {
    icon: <GraduationCap size={24} />,
    title: "Cursos Profissionalizantes",
    text: "Formação gratuita para jovens de 14 a 18 anos, preparando-os para o mercado de trabalho.",
  },
  {
    icon: <Building2 size={24} />,
    title: "Programa Jovem Aprendiz",
    text: "Inserção de adolescentes no mercado de trabalho com acompanhamento profissional.",
  },
  {
    icon: <Users size={24} />,
    title: "Conexão Empresa-Jovem",
    text: "Integração entre jovens talentos e empresas que buscam novos profissionais.",
  },
  {
    icon: <MedalIcon size={24} />,
    title: "Certificação Reconhecida",
    text: "Certificados que agregam valor ao currículo e ampliam oportunidades.",
  },
];

export default function Page() {
  return (
    <main className="bg-gray-50">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/front/Main/Fotosaladeaula.png"
            alt="Jovens aprendizes da Fundação Mirim"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-white">
          <div className="inline-flex items-center gap-2 bg-blue-600/70 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
            <Users size={18} />
            <span className="text-sm font-medium">
              +{anosFundacao} anos impactando Araçatuba
            </span>
          </div>

          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 max-w-4xl">
            Construindo o futuro dos jovens de Araçatuba
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mb-8">
            Capacitação profissional gratuita conectando jovens ao mercado de
            trabalho através do programa Jovem Aprendiz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/Sobre">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-xl">
                Conheça a Fundação
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>

            <Link href="/Contatos">
              <Button
                variant="outline"
                className="border-white text-blue-400 hover:bg-white hover:text-blue-600 px-6 py-6 rounded-xl"
              >
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md p-6 text-center rounded-xl shadow-md hover:-translate-y-2 transition"
            >
              <div className="font-extrabold text-3xl text-blue-600">
                {stat.value.toLocaleString("pt-BR")}
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
              O que fazemos
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Transformando jovens em profissionais
            </h2>

            <p className="mt-2 text-gray-500">
              Oferecemos programas completos de capacitação para inserção no
              mercado de trabalho.
            </p>

            <div className="w-14 h-1 bg-blue-600 rounded-full mt-4 mb-12" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {diferenciais.map((item, index) => (
              <Card
                key={index}
                className="group rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="p-8 flex flex-col gap-4 items-start text-left">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-xl transition-colors duration-300 group-hover:text-blue-600">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Card className="rounded-2xl shadow-lg bg-blue-500">
            <CardContent className="p-10 flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Faça parte dessa história
              </h2>

              <p className="text-gray-300">
                Seja como jovem aprendiz ou empresa parceira, juntos podemos
                construir um futuro melhor.
              </p>

              <Link href="/Contatos">
                <Button className="px-8 py-6 text-base bg-white text-blue-500 shadow-md hover:-translate-y-2 transition hover:bg-white">
                  Fale Conosco
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative bg-linear-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
                Blog
              </span>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
                Posts mais recentes
              </h2>

              <p className="mt-4 text-gray-600">
                Acompanhe os conteúdos mais recentes publicados e fique por
                dentro das novidades e oportunidades.
              </p>

              <div className="w-16 h-1 bg-blue-600 rounded-full mt-6" />
            </div>

            <Link href="/Blog">
              <Button
                variant="secondary"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                Ir para o Blog →
              </Button>
            </Link>
          </div>

          <div className="mt-16">
            <GetPostsComponents />
          </div>
        </div>
      </section>
    </main>
  );
}
