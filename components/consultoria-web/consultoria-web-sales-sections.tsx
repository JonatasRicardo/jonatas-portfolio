"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import profileImg from "assets/imgs/jonatas-ricardo-santos-frontend-avatar.png";
import { cn } from "components/base-ui/cn";

import { consultoriaPalette as p } from "./consultoria-palette";

const whatsappNumber = "5521980484957";
const defaultMessage = "Olá Jonatas, vi sua página e quero conversar sobre minha presença digital.";

const serviceCards = [
  {
    title: "Sites e Aplicativos",
    description:
      "Seu negócio com uma presença profissional na internet — que atrai, convence e vende, mesmo enquanto você dorme.",
    image: "/consultoria/imagem-sites-apps.png",
  },
  {
    title: "Automações com IA no WhatsApp",
    description:
      "Seu WhatsApp atendendo, respondendo e fechando vendas sozinho — com a sua voz e do seu jeito, 24 horas por dia.",
    image: "/consultoria/imagem-whatsapp-ia.png",
  },
  {
    title: "Estratégia de Vendas pela Internet",
    description:
      "Um plano claro para vender mais usando a internet — sem depender de post diário, sem precisar estar sempre online.",
    image: "/consultoria/imagem-estrategia.png",
  },
] as const;

const steps = [
  {
    number: 1,
    title: "A gente se fala",
    description:
      "Você me conta como o seu negócio funciona hoje — como vende, como atende, onde sente que perde tempo e oportunidade. Sem compromisso, sem formulário longo.",
  },
  {
    number: 2,
    title: "Eu entendo o problema de verdade",
    description:
      "Mapeio onde estão as vendas perdidas, onde você gasta tempo que não precisa e o que dá para resolver primeiro. Você recebe um diagnóstico claro — não um relatório para ficar na gaveta.",
  },
  {
    number: 3,
    title: "A gente constrói juntos",
    description:
      "Site, aplicativo, atendimento automático no WhatsApp, estratégia de vendas — o que fizer mais sentido para o seu caso. Você acompanha cada etapa e sabe exatamente o que está sendo feito.",
  },
  {
    number: 4,
    title: "Você vende mais — e trabalha menos",
    description:
      "Com tudo funcionando, o negócio passa a rodar com menos depender de você. Mais vendas, mais tempo, mais qualidade de vida. E eu fico por perto por 30 dias para garantir que está tudo certo.",
  },
] as const;

const faqs = [
  {
    question: "Meu negócio é pequeno. Isso funciona para mim?",
    answer:
      "Funciona exatamente para você. Quanto menor o negócio, mais impacto tem quando você para de fazer tudo na mão.",
  },
  {
    question: "Preciso entender de tecnologia para usar o que você entrega?",
    answer:
      "Não. Tudo é construído para você conseguir usar e manter sem precisar saber programar.",
  },
  {
    question: "Quanto tempo leva para ver resultado?",
    answer:
      "Depende do que vamos fazer juntos, mas os primeiros resultados aparecem ainda durante o processo. Em 30 dias você já opera de forma diferente.",
  },
  {
    question: "Vai custar caro manter as ferramentas depois?",
    answer:
      "Não. Sempre priorizo soluções acessíveis. O que muda é a forma como elas trabalham juntas.",
  },
  {
    question: "E se não funcionar para o meu negócio?",
    answer: "Devolvo 100% do valor investido. Sem pergunta, sem burocracia.",
  },
] as const;

export function ConsultoriaWebSobre() {
  return (
    <section className="bg-[#F5EDD8] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex shrink-0 flex-col items-center text-center">
            <div className="rounded-full bg-[#E8820C] p-1.5 shadow-[0_10px_28px_rgba(232,130,12,0.3)]">
              <div className="size-36 overflow-hidden rounded-full lg:size-48">
                <Image
                  alt="Jonatas Ricardo"
                  className="size-full object-cover"
                  height={192}
                  src={profileImg}
                  width={192}
                />
              </div>
            </div>
            <p className="mt-4 font-serif text-lg font-bold text-[#1a1a1a]">Jonatas Ricardo S. Santos</p>
            <p className="mt-0.5 text-sm text-[#1a1a1a]/60">Fullstack Software Engineer</p>
          </div>

          <div className="flex flex-col gap-8">
            <p className="font-serif text-base leading-relaxed text-[#1a1a1a] lg:text-lg">
              Faz mais de 15 anos que trabalho com negócios na internet — no Brasil e nos Estados Unidos. Já participei
              de projetos para marcas como Calvin Klein, Walmart, Havaianas, Riachuelo e C&A. Aprendi na prática o que
              separa um negócio que cresce do que fica rodando no lugar. Hoje uso esse conhecimento para ajudar
              empreendedores brasileiros a vender mais — com sites, aplicativos, automações e inteligência artificial.
              Sem complicação, sem papo técnico. Só resultado.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {serviceCards.map(({ title, description, image }) => (
                <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm" key={title}>
                  <img alt={title} className="aspect-square w-full object-cover" src={image} />
                  <div className="flex flex-col gap-1.5 p-4">
                    <p className="text-sm font-bold leading-snug text-gray-900">{title}</p>
                    <p className="text-xs leading-relaxed text-gray-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConsultoriaWebComoFunciona() {
  return (
    <section className="bg-white px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8820C]">Como funciona</p>
        <h2 className="mt-3 font-serif text-2xl font-bold leading-snug text-[#1a1a1a] lg:text-3xl">
          Do jeito que é hoje até o negócio rodando sozinho — em 4 passos
        </h2>

        <div className="mt-12 flex flex-col gap-0">
          {steps.map(({ number, title, description }, i) => (
            <div className="relative flex gap-6" key={number}>
              <div className="flex flex-col items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8820C] text-sm font-bold text-white shadow-md">
                  {number}
                </div>
                {i < steps.length - 1 && <div className="mt-1 w-px grow bg-[#E8820C]/25" />}
              </div>
              <div className={cn("pb-10", i === steps.length - 1 && "pb-0")}>
                <p className="font-serif text-base font-bold text-[#1a1a1a] lg:text-lg">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]/65 lg:text-base">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#1a1a1a]/10">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span className="font-serif text-base font-semibold text-[#1a1a1a] lg:text-lg">{question}</span>
        <span
          className={cn(
            "shrink-0 text-[#E8820C] transition-transform duration-200",
            open && "rotate-45"
          )}
        >
          <svg fill="none" height="20" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width="20">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-[#1a1a1a]/65 lg:text-base">{answer}</p>
      )}
    </div>
  );
}

export function ConsultoriaWebFaq() {
  return (
    <section className="bg-[#F5EDD8] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] lg:text-3xl">Ficou alguma dúvida?</h2>
        <div className="mt-8">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultoriaWebCtaFinal() {
  const whatsappUrl = useMemo(
    () => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`,
    []
  );

  return (
    <section className="bg-[#F5EDD8] px-6 pb-20 pt-0 lg:pb-28">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-[#1a1a1a] px-8 py-12 text-center lg:px-12 lg:py-16">
          <h2 className="font-serif text-2xl font-bold text-white lg:text-3xl">
            Pronto para parar de fazer tudo sozinho?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 lg:text-base">
            Uma conversa de 30 minutos já é suficiente para eu entender o seu caso e te mostrar o que é possível fazer.
            Sem compromisso.
          </p>
          <a
            className="mt-8 inline-block rounded-full bg-[#E8820C] px-8 py-4 text-base font-bold text-white shadow-lg transition-opacity hover:opacity-90"
            href={whatsappUrl}
            rel="noreferrer"
            target="_blank"
          >
            Quero conversar com o Jonatas
          </a>
          <p className="mt-4 text-xs text-white/40">Atendimento personalizado — poucas vagas por mês.</p>
        </div>
      </div>
    </section>
  );
}
