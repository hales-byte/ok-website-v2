/**
 * Sabit WhatsApp düğmesi — sade, pop-up'sız (iframe'deki gibi, G6).
 * Tüm sayfalarda sağ altta; erişilebilir etiketli.
 */
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/905529185864?text=Merhaba%2C%20Objektif%20Kriter%20web%20sitesi%20%C3%BCzerinden%20yaz%C4%B1yorum.%20Reklam%20konusunda%20bilgi%20almak%20istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
