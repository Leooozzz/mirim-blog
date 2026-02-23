"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, MessageSquareTextIcon, Phone } from "lucide-react";
import Image from "next/image";

export const Page = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const phone = "5518992033059";
    const text = `
      Olá, gostaria de entrar em contato:

      Nome: ${name}
      Email: ${email}
      Assunto: ${subject}
      Mensagem: ${message}
      `;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      text as string,
    )}`;

    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-200 ">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Entre em contato conosco</h1>
          <p className="text-lg max-w-xl text-gray-700 dark:text-gray-300">
            Estamos prontos para tirar suas dúvidas, ouvir sugestões e falar
            sobre o futuro da sua jornada educacional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <form onSubmit={handleSubmit}>
            <Card className="bg-gray-50 ">
              <CardHeader className="flex items-center">
                <MessageSquareTextIcon className="text-blue-500" />
                <CardTitle className="text-3xl">Envie sua mensagem</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nome completo
                    </label>
                    <Input name="name" placeholder="Seu nome" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Seu e-mail
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Assunto
                  </label>
                  <Select name="subject">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Assuntos</SelectLabel>
                        <SelectItem value="Inscrições">Inscrições</SelectItem>
                        <SelectItem value="Trabalhe conosco">
                          Trabalhe conosco
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mensagem
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Como podemos te ajudar?"
                    className="min-h-30"
                    required
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full bg-blue-500S">
                  Enviar pelo WhatsApp
                </Button>
              </CardFooter>
            </Card>
          </form>
          <div className="flex flex-col gap-8">
            <Card className="bg-gray-50 ">
              <div className="flex items-start gap-4 p-6">
                <Phone className="h-6 w-6 mt-1 text-blue-500" />
                <div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm tracking-wide text-muted-foreground">
                      Telefone & WhatsApp
                    </CardTitle>
                    <CardDescription className="text-xl font-semibold text-foreground">
                      +55 (18) 99203-3059
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">
                      Atendimento de segunda a sexta
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-50 ">
              <div className="flex items-start gap-4 p-6">
                <MapPin className="h-6 w-6  mt-1 text-blue-500" />
                <div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm">Endereço</CardTitle>
                    <CardDescription className="text-sm">
                      Fundação Mirim
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">
                      R. Tibiriçá, 186 - Vila Industrial, Araçatuba - SP,
                      16072-005
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
            <div className="relative w-full h-105 rounded-xl overflow-hidden">
              <iframe
                title="Mapa Araçatuba"
                src="https://www.google.com/maps?q=Fundação%20Mirim%20de%20Araçatuba&z=17&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center">
                  <MapPin className="h-10 w-10 text-blue-500  " />
                  <span className="bg-white  text-sm font-medium px-3 py-1 rounded-full shadow">
                    Nossa Sede
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-white/90   rounded-xl shadow-lg px-6 py-4 flex items-center justify-between">
                <span className="font-medium">Siga-nos:</span>

                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/fundacaomirimaracatuba/"
                    aria-label="Instagram"
                  >
                    <Image
                      src={"/front/instagram-black.png"}
                      alt={""}
                      width={25}
                      height={25}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/fundacaomirimdearacatubaoficial/"
                    aria-label="Facebook"
                  >
                    <Image
                      src={"/front/facebook-black.png"}
                      alt={""}
                      width={25}
                      height={25}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
