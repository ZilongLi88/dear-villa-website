"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { LANGUAGE_STORAGE_KEY } from "../i18n/client";
import {
  type NavigationItem,
  visibleNavigationItems,
} from "../navigation/config";
import { AboutPage } from "./AboutPage";
import { AccommodationPage } from "./AccommodationPage";
import { Homepage } from "./Homepage";
import { InternationalProgramsPage } from "./InternationalProgramsPage";
import { ContactPage } from "./ContactPage";
import { TeaRoomPage } from "./TeaRoomPage";
import { PrivateDiningPage } from "./PrivateDiningPage";

const isActiveRoute = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

function LanguageSwitch() {
  const { t } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? "en";

  const changeLanguage = (language: "en" | "zh-CN") => {
    void i18n.changeLanguage(language);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  };

  return (
    <div className="language-switch" aria-label={t("language.label")}>
      <button
        type="button"
        className={activeLanguage === "en" ? "is-active" : undefined}
        aria-pressed={activeLanguage === "en"}
        onClick={() => changeLanguage("en")}
      >
        {t("language.english")}
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        className={activeLanguage === "zh-CN" ? "is-active" : undefined}
        aria-pressed={activeLanguage === "zh-CN"}
        onClick={() => changeLanguage("zh-CN")}
      >
        {t("language.chinese")}
      </button>
    </div>
  );
}

function DesktopNavigation({
  items,
  pathname,
}: {
  items: NavigationItem[];
  pathname: string;
}) {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  return (
    <nav
      className="desktop-navigation"
      aria-label={t("navigation.primary")}
      onKeyDown={(event) => {
        if (event.key === "Escape" && openDropdown) {
          event.preventDefault();
          triggerRefs.current[openDropdown]?.focus();
          setOpenDropdown(null);
        }
      }}
    >
      <ul>
        {items.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const isOpen = openDropdown === item.id;
          const active = isActiveRoute(pathname, item.href);

          return (
            <li
              key={item.id}
              className={hasChildren ? "has-dropdown" : undefined}
              onMouseEnter={() => hasChildren && setOpenDropdown(item.id)}
              onMouseLeave={() => hasChildren && setOpenDropdown(null)}
            >
              <div className="desktop-link-row">
                {hasChildren ? (
                  <button
                    ref={(element) => { triggerRefs.current[item.id] = element; }}
                    type="button"
                    className={`menu-trigger ${active ? "is-active" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-desktop-menu`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.id)}
                    onFocus={() => setOpenDropdown(item.id)}
                  >
                    <span>{t(item.labelKey)}</span><span aria-hidden="true">⌄</span>
                  </button>
                ) : (
                  <Link href={item.href} className={`${active ? "is-active" : ""} ${item.cta ? "contact-link" : ""}`} aria-current={active ? "page" : undefined}>
                    {t(item.labelKey)}
                  </Link>
                )}
              </div>
              {hasChildren && (
                <ul id={`${item.id}-desktop-menu`} className="dropdown-menu" hidden={!isOpen}>
                  {item.children?.map((child) => {
                    const childActive = isActiveRoute(pathname, child.href);
                    return (
                      <li key={child.id}>
                        <Link
                          href={child.href}
                          aria-current={childActive ? "page" : undefined}
                          className={childActive ? "is-active" : undefined}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {t(child.labelKey)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileNavigation({
  items,
  pathname,
  isOpen,
  onClose,
}: {
  items: NavigationItem[];
  pathname: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setExpandedGroups([]);
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel?.addEventListener("keydown", handleKeyDown);
    return () => panel?.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleGroup = (id: string) => {
    setExpandedGroups((groups) =>
      groups.includes(id)
        ? groups.filter((group) => group !== id)
        : [...groups, id],
    );
  };

  const resetAndClose = () => {
    setExpandedGroups([]);
    onClose();
  };

  return (
    <div className="mobile-panel" hidden={!isOpen} ref={panelRef}>
      <div className="mobile-panel-header">
        <span className="mobile-wordmark">Dear Villa</span>
        <button
          type="button"
          className="mobile-close"
          aria-label={t("navigation.closeMenu")}
          onClick={resetAndClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav aria-label={t("navigation.mobile")}>
        <ul className="mobile-navigation-list">
          {items.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const expanded = expandedGroups.includes(item.id);
            const active = isActiveRoute(pathname, item.href);
            return (
              <li key={item.id}>
                <div className="mobile-link-row">
                  {hasChildren ? (
                    <button
                      type="button"
                      className={`mobile-menu-trigger ${active ? "is-active" : ""}`}
                      aria-expanded={expanded}
                      aria-controls={`${item.id}-mobile-menu`}
                      onClick={() => toggleGroup(item.id)}
                    >
                      <span>{t(item.labelKey)}</span><span aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>
                  ) : (
                    <Link href={item.href} className={`${active ? "is-active" : ""} ${item.cta ? "contact-link" : ""}`} aria-current={active ? "page" : undefined} onClick={resetAndClose}>
                      {t(item.labelKey)}
                    </Link>
                  )}
                </div>
                {hasChildren && (
                  <ul id={`${item.id}-mobile-menu`} className="mobile-submenu" hidden={!expanded}>
                    {item.children?.map((child) => {
                      const childActive = isActiveRoute(pathname, child.href);
                      return (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className={childActive ? "is-active" : undefined}
                            aria-current={childActive ? "page" : undefined}
                            onClick={resetAndClose}
                          >
                            {t(child.labelKey)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <LanguageSwitch />
    </div>
  );
}

export function SiteShell() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const items = useMemo(() => visibleNavigationItems(), []);
  const isHomepage = pathname === "/";
  const closeMobileNavigation = useCallback(() => {
    setMobileOpen(false);
    window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === "en" || savedLanguage === "zh-CN") {
      void i18n.changeLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHomepage) {
      return;
    }

    const updateHeader = () => setHeaderScrolled(window.scrollY > 48);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [isHomepage]);

  return (
    <div className={`site-shell ${isHomepage ? "site-shell-home" : ""}`}>
      <a className="skip-link" href="#main-content">
        {t("navigation.skipToContent")}
      </a>
      <header
        className={`site-header ${isHomepage ? "site-header-home" : ""} ${headerScrolled ? "site-header-scrolled" : ""}`}
      >
        <Link href="/" className="wordmark" aria-label={t("navigation.homeLabel")}>
          <span>Dear Villa</span>
          <small>Estate</small>
        </Link>
        <div className="mobile-header-language">
          <LanguageSwitch />
        </div>
        <DesktopNavigation items={items} pathname={pathname} />
        <div className="header-actions">
          <LanguageSwitch />
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            aria-label={t("navigation.openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileNavigation
        items={items}
        pathname={pathname}
        isOpen={mobileOpen}
        onClose={closeMobileNavigation}
      />

      {isHomepage ? (
        <Homepage />
      ) : pathname === "/about" ? (
        <AboutPage />
      ) : pathname === "/accommodation" ? (
        <AccommodationPage />
      ) : pathname === "/experiences/tea-room" ? (
        <TeaRoomPage />
      ) : pathname === "/experiences/private-dining" ? (
        <PrivateDiningPage />
      ) : pathname === "/international-programs" ? (
        <InternationalProgramsPage />
      ) : pathname === "/contact" ? (
        <ContactPage />
      ) : (
        <main className="structure-preview" id="main-content">
          <div className="structure-card">
            <p className="section-eyebrow">{t("shell.eyebrow")}</p>
            <h1>{t("shell.title")}</h1>
            <p>{t("shell.intro")}</p>
            <div className="route-indicator">
              <span>{t("shell.currentRoute")}</span>
              <code>{pathname}</code>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
