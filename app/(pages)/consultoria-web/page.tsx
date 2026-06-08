"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
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

function HeroHeadline({ className, delay = 0.2 }: { className?: string; delay?: number }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "max-w-[35rem] text-[2rem] leading-[1.08] font-bold tracking-normal text-[#1a1a1a] sm:text-[3.25rem]",
        "lg:max-w-none lg:text-[3.75rem] lg:leading-[1.02] xl:text-[3.875rem]",
        className
      )}
    >
      Seu negócio <span className={p.text.green}>vendendo sozinho</span>.
    </motion.h1>
  )
}

function HeroSubheadline({ className, delay = 0.35 }: { className?: string; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      className={cn(
        "mt-4 max-w-[38rem] leading-[1.42] font-medium text-[#4c4945] sm:text-[1.5rem]",
        "lg:mt-5 lg:text-[1.625rem] lg:leading-[1.45]",
        className
      )}
    >
      Sites, lojas e automação com IA pra quem vende no Insta e no WhatsApp — pra vender mais com menos esforço.
    </motion.p>
  )
}

function HeroSpeechBubble({
  className,
  delay = 0.5,
  tailClassName,
}: {
  className?: string
  delay?: number
  tailClassName?: string
}) {
  return (
    <motion.div
      initial={{ display: "none", y: 40 }}
      animate={{ display: "block", y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn("relative", className)}
    >
      <div
        className={cn(
          "relative w-full rounded-[1.75rem] bg-white/50 px-5 py-5 shadow-[0_18px_42px_rgba(1,26,36,0.18)] backdrop-blur-md backdrop-saturate-150",
          "sm:bg-white/55 sm:px-9 sm:py-9 lg:rounded-[1.625rem] lg:bg-white/62 lg:px-8 lg:py-8"
        )}
      >
        <p
          className={cn(
            "text-[0.9rem] leading-[1.48] font-semibold text-[#1f1f1f] sm:text-[1.5rem]",
            "lg:text-[1.35rem] lg:leading-[1.55] xl:text-[1.5rem]"
          )}
        >
          Você já vende pelo WhatsApp ou Instagram,{" "}
          <strong>
            mas enquanto você responde mensagem, cria conteúdo e ainda tenta fechar venda, o seu negócio depende 100% de
            você —{" "}
          </strong>
          <strong className={p.text.orange}>e você está esgotado. Certo?</strong>
        </p>

        <span
          aria-hidden="true"
          className={cn(
            "absolute top-[calc(100%-1px)] left-10 h-6 w-11 overflow-hidden lg:left-14 lg:h-8 lg:w-12",
            tailClassName
          )}
        >
          <span className="absolute inset-0 bg-[#fff3db] [clip-path:polygon(0_0,100%_0,39%_100%)] lg:bg-[#fffbf3]/80" />
        </span>
      </div>
    </motion.div>
  )
}

function HeroProfilePhoto({ className, imageClassName = "size-16" }: { className?: string; imageClassName?: string }) {
  return (
    <Link
      aria-label="Ir para a home em português"
      className={cn(
        "relative z-30 block w-fit shrink-0 rounded-full bg-[#ff8000] p-1.5 shadow-[0_8px_20px_rgba(255,128,0,0.25)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8000]",
        className
      )}
      href="/?lang=pt"
    >
      <div className={cn("overflow-hidden rounded-full bg-[#ff8000] ring-2 ring-white/85", imageClassName)}>
        <Image
          alt="Jonatas Ricardo"
          className="size-full object-cover"
          height={128}
          priority
          src={profileImg}
          width={128}
        />
      </div>
    </Link>
  )
}

function HeroProofIdentity({ className, layout = "mobile" }: { className?: string; layout?: "mobile" | "desktop" }) {
  const isDesktop = layout === "desktop"

  if (isDesktop) {
    return (
      <div className={cn("flex flex-col items-center text-center", className)}>
        <HeroProfilePhoto className="shadow-none" imageClassName="size-28" />

        <div className="mt-3 min-w-0">
          <h2 className="text-lg leading-tight font-bold text-[#1f1f1f]">Jonatas</h2>
          <p className="mt-1 text-sm leading-tight font-semibold text-[#5f5a53]">15 anos · Brasil + EUA</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <HeroProfilePhoto imageClassName="size-16" />

      <div className="mt-[1rem] min-w-0">
        <h2 className="text-[1.125rem] leading-tight font-bold text-[#1f1f1f]">Eu sou o Jonatas Ricardo</h2>
        <p className="mt-0.5 text-[0.95rem] leading-tight font-semibold text-[#5f5a53]">
          15 anos na internet · Brasil + EUA
        </p>
      </div>
    </div>
  )
}

function BrandLogos({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <div
      aria-label="Marcas com as quais já trabalhei"
      className={cn("flex w-full flex-row flex-nowrap items-center justify-between gap-3", className)}
      role="list"
    >
      {clientBrandLogos.map(({ name, src, containerClassName }) => (
        <div
          className={cn("flex min-w-0 flex-1 basis-0 items-center justify-center", containerClassName)}
          key={name}
          role="listitem"
        >
          <img
            alt={name}
            className={cn("h-6 max-h-10 w-full object-contain object-center sm:h-8 lg:h-9", imageClassName)}
            src={src}
          />
        </div>
      ))}
    </div>
  )
}

function IntroPreview({ layout }: { layout: "mobile" | "desktop" }) {
  const isDesktop = layout === "desktop"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.95 }}
      className={cn("relative bg-[#fdf7ed]", isDesktop ? "z-20 -mt-8" : "z-10 -mt-14")}
    >
      {isDesktop ? (
        <div className="mx-auto grid max-w-[76rem] grid-cols-[12rem_minmax(0,1fr)] items-start gap-10 px-8 pt-10 pb-14 xl:px-0">
          <HeroProofIdentity className="pt-1" layout="desktop" />

          <div className="min-w-0 space-y-6 pt-1">
            <p className="max-w-[60rem] text-[1.1rem] leading-[1.75] font-semibold text-[#5f5a53]">
              Faz mais de 15 anos que trabalho com negócios na internet no Brasil e nos Estados Unidos. Nesse caminho,
              participei de projetos para marcas como Calvin Klein, Walmart, Havaianas, Riachuelo e C&A.
            </p>

            <div className="max-w-[58rem] border-y border-[#1a1a1a]/10 py-4">
              <BrandLogos className="gap-10" imageClassName="h-8 lg:h-9" />
            </div>

            <div className="max-w-[58rem] space-y-4 text-[1rem] leading-[1.75] font-medium text-[#5f5a53]">
              <p>
                Aprendi na prática o que separa um negócio que cresce do que fica rodando no lugar. Hoje uso esse
                conhecimento para ajudar empreendedores brasileiros a vender mais com sites, aplicativos, automações e
                inteligência artificial.
              </p>
              <p className="font-bold text-[#1f1f1f]">Sem complicação, sem papo técnico. Só resultado.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-8 pt-0 pb-8 sm:px-10 sm:py-9">
          <div className="flex flex-row items-center gap-5">
            <HeroProfilePhoto className="relative z-30 -mt-2" imageClassName="size-[4.25rem]" />
            <div className="mt-3 min-w-0">
              <h2 className="text-[1.125rem] leading-tight font-bold text-[#1f1f1f]">Eu sou o Jonatas Ricardo</h2>
              <p className="mt-0.5 text-[0.8rem] leading-tight font-semibold text-[#5f5a53]">
                15 anos na internet · Brasil + EUA
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed font-medium text-[#5f5a53]">
            <p>
              Faz mais de 15 anos que trabalho com negócios na internet no Brasil e nos Estados Unidos. Já participei de
              projetos para marcas como Calvin Klein, Walmart, Havaianas, Riachuelo e C&A.
            </p>

            <div className="border-y border-[#1a1a1a]/10 py-3">
              <BrandLogos />
            </div>

            <p>
              Aprendi na prática o que separa um negócio que cresce do que fica rodando no lugar. Hoje uso esse
              conhecimento para ajudar empreendedores brasileiros a vender mais com sites, aplicativos, automações e
              inteligência artificial.
            </p>
            <p className="font-bold text-[#1f1f1f]">Sem complicação, sem papo técnico. Só resultado.</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function HeroProofCta({
  layout,
  onStartConversation,
}: {
  layout: "mobile" | "desktop"
  onStartConversation: () => void
}) {
  const isMobile = layout === "mobile"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.72 }}
      className={cn(isMobile ? "mt-5 flex justify-end" : "absolute top-[37.5rem] left-1/2 z-20")}
    >
      <div className={cn("flex flex-col", isMobile ? "items-start" : "-translate-x-1/2 items-center pt-1")}>
        <Button
          className={cn(
            "h-auto rounded-full font-semibold shadow-[0_12px_28px_rgba(255,128,0,0.30)] hover:opacity-90",
            isMobile ? "min-w-[16rem] px-6 py-3.5 text-[0.9375rem]" : "min-w-[18rem] px-14 py-5 text-xl",
            p.bg.orange,
            p.text.white
          )}
          onClick={onStartConversation}
          type="button"
        >
          Quero conversar agora
        </Button>
      </div>
    </motion.div>
  )
}

function MobileHero() {
  return (
    <div className="lg:hidden">
      <div className="relative overflow-visible bg-[#fae8c8] px-8 pt-7 pb-10 sm:px-10">
        <div className="relative w-full">
          <HeroHeadline />
          <HeroSubheadline />

          <div className="relative mt-6 min-h-[17.5rem] pb-[6rem]">
            <HeroProductShowcase className="top-[2.7rem] right-[-2.3rem] z-20 w-[16rem] opacity-95" />
            <HeroSpeechBubble className="relative z-30 max-w-[82%]" tailClassName="left-7 h-8 w-11" />
          </div>
        </div>
      </div>

      <IntroPreview layout="mobile" />
    </div>
  )
}

function FloatingMobileCta({ onStartConversation }: { onStartConversation: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.8 }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <Button
        className={cn(
          "pointer-events-auto flex h-auto w-full rounded-full px-6 py-4 text-[0.9375rem] font-semibold shadow-[0_14px_34px_rgba(255,128,0,0.38)] hover:opacity-90",
          p.bg.orange,
          p.text.white
        )}
        onClick={onStartConversation}
        type="button"
      >
        Quero conversar agora
      </Button>
    </motion.div>
  )
}

function HeroProductShowcase({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className={cn("pointer-events-none absolute z-0", className)}
    >
      <Image
        alt="Ilustração de loja digital no celular com produtos e redes sociais"
        className="h-auto w-full max-w-none object-contain drop-shadow-[0_24px_42px_rgba(1,26,36,0.16)]"
        priority
        src={heroIllustration}
      />
    </motion.div>
  )
}

function DesktopHero({ onStartConversation }: { onStartConversation: () => void }) {
  return (
    <div className="hidden lg:block">
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 overflow-hidden bg-[#fae8c8]">
          <div className="relative mx-auto min-h-[46rem] w-full max-w-[82rem] px-8 pt-12 pb-12 xl:px-0">
            <HeroProductShowcase className="top-[-2rem] right-[-4rem] w-[47rem] xl:top-[-4rem] xl:right-[-5rem] xl:w-[52rem]" />

            <div className="relative z-10 max-w-[42rem] pt-4">
              <HeroHeadline className="max-w-[41rem]" />
              <HeroSubheadline />
              <HeroSpeechBubble className="mt-16" tailClassName="lg:left-[10.5rem]" />
            </div>

            <HeroProofCta layout="desktop" onStartConversation={onStartConversation} />
          </div>
        </div>

        <IntroPreview layout="desktop" />
      </div>
    </div>
  )
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs font-semibold tracking-[0.08em] uppercase", className)}>{children}</p>
}

function SalesSections({ onStartConversation }: { onStartConversation: () => void }) {
  return (
    <ContentStack className="space-y-8">
      <ContentBlock className="border-0 bg-transparent p-0 shadow-none" delay={1.05}>
        <SectionLabel className={p.text.green}>O que eu construo</SectionLabel>
        <h2 className={cn("text-xl font-semibold", p.text.navyDark)}>
          Site, loja e automações para vender sem depender só de você
        </h2>

        <div className="grid gap-4 lg:grid-cols-3">
          {serviceCards.map(({ title, description, image }) => (
            <div
              className="group relative flex min-h-[15rem] overflow-hidden rounded-lg shadow-[0_12px_30px_rgba(1,26,36,0.14)] lg:min-h-[22rem]"
              key={title}
            >
              <img
                alt={title}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                src={image}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,26,36,0.04)_0%,rgba(1,26,36,0.42)_48%,rgba(1,26,36,0.9)_100%)]"
              />
              <div className="relative z-10 mt-auto flex flex-col gap-2 p-4 lg:p-5">
                <p className="text-base leading-snug font-bold text-white">{title}</p>
                <p className="text-sm leading-relaxed text-white/78">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentBlock>

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
          Uma conversa de 15 minutos já é suficiente para eu entender o seu caso e te mostrar o que é possível fazer.
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
      <section className="relative overflow-hidden bg-[#fdf7ed]">
        <MobileHero />
        <DesktopHero onStartConversation={handleStartConversation} />
      </section>
      <FloatingMobileCta onStartConversation={handleStartConversation} />

      <div className="mx-auto grid max-w-[76rem] items-start gap-10 px-8 pt-8 pb-10 sm:px-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:px-8 xl:px-0">
        <div className="hidden self-start lg:block" />
        <div className="min-w-0 pt-1">
          <SalesSections onStartConversation={handleStartConversation} />
          <Chat
            ref={chatRef}
            context="consultoria"
            placeholder="Oi, sou o Jonatas. Me conta sobre o seu negócio."
            whatsappFallbackUrl={whatsappUrl}
          />
        </div>
      </div>
    </div>
  )
}
