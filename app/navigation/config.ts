export type NavigationItem = {
  id: string;
  labelKey: string;
  href: string;
  enabled: boolean;
  cta?: boolean;
  children?: NavigationItem[];
};

export const navigationItems: NavigationItem[] = [
  {
    id: "home",
    labelKey: "navigation.home",
    href: "/",
    enabled: true,
  },
  {
    id: "about",
    labelKey: "navigation.about",
    href: "/about",
    enabled: true,
    children: [
      {
        id: "history",
        labelKey: "navigation.history",
        href: "/about/history",
        enabled: true,
      },
      {
        id: "gallery",
        labelKey: "navigation.gallery",
        href: "/about/gallery",
        enabled: true,
      },
    ],
  },
  {
    id: "events",
    labelKey: "navigation.events",
    href: "/events",
    enabled: false,
    children: [
      {
        id: "weddings",
        labelKey: "navigation.weddings",
        href: "/events/weddings",
        enabled: true,
      },
      {
        id: "corporate",
        labelKey: "navigation.corporateEvents",
        href: "/events/corporate",
        enabled: true,
      },
    ],
  },
  {
    id: "accommodation",
    labelKey: "navigation.accommodation",
    href: "/accommodation",
    enabled: true,
    children: [
      {
        id: "boutique-stay",
        labelKey: "navigation.boutiqueStay",
        href: "/accommodation/boutique-stay",
        enabled: false,
      },
      {
        id: "healing-retreat",
        labelKey: "navigation.healingRetreat",
        href: "/accommodation/healing-retreat",
        enabled: false,
      },
    ],
  },
  {
    id: "experiences",
    labelKey: "navigation.experiences",
    href: "/experiences",
    enabled: true,
    children: [
      {
        id: "tea-room",
        labelKey: "navigation.teaRoom",
        href: "/experiences/tea-room",
        enabled: true,
      },
      {
        id: "private-dining",
        labelKey: "navigation.privateDining",
        href: "/experiences/private-dining",
        enabled: true,
      },
    ],
  },
  {
    id: "international-programs",
    labelKey: "navigation.internationalPrograms",
    href: "/international-programs",
    enabled: true,
  },
  {
    id: "membership",
    labelKey: "navigation.membership",
    href: "/membership",
    enabled: false,
  },
  {
    id: "contact",
    labelKey: "navigation.contact",
    href: "/contact",
    enabled: true,
    cta: true,
  },
];

export const visibleNavigationItems = () =>
  navigationItems
    .filter((item) => item.enabled)
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => child.enabled),
    }));
