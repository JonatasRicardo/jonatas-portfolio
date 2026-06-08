"use client";

import { useId, useMemo, useState } from "react";

import { Button } from "components/base-ui/button";
import { cn } from "components/base-ui/cn";
import { Input } from "components/base-ui/input";
import { Label } from "components/base-ui/label";

import type { BookingWidgetOutput } from "app/api/chat/tools/booking";

const DEFAULT_WHATSAPP_NUMBER = "5521980484957";
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá Jonatas, vi sua página e quero conversar sobre minha presença digital.";
const DEFAULT_CAL_COM_LINK = "https://cal.com/jonatasricardo/15min";

export interface BookingWidgetProps extends BookingWidgetOutput {
  whatsappUrl?: string;
  onBookingSuccessful?: (detail: unknown) => void;
  className?: string;
}

function hasRequiredPrefill(name?: string) {
  return Boolean(name?.trim());
}

function getDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizePhone(phone: string) {
  const digits = getDigits(phone);

  if (!digits) {
    return "";
  }

  if (digits.startsWith("55")) {
    return digits;
  }

  if (digits.length <= 9) {
    return "";
  }

  return `55${digits}`;
}

function needsDdd(phone: string) {
  const digits = getDigits(phone);

  if (!digits) {
    return false;
  }

  const nationalDigits = digits.startsWith("55") ? digits.slice(2) : digits;
  return nationalDigits.length <= 9;
}

function buildBookingLink(baseLink: string, name: string, phone: string) {
  const safeBaseLink = baseLink || DEFAULT_CAL_COM_LINK;
  let url: URL;

  try {
    url = new URL(safeBaseLink);
  } catch {
    return `${DEFAULT_CAL_COM_LINK}?name=${encodeURIComponent(name)}&attendeePhoneNumber=${encodeURIComponent(
      normalizePhone(phone),
    )}`;
  }

  if (name) {
    url.searchParams.set("name", name);
  }

  if (phone) {
    const normalizedPhone = normalizePhone(phone);

    if (normalizedPhone) {
      url.searchParams.set("attendeePhoneNumber", normalizedPhone);
    }
  }

  return url.toString();
}

export function BookingWidget({
  calLink,
  reason,
  prefillName,
  prefillPhone,
  whatsappUrl,
  onBookingSuccessful,
  className,
}: BookingWidgetProps) {
  const nameId = useId();
  const phoneId = useId();

  const [attendee, setAttendee] = useState({
    name: prefillName?.trim() ?? "",
    phone: prefillPhone?.trim() ?? "",
  });
  const [resolvedPhone, setResolvedPhone] = useState(
    hasRequiredPrefill(prefillName) && !needsDdd(prefillPhone ?? "")
      ? normalizePhone(prefillPhone ?? "")
      : "",
  );
  const [dddError, setDddError] = useState("");

  const [showCalendar, setShowCalendar] = useState(
    hasRequiredPrefill(prefillName) && !needsDdd(prefillPhone ?? ""),
  );

  const resolvedCalLink = calLink || DEFAULT_CAL_COM_LINK;

  const fallbackWhatsappUrl =
    whatsappUrl ??
    `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

  const bookingLink = useMemo(
    () => buildBookingLink(resolvedCalLink, attendee.name.trim(), resolvedPhone),
    [resolvedCalLink, attendee.name, resolvedPhone],
  );

  const shouldAskForDdd = needsDdd(attendee.phone);

  if (!resolvedCalLink) {
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
            setDddError("");

            if (attendee.name.trim()) {
              const finalPhone = normalizePhone(attendee.phone);
              const finalBookingLink = buildBookingLink(resolvedCalLink, attendee.name.trim(), finalPhone);

              if (shouldAskForDdd && !finalPhone) {
                setDddError(
                  "Seu WhatsApp parece sem DDD. Envia novamente incluindo o DDD (ex.: 21) para eu seguir.",
                );
                return;
              }

              onBookingSuccessful?.({
                name: attendee.name,
                phone: finalPhone,
                calLink: finalBookingLink,
              });

              setResolvedPhone(finalPhone);
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
            <Label className="text-xs text-[#37312d]" htmlFor={phoneId}>
              WhatsApp
            </Label>
            <Input
              autoComplete="tel"
              className="border-[#011a24]/15 bg-white"
              id={phoneId}
              inputMode="tel"
              onChange={(event) => {
                setDddError("");
                setAttendee((current) => ({ ...current, phone: event.target.value }));
              }}
              placeholder="21999999999"
              type="tel"
              value={attendee.phone}
            />
          </div>

          {dddError && <p className="text-xs text-red-600">{dddError}</p>}

          <Button
            className="h-auto w-full rounded-full bg-[#ff8000] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            type="submit"
          >
            Confirmar dados e abrir agenda
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm leading-relaxed text-[#37312d]">{reason}</p>
      <p className="text-xs text-[#37312d]/60">Agendando como {attendee.name}</p>
      <Button
        asChild
        className="h-auto w-full rounded-full bg-[#ff8000] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        <a
          href={bookingLink}
          rel="noreferrer"
          target="_blank"
          onClick={(event) => {
            const finalPhone = normalizePhone(attendee.phone);

              if (attendee.phone && shouldAskForDdd && !finalPhone) {
              event.preventDefault();
              setDddError(
                "Seu WhatsApp parece sem DDD. Envia novamente incluindo o DDD (ex.: 21) para eu seguir.",
              );
              return;
            }

            onBookingSuccessful?.({
              name: attendee.name,
              phone: finalPhone,
              calLink: bookingLink,
            });
          }}
        >
          Abrir agenda do Calendário
        </a>
      </Button>
    </div>
  );
}
