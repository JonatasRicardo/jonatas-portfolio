"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

import { Button } from "components/base-ui/button";
import { cn } from "components/base-ui/cn";

import type { BookingWidgetOutput } from "app/api/chat/tools/booking";

const DEFAULT_WHATSAPP_NUMBER = "5521980484957";
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá Jonatas, vi sua página e quero conversar sobre minha presença digital.";

export interface BookingWidgetProps extends BookingWidgetOutput {
  whatsappUrl?: string;
  onBookingSuccessful?: (detail: unknown) => void;
  className?: string;
}

export function BookingWidget({
  calLink,
  reason,
  prefillName,
  prefillEmail,
  whatsappUrl,
  onBookingSuccessful,
  className,
}: BookingWidgetProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const fallbackWhatsappUrl =
    whatsappUrl ??
    `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    if (!calLink) {
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
  }, [calLink, onBookingSuccessful]);

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

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm leading-relaxed text-[#37312d]">{reason}</p>
      <div className="max-h-[28rem] overflow-y-auto rounded-xl border border-[#011a24]/10 bg-[#fdf7ed]">
        <Cal
          calLink={calLink}
          config={{
            layout: "month_view",
            theme: "light",
            ...(prefillName ? { name: prefillName } : {}),
            ...(prefillEmail ? { email: prefillEmail } : {}),
          }}
          namespace="consultoria-chat"
          style={{ width: "100%", height: "420px", overflow: "auto" }}
        />
      </div>
    </div>
  );
}
