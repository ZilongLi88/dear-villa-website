"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { LANGUAGE_STORAGE_KEY } from "../i18n/client";
import {
  type NavigationItem,
  visibleNavigationItems,
} from "../navigation/config";
import { Homepage } from "./Homepage";

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

  return (
    <nav className="desktop-navigation" aria-label={t("navigation.primary")}>
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
                <Link
                  href={item.href}
                  className={`${active ? "is-active" : ""} ${item.cta ? "contact-link" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onFocus={() => hasChildren && setOpenDropdown(item.id)}
                >
                  {t(item.labelKey)}
                </Link>
                {hasChildren && (
                  <button
                    type="button"
                    className="dropdown-toggle"
                    aria-label={t("navigation.expandSection", {
                      section: t(item.labelKey),
                    })}
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.id)}
                  >
                    <span aria-hidden="true">⌄</span>
                  </button>
                )}
              </div>
              {hasChildren && (
                <ul className="dropdown-menu" hidden={!isOpen}>
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

  const toggleGroup = (id: string) => {
    setExpandedGroups((groups) =>
      groups.includes(id)
        ? groups.filter((group) => group !== id)
        : [...groups, id],
    );
  };

  return (
    <div className="mobile-panel" hidden={!isOpen}>
      <div className="mobile-panel-header">
        <span className="mobile-wordmark">Dear Villa</span>
        <button
          type="button"
          className="mobile-close"
          aria-label={t("navigation.closeMenu")}
          onClick={onClose}
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
                  <Link
                    href={item.href}
                    className={`${active ? "is-active" : ""} ${item.cta ? "contact-link" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                  >
                    {t(item.labelKey)}
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      aria-label={t("navigation.expandSection", {
                        section: t(item.labelKey),
                      })}
                      aria-expanded={expanded}
                      onClick={() => toggleGroup(item.id)}
                    >
                      <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>
                  )}
                </div>
                {hasChildren && (
                  <ul className="mobile-submenu" hidden={!expanded}>
                    {item.children?.map((child) => {
                      const childActive = isActiveRoute(pathname, child.href);
                      return (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className={childActive ? "is-active" : undefined}
                            aria-current={childActive ? "page" : undefined}
                            onClick={onClose}
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
  const items = useMemo(() => visibleNavigationItems(), []);
  const isHomepage = pathname === "/";

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
      <header
        className={`site-header ${isHomepage ? "site-header-home" : ""} ${headerScrolled ? "site-header-scrolled" : ""}`}
      >
        <Link href="/" className="wordmark" aria-label="Dear Villa home">
          <span>Dear Villa</span>
          <small>Estate</small>
        </Link>
        <DesktopNavigation items={items} pathname={pathname} />
        <div className="header-actions">
          <LanguageSwitch />
          <button
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
        onClose={() => setMobileOpen(false)}
      />

      {isHomepage ? (
        <Homepage />
      ) : (
        <main className="structure-preview">
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
