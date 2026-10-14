import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  Copy,
  Download,
  Languages,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { navItems } from "@/data/navigation";
import { locale, setLocale, t } from "@/i18n";
import { useScrollLock } from "@/hooks/useScrollLock";
import { isDevMode, toggleDevMode } from "@/lib/devMode";
import { showToast } from "@/lib/toast";
import { cn, publicUrl, scrollToId } from "@/lib/utils";

const OPEN_EVENT = "command-palette:open";

/** Opens the palette from anywhere (e.g. the navbar button). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function isMacLike() {
  return (
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.platform)
  );
}

type Group = "navigate" | "actions" | "secret";

interface Command {
  id: string;
  group: Group;
  label: string;
  icon: ReactNode;
  /** Extra search terms (both languages, no diacritics needed). */
  keywords?: string[];
  /** Hidden commands only appear once the query names them. */
  hidden?: boolean;
  run: () => void;
}

/** Lowercase and strip Vietnamese diacritics so "ky nang" finds "Kỹ năng". */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function matches(command: Command, query: string) {
  const terms = [command.label, ...(command.keywords ?? [])].map(normalize);
  if (command.hidden)
    return (
      query.length >= 3 &&
      terms.some((term) => term.startsWith(query) || query.startsWith(term))
    );
  return !query || terms.some((term) => term.includes(query));
}

function buildCommands(): Command[] {
  const iconClass = "h-4 w-4";
  const { email } = siteConfig.contact;
  const commands: (Command | false | null | "")[] = [
    ...navItems.map<Command>((item) => ({
      id: `go-${item.id}`,
      group: "navigate",
      label: t.command.goTo(item.label),
      icon: <ArrowRight className={iconClass} aria-hidden="true" />,
      keywords: [item.id],
      run: () => scrollToId(item.id),
    })),
    siteConfig.cvPath && {
      id: "cv",
      group: "actions",
      label: t.command.downloadCv,
      icon: <Download className={iconClass} aria-hidden="true" />,
      keywords: ["cv", "resume", "pdf"],
      run: () => {
        const link = document.createElement("a");
        link.href = publicUrl(siteConfig.cvPath!);
        link.download = "";
        link.click();
      },
    },
    email && {
      id: "email",
      group: "actions",
      label: t.command.copyEmail,
      icon: <Copy className={iconClass} aria-hidden="true" />,
      keywords: ["email", "mail", "contact", "lien he"],
      run: () => {
        navigator.clipboard
          ?.writeText(email)
          .then(() => showToast(t.toast.emailCopied))
          .catch(() => {
            // Clipboard can be unavailable; the Contact section still has the mailto link.
          });
      },
    },
    {
      id: "language",
      group: "actions",
      label: t.command.switchLanguage,
      icon: <Languages className={iconClass} aria-hidden="true" />,
      keywords: ["language", "ngon ngu", "english", "tieng viet", "en", "vi"],
      run: () => setLocale(locale === "en" ? "vi" : "en"),
    },
    {
      id: "dev-mode",
      group: "secret",
      label: isDevMode() ? t.command.devModeOff : t.command.devModeOn,
      icon: <Terminal className={iconClass} aria-hidden="true" />,
      keywords: ["dev mode", "konami", "cheat", "matrix"],
      hidden: true,
      run: () =>
        showToast(toggleDevMode() ? t.toast.devModeOn : t.toast.devModeOff),
    },
    {
      id: "sudo-hire",
      group: "secret",
      label: t.command.sudoHire,
      icon: <Sparkles className={iconClass} aria-hidden="true" />,
      keywords: ["sudo", "hire", "hire me", "tuyen dung"],
      hidden: true,
      run: () => {
        scrollToId("contact");
        showToast(t.toast.hired);
      },
    },
  ];
  return commands.filter((command): command is Command => Boolean(command));
}

/**
 * ⌘K / Ctrl+K / "/" launcher: jump to sections, download the CV, copy the
 * email, switch language — plus a couple of hidden commands. Built on the
 * native <dialog> (focus trap, Escape and inert background for free) with the
 * ARIA combobox + listbox pattern for the results.
 */
export function CommandPalette() {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  useScrollLock(open);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (event: globalThis.KeyboardEvent) => {
      const typing = (event.target as HTMLElement | null)?.closest(
        'input, textarea, [contenteditable="true"]',
      );
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (
        event.key === "/" &&
        !typing &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Escape (and any other native close) syncs back into state.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => setOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const commands = useMemo(() => {
    const q = normalize(query);
    return open ? buildCommands().filter((command) => matches(command, q)) : [];
  }, [open, query]);

  const run = (command: Command) => {
    setOpen(false);
    // Let the dialog close and the scroll lock lift before scrolling or toasting.
    requestAnimationFrame(() => requestAnimationFrame(command.run));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (commands.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((index) => (index + step + commands.length) % commands.length);
    } else if (event.key === "Enter" && commands[active]) {
      event.preventDefault();
      run(commands[active]);
    }
  };

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) setOpen(false);
  };

  const activeId = commands[active]
    ? `command-${commands[active].id}`
    : undefined;
  let lastGroup: Group | null = null;

  return (
    <dialog
      ref={ref}
      aria-label={t.command.title}
      onClick={onBackdropClick}
      className="command-dialog mx-auto mt-[12vh] w-[calc(100vw-1.5rem)] max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-0 text-ink-200 shadow-2xl shadow-black/60 backdrop:bg-transparent"
    >
      {open && (
        <div>
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
            <Search
              className="h-4 w-4 shrink-0 text-ink-400"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t.command.placeholder}
              role="combobox"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              autoComplete="off"
              spellCheck={false}
              className="h-14 w-full bg-transparent text-base text-white placeholder:text-ink-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-400 sm:block">
              Esc
            </kbd>
          </div>

          <ul
            id="command-list"
            role="listbox"
            aria-label={t.command.title}
            className="max-h-[min(22rem,55vh)] overflow-y-auto p-2"
          >
            {commands.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-ink-400">
                {t.command.empty}
              </li>
            )}
            {commands.map((command, index) => {
              const heading =
                command.group !== lastGroup
                  ? t.command.groups[command.group]
                  : null;
              lastGroup = command.group;
              const selected = index === active;
              return (
                <li key={command.id} role="presentation">
                  {heading && (
                    <p
                      role="presentation"
                      className="eyebrow px-3 pb-1.5 pt-3 text-ink-500"
                    >
                      {heading}
                    </p>
                  )}
                  <div
                    id={`command-${command.id}`}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => setActive(index)}
                    onClick={() => run(command)}
                    className={cn(
                      "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                      selected ? "bg-white/[0.07] text-white" : "text-ink-300",
                      command.group === "secret" && "font-mono",
                    )}
                  >
                    <span
                      className={cn(
                        "text-ink-400",
                        selected && "text-accent-400",
                      )}
                    >
                      {command.icon}
                    </span>
                    <span className="flex-1">{command.label}</span>
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="font-mono text-[0.7rem] text-ink-500"
                      >
                        ↵
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] px-4 py-2.5 text-[0.7rem] text-ink-500">
            <span>{t.command.footer}</span>
          </div>
        </div>
      )}
    </dialog>
  );
}
