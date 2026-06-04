"use client"

import Image from "next/image"
import { useMemo, useRef } from "react"

import profileImg from "assets/imgs/jonatas-ricardo-santos-frontend-avatar.png"
import heroIllustration from "assets/imgs/consultoria-hero-shelves.png"
import { Button } from "components/base-ui/button"
import { cn } from "components/base-ui/cn"
import Chat, { type ChatHandle } from "components/chat"
import { consultoriaPalette as p } from "components/consultoria-web/consultoria-palette"
import { ContentBlock, ContentStack } from "components/content-block"

const whatsappNumber = "5521980484957"
const defaultMessage = "Olá Jonatas, vi sua página e quero conversar sobre minha presença digital."

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
] as const

const clientBrandLogos = [
  {
    name: "Calvin Klein",
    src: "/consultoria/logos/calvin-klein.png",
    containerClassName: "px-1.5 py-1",
  },
  { name: "Walmart", src: "/consultoria/logos/walmart.png" },
  { name: "Havaianas", src: "/consultoria/logos/havaianas.png" },
  { name: "Riachuelo", src: "/consultoria/logos/riachuelo.png" },
  { name: "C&A", src: "/consultoria/logos/cea.png" },
] satisfies Array<{
  name: string
  src: string
  containerClassName?: string
}>

const faqs = [
  {
    question: "Meu negócio é pequeno. Isso funciona para mim?",
    answer:
      "Funciona exatamente para você. Quanto menor o negócio, mais impacto tem quando você para de fazer tudo na mão.",
  },
  {
    question: "Preciso entender de tecnologia para usar o que você entrega?",
    answer: "Não. Tudo é construído para você conseguir usar e manter sem precisar saber programar.",
  },
  {
    question: "Quanto tempo leva para ver resultado?",
    answer:
      "Depende do que vamos fazer juntos, mas os primeiros resultados aparecem ainda durante o processo. Em 30 dias você já opera de forma diferente.",
  },
  {
    question: "Vai custar caro manter as ferramentas depois?",
    answer: "Não. Sempre priorizo soluções acessíveis. O que muda é a forma como elas trabalham juntas.",
  },
  {
    question: "E se não funcionar para o meu negócio?",
    answer: "Devolvo 100% do valor investido. Sem pergunta, sem burocracia.",
  },
]

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
]

const blockClass = "space-y-5"

function HeroHeadline({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        "text-[1.375rem] leading-[1.18] font-bold lg:text-[2.625rem] lg:leading-[1.16] lg:font-normal",
        "text-black",
        className
      )}
    >
      Sabe como a internet pode ajudar seu negócio a{" "}
      <span
        className={cn(
          p.text.green,
          "underline decoration-[#011a24] decoration-[3px] underline-offset-[4px] lg:no-underline"
        )}
      >
        vender mais com menos esforço?
      </span>
    </h1>
  )
}

function HeroSpeechBubble({ className, tailClassName }: { className?: string; tailClassName?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-[15.0625rem] rounded-lg px-[1.125rem] py-5 shadow-[0_10px_24px_rgba(1,26,36,0.18)] lg:w-[38.875rem] lg:rounded-lg lg:px-7 lg:py-6",
          p.bg.white
        )}
      >
        <p className={cn("text-[0.875rem] leading-[1.45] lg:text-[1.25rem] lg:leading-[1.5]", p.text.navyDark)}>
          Você já vende pelo WhatsApp, ou Instagram,{" "}
          <strong>
            mas enquanto você responde mensagem, cria conteúdo e ainda tenta fechar venda, o seu negócio depende 100% de
            você —{" "}
          </strong>
          <strong className={p.text.orange}>e você está esgotado. Certo?</strong>
        </p>

        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-4 left-[2.625rem] size-8 rotate-45 shadow-[3px_3px_6px_rgba(1,26,36,0.06)] lg:-bottom-6 lg:left-[6rem] lg:size-12",
            p.bg.white,
            tailClassName
          )}
        />
      </div>
    </div>
  )
}

function HeroMobileAvatar() {
  return (
    <div className="relative z-30 shrink-0 rounded-full bg-[#e8e4dc] p-1 shadow-[0_4px_16px_rgba(1,26,36,0.12)]">
      <div className="size-12 overflow-hidden rounded-full ring-2 ring-[#ff8000]">
        <Image
          alt="Jonatas Ricardo"
          className="size-full object-cover"
          height={80}
          priority
          src={profileImg}
          width={80}
        />
      </div>
    </div>
  )
}

function HeroDesktopProfile() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full bg-[#e9e1d5] p-1.5 shadow-[0_10px_28px_rgba(1,26,36,0.12)]">
        <div className="size-[16.25rem] overflow-hidden rounded-full ring-4 ring-[#ff8000]/15">
          <Image
            alt="Jonatas Ricardo"
            className="size-full object-cover"
            height={320}
            priority
            src={profileImg}
            width={320}
          />
        </div>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-[#37312d]">Jonatas Ricardo S. Santos</h2>
      <p className="mt-0.5 text-base font-semibold text-[#37312d]">Especialista em Web para Negócios</p>
    </div>
  )
}

function BrandLogos() {
  return (
    <div
      aria-label="Marcas com as quais já trabalhei"
      className="mt-3 flex w-full flex-row flex-nowrap items-center justify-between gap-2 sm:gap-3"
      role="list"
    >
      {clientBrandLogos.map(({ name, src, containerClassName }) => (
        <div
          className={cn("flex min-w-0 flex-1 items-center justify-center", containerClassName)}
          key={name}
          role="listitem"
        >
          <img alt={name} className="h-9 max-h-12 w-full object-contain object-center sm:h-10 lg:h-11" src={src} />
        </div>
      ))}
    </div>
  )
}

function DesktopIntroPreview() {
  return (
    <div className="absolute top-[29.5rem] left-[23.5rem] w-[42.5rem]">
      <p className="max-w-[42.25rem] text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Faz mais de 15 anos que trabalho com negócios na internet — no Brasil e nos Estados Unidos. Já participei de
        projetos para marcas como:
      </p>
      <BrandLogos />
      <p className="mt-2 max-w-[42.25rem] text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Aprendi na prática o que separa um negócio que cresce do que fica rodando no lugar.
      </p>
      <p className="mt-2 max-w-[42.25rem] text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Hoje uso esse conhecimento para ajudar empreendedores brasileiros a vender mais — com sites, aplicativos,
        automações e inteligência artificial.
      </p>
      <p className="mt-2 max-w-[42.25rem] text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Sem complicação, sem papo técnico. Só resultado.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {serviceCards.map(({ title, description, image }) => (
          <div className="flex flex-col overflow-hidden rounded-2xl bg-white" key={title}>
            <img alt={title} className="aspect-square w-full object-cover" src={image} />
            <div className="flex flex-col gap-1.5 p-3.5">
              <p className="text-sm leading-snug font-bold text-gray-900">{title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileIntroPreview() {
  return (
    <div className="relative mt-[20rem] space-y-2">
      <p className="text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Faz mais de 15 anos que trabalho com negócios na internet — no Brasil e nos Estados Unidos. Já participei de
        projetos para marcas como:
      </p>
      <BrandLogos />
      <p className="text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Aprendi na prática o que separa um negócio que cresce do que fica rodando no lugar.
      </p>
      <p className="text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Hoje uso esse conhecimento para ajudar empreendedores brasileiros a vender mais — com sites, aplicativos,
        automações e inteligência artificial.
      </p>
      <p className="text-[0.9375rem] leading-[1.75] font-medium text-[#011a24]">
        Sem complicação, sem papo técnico. Só resultado.
      </p>

      <div className="-mx-7 mt-6 flex gap-4 overflow-x-auto px-7">
        {serviceCards.map(({ title, description, image }) => (
          <div className="flex w-[17rem] shrink-0 flex-col overflow-hidden rounded-2xl bg-white" key={title}>
            <img alt={title} className="aspect-square w-full object-cover" src={image} />
            <div className="flex flex-col gap-1.5 p-3.5">
              <p className="text-sm leading-snug font-bold text-gray-900">{title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileHero() {
  return (
    <div className="relative mx-auto max-w-[24.5625rem] px-7 pb-8 lg:hidden">
      <HeroHeadline className="pt-6" />
      <HeroSpeechBubble className="absolute top-[8.8125rem] left-7 z-30" />

      <div className="absolute top-[12.25rem] left-[9.75rem] z-20 w-[14.0625rem]">
        <Image
          alt="Ilustração de loja digital no celular com produtos e redes sociais"
          className="h-auto w-full object-contain object-bottom"
          priority
          src={heroIllustration}
        />
      </div>

      <div className="absolute top-[21.875rem] left-[3.375rem] z-40">
        <HeroMobileAvatar />
      </div>

      <MobileIntroPreview />
    </div>
  )
}

function DesktopHero() {
  return (
    <div className="relative mx-auto hidden min-h-[69.8125rem] w-full max-w-[66.75rem] lg:block">
      <HeroHeadline className="absolute top-[4.25rem] left-0 w-[40.75rem]" />
      <HeroSpeechBubble className="absolute top-[15.375rem] left-0 z-30" />

      <div className="absolute top-[-1.25rem] right-[-3.125rem] z-20 w-[29.25rem]">
        <Image
          alt="Ilustração de loja digital no celular com produtos e redes sociais"
          className="h-auto w-full object-contain object-bottom"
          priority
          src={heroIllustration}
        />
      </div>

      <div className="absolute top-[29.75rem] left-2 z-20 w-[17rem]">
        <HeroDesktopProfile />
      </div>

      <DesktopIntroPreview />
    </div>
  )
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs font-semibold tracking-[0.08em] uppercase", className)}>{children}</p>
}

function SalesSections({ onStartConversation }: { onStartConversation: () => void }) {
  return (
    <ContentStack className="space-y-8">
      <ContentBlock delay={1.15} className={blockClass}>
        <SectionLabel className={p.text.orange}>Como funciona</SectionLabel>
        <h2 className={cn("text-xl font-semibold", p.text.navyDark)}>
          Do jeito que é hoje até o negócio rodando sozinho — em 4 passos
        </h2>

        <div className="flex flex-col">
          {steps.map(({ number, title, description }, i) => (
            <div className="relative flex gap-4" key={number}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
                    p.bg.orange,
                    p.text.white
                  )}
                >
                  {number}
                </div>
                {i < steps.length - 1 && <div className={cn("mt-1 w-px grow", "bg-[#ff8000]/25")} />}
              </div>
              <div className={cn("pb-6", i === steps.length - 1 && "pb-0")}>
                <h3 className={cn("font-medium", p.text.navyDark)}>{title}</h3>
                <p className={cn("mt-1 text-sm leading-relaxed", p.text.body)}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock delay={1.25} className={blockClass}>
        <SectionLabel className={p.text.blue}>Perguntas frequentes</SectionLabel>
        <h2 className={cn("text-xl font-semibold", p.text.navyDark)}>Ficou alguma dúvida?</h2>

        <div className="divide-y divide-[#003144]/10">
          {faqs.map(({ question, answer }) => (
            <div className="py-4" key={question}>
              <h3 className={cn("font-medium", p.text.navyDark)}>{question}</h3>
              <p className={cn("mt-2 text-sm leading-relaxed", p.text.body)}>{answer}</p>
            </div>
          ))}
        </div>
      </ContentBlock>

      <div className={cn("rounded-2xl p-6 text-center", "bg-[#1a1a1a]")}>
        <h2 className="text-xl font-semibold text-white">Pronto para parar de fazer tudo sozinho?</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/55">
          Uma conversa de 30 minutos já é suficiente para eu entender o seu caso e te mostrar o que é possível fazer.
          Sem compromisso.
        </p>
        <Button
          className={cn(
            "mt-6 h-auto w-full rounded-full px-6 py-4 text-base font-semibold hover:opacity-90",
            p.bg.orange,
            p.text.white
          )}
          onClick={onStartConversation}
          type="button"
        >
          Quero conversar com o Jonatas
        </Button>
        <p className="mt-3 text-xs text-white/40">Atendimento personalizado — poucas vagas por mês.</p>
      </div>
    </ContentStack>
  )
}

export default function ConsultoriaWebPage() {
  const chatRef = useRef<ChatHandle>(null)

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`
  }, [])

  const handleStartConversation = () => {
    chatRef.current?.startConversation(defaultMessage)
  }

  return (
    <div className="min-h-screen bg-[#fdf7ed] pb-24 lg:pb-28">
      <section className="relative overflow-hidden bg-[#fdf7ed] lg:min-h-[69.8125rem]">
        <span aria-hidden="true" className="absolute top-[26rem] left-0" id="servicos" />

        <div aria-hidden="true" className="absolute inset-0">
          <div className="h-[22.9375rem] bg-[#fce2bd] lg:h-[23.375rem]" />
          <div className="h-[calc(100%-22.9375rem)] bg-[#fdf7ed] lg:h-[calc(100%-23.375rem)]" />
        </div>

        <MobileHero />
        <DesktopHero />
      </section>

      <div className="mx-auto max-w-[24.5625rem] px-7 py-8 lg:max-w-[66.75rem] lg:px-0 lg:py-10">
        <div className="space-y-8 lg:ml-[23.5rem] lg:max-w-[42.25rem]">
          <SalesSections onStartConversation={handleStartConversation} />
          <Chat
            ref={chatRef}
            context="consultoria"
            placeholder="Oi, sou o Jonatas. Me conta sobre o seu negócio."
            whatsappFallbackUrl={whatsappUrl}
          />
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-[#011a24]/8 px-4 py-3 backdrop-blur-sm",
          "bg-[#fdf7ed]/95 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        )}
      >
        <Button
          className={cn(
            "mx-auto flex h-auto w-full max-w-[24.5625rem] rounded-full px-6 py-3.5 text-base font-semibold shadow-[0_8px_24px_rgba(255,128,0,0.35)] hover:opacity-90 lg:max-w-[42.25rem]",
            p.bg.orange,
            p.text.white
          )}
          onClick={handleStartConversation}
          type="button"
        >
          Quero conversar
        </Button>
      </div>
    </div>
  )
}
