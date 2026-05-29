"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useId, useMemo, useState } from "react";

import { Button } from "components/base-ui/button";
import { cn } from "components/base-ui/cn";
import { Input } from "components/base-ui/input";
import { Label } from "components/base-ui/label";

import type { BookingWidgetOutput } from "app/api/chat/tools/booking";

const DEFAULT_WHATSAPP_NUMBER = "5521980484957";
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá Jonatas, vi sua página e quero conversar sobre minha presença digital.";

export interface BookingWidgetProps extends BookingWidgetOutput {
  whatsappUrl?: string;
  onBookingSuccessful?: (detail: unknown) => void;
  className?: string;
}

function hasRequiredPrefill(name?: string, email?: string) {
  return Boolean(name?.trim() && email?.trim());
}

export function BookingWidget({
  calLink,
  reason,
  prefillName,
  prefillEmail,
  prefillPhone,
  prefillNotes,
  whatsappUrl,
  onBookingSuccessful,
  className,
}: BookingWidgetProps) {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [attendee, setAttendee] = useState({
    name: prefillName?.trim() ?? "",
    email: prefillEmail?.trim() ?? "",
    phone: prefillPhone?.trim() ?? "",
  });
  const [showCalendar, setShowCalendar] = useState(
    hasRequiredPrefill(prefillName, prefillEmail),
  );

  const fallbackWhatsappUrl =
    whatsappUrl ??
    `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

  const calConfig = useMemo(() => {
    const notesParts = [
      prefillNotes,
      attendee.phone ? `WhatsApp: ${attendee.phone}` : undefined,
    ].filter(Boolean);

    return {
      layout: "month_view" as const,
      theme: "light" as const,
      name: attendee.name,
      email: attendee.email,
      ...(notesParts.length > 0 ? { notes: notesParts.join("\n") } : {}),
    };
  }, [attendee.email, attendee.name, attendee.phone, prefillNotes]);

  useEffect(() => {
    if (!calLink || !showCalendar) {
      return;
    }

    void (async () => {
      const cal = await getCalApi({ namespace: "consultoria-chat" });
      cal("on", {
        action: "bookingSuccessful",
        callback: (event: { detail?: unknown }) => {
          setIsConfirmed(true);
          onBookingSuccessful?.(event.detail);
        },
      });
    })();
  }, [calLink, onBookingSuccessful, showCalendar]);

  if (isConfirmed) {
    return (
      <div className={cn("space-y-2", className)}>
        <p className="text-sm font-semibold text-[#011a24]">Agendamento confirmado!</p>
        <p className="text-sm leading-relaxed text-[#37312d]/80">
          Você receberá um e-mail com os detalhes. Até lá!
        </p>
      </div>
    );
  }

  if (!calLink) {
    return (
      <div className={cn("space-y-3", className)}>
        <p className="text-sm leading-relaxed text-[#37312d]">{reason}</p>
        <p className="text-sm text-[#37312d]/70">
          O calendário online ainda não está configurado. Enquanto isso, fale comigo pelo WhatsApp:
        </p>
        <Button
          asChild
          className="h-auto rounded-full bg-[#ff8000] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          <a href={fallbackWhatsappUrl} rel="noreferrer" target="_blank">
            Conversar no WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  if (!showCalendar) {
    return (
      <div className={cn("space-y-4", className)}>
        <p className="text-sm leading-relaxed text-[#37312d]">{reason}</p>
        <p className="text-sm text-[#37312d]/70">
          Antes de escolher o horário, me confirma seus dados:
        </p>

        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (hasRequiredPrefill(attendee.name, attendee.email)) {
              setShowCalendar(true);
            }
          }}
        >
          <div className="space-y-1.5">
            <Label className="text-xs text-[#37312d]" htmlFor={nameId}>
              Nome
            </Label>
            <Input
              autoComplete="name"
              className="border-[#011a24]/15 bg-white"
              id={nameId}
              onChange={(event) => setAttendee((current) => ({ ...current, name: event.target.value }))}
              placeholder="Seu nome"
              required
              value={attendee.name}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-[#37312d]" htmlFor={emailId}>
              E-mail
            </Label>
            <Input
              autoComplete="email"
              className="border-[#011a24]/15 bg-white"
              id={emailId}
              inputMode="email"
              onChange={(event) => setAttendee((current) => ({ ...current, email: event.target.value }))}
              placeholder="seu@email.com"
              required
              type="email"
              value={attendee.email}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-[#37312d]" htmlFor={phoneId}>
              WhatsApp (opcional)
            </Label>
            <Input
              autoComplete="tel"
              className="border-[#011a24]/15 bg-white"
              id={phoneId}
              inputMode="tel"
              onChange={(event) => setAttendee((current) => ({ ...current, phone: event.target.value }))}
              placeholder="(21) 99999-9999"
              type="tel"
              value={attendee.phone}
            />
          </div>

          <Button
            className="h-auto w-full rounded-full bg-[#ff8000] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            type="submit"
          >
            Ver horários disponíveis
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm leading-relaxed text-[#37312d]">{reason}</p>
      <p className="text-xs text-[#37312d]/60">
        Agendando como {attendee.name} ({attendee.email})
      </p>
      <div className="max-h-[28rem] overflow-y-auto rounded-xl border border-[#011a24]/10 bg-[#fdf7ed]">
        <Cal
          calLink={calLink}
          config={calConfig}
          key={`${attendee.name}-${attendee.email}-${attendee.phone}`}
          namespace="consultoria-chat"
          style={{ width: "100%", height: "420px", overflow: "auto" }}
        />
      </div>
    </div>
  );
}
