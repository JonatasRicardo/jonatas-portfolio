import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultoria Web | Jonatas Ricardo",
  description:
    "Consultoria web para pequenas e médias empresas venderem mais pela internet com site, link na bio e presença digital.",
};

export default function ConsultoriaWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
