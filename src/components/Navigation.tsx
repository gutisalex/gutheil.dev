"use client";

import { Download, Menu, X } from "lucide-react";
import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LinkedinIcon } from "@/components/LinkedinIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

/**
 * Scrolls a section flush below the fixed header and mirrors it in the URL.
 *
 * Nav links own their scrolling instead of relying on Next's <Link>: the
 * router treats a navigation to the hash already in the URL as a no-op, so
 * re-clicking a link (or clicking after a reload kept the hash) did nothing.
 * The header offset comes from `scroll-padding-top` on <html>, so the
 * section's top border lands exactly on the header's bottom border.
 */
function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  target.scrollIntoView({ block: "start" });

  const hash = id === "home" ? "" : `#${id}`;
  if (window.location.hash !== hash) {
    window.history.pushState(
      null,
      "",
      hash || `${window.location.pathname}${window.location.search}`,
    );
  }
}

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

type NavigationProps = {
  linkedInUrl?: string;
};

export function Navigation({ linkedInUrl }: NavigationProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // The drawer only exists below `md`; close it if the viewport grows past it.
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleAnchorClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!isPlainLeftClick(event)) {
        return;
      }

      event.preventDefault();
      setIsMenuOpen(false);
      scrollToSection(id);
    },
    [],
  );

  const opacity = Math.min(scrollY / 80, 1);
  const isScrolled = opacity > 0;
  const backgroundOpacity = isMenuOpen ? 0.92 : opacity * 0.92;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[border-color,box-shadow] duration-300",
          (isScrolled || isMenuOpen) &&
            "border-b border-border/60 shadow-premium backdrop-blur-xl",
        )}
      >
        <div
          className="absolute inset-0 bg-background/80"
          style={{ opacity: backgroundOpacity }}
        />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex h-(--site-header-height) max-w-6xl items-center justify-between">
            {/* biome-ignore lint/a11y/useValidAnchor: in-page anchor; onClick only smooths the scroll and syncs the hash */}
            <a
              href="#home"
              className="font-sans text-base font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 sm:text-lg"
              onClick={(event) => handleAnchorClick(event, "home")}
              aria-label="gutheil.dev - home"
            >
              gutheil<span className="text-primary">.dev</span>
            </a>

            <div className="hidden md:flex md:items-center">
              <NavigationMenu aria-label="Main navigation">
                <NavigationMenuList className="gap-0.5">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <NavigationMenuItem key={item.id}>
                        <NavigationMenuLink
                          href={item.href}
                          active={isActive}
                          onClick={(event) => handleAnchorClick(event, item.id)}
                          className="relative bg-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-transparent hover:text-foreground focus:bg-transparent focus-visible:text-foreground data-active:bg-transparent data-active:text-foreground data-active:hover:bg-transparent data-active:focus:bg-transparent"
                        >
                          {item.label}
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-3 -bottom-px h-px bg-primary"
                            />
                          )}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
              <div className="ml-3 border-l border-border/60 pl-3">
                <ThemeToggle />
              </div>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/*
        Mobile navigation: a side drawer that slides in beneath the fixed
        header and takes ~75% of the viewport width. `trap-focus` keeps
        keyboard focus inside without locking page scroll, so a tapped link
        can start scrolling while the drawer slides away. Pointer dismissal
        is handled by the backdrop's onClick so the header controls keep
        working while the drawer is open.
      */}
      <Drawer
        open={isMenuOpen}
        onOpenChange={(open) => setIsMenuOpen(open)}
        modal="trap-focus"
        swipeDirection="right"
        disablePointerDismissal
      >
        <DrawerContent
          className="border-l border-border/60 bg-background text-base text-foreground shadow-premium-lg [--drawer-bleed-background:var(--background)] md:hidden"
          style={
            {
              top: "var(--site-header-height)",
              height: "auto",
              "--drawer-content-width": "75vw",
            } as CSSProperties
          }
          overlayProps={{
            className:
              "top-(--site-header-height) min-h-0 touch-none bg-foreground/15 backdrop-blur-[2px] md:hidden dark:bg-black/50",
            onClick: () => setIsMenuOpen(false),
          }}
        >
          <DrawerTitle className="sr-only">Site navigation</DrawerTitle>

          <nav
            aria-label="Mobile navigation"
            className="flex min-h-0 flex-1 flex-col"
          >
            <ul className="flex flex-col px-6 pt-8">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <li
                    key={item.id}
                    className="translate-x-0 opacity-100 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-starting-style/drawer-popup:translate-x-6 group-data-starting-style/drawer-popup:opacity-0 motion-reduce:transition-none"
                    style={{ transitionDelay: `${90 + index * 45}ms` }}
                  >
                    <a
                      href={item.href}
                      onClick={(event) => handleAnchorClick(event, item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group/link flex items-center gap-4 py-3.5 text-[1.75rem] font-semibold leading-none tracking-[-0.02em] transition-colors duration-200",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground active:text-foreground",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-6 w-0.5 shrink-0 bg-primary transition-[opacity,scale] duration-300",
                          isActive
                            ? "scale-y-100 opacity-100"
                            : "scale-y-50 opacity-0 group-hover/link:scale-y-100 group-hover/link:opacity-40",
                        )}
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto border-t border-border/60 px-6 py-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
                <a
                  href="/api/resume/download"
                  download="Alexander_Gutheil_CV.pdf"
                  className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download CV
                </a>
                {linkedInUrl && (
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
                  >
                    <LinkedinIcon className="size-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </nav>

          <DrawerClose className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:right-6 focus-visible:bottom-6 focus-visible:z-10 focus-visible:rounded-none focus-visible:bg-foreground focus-visible:px-3 focus-visible:py-2 focus-visible:text-xs focus-visible:font-medium focus-visible:text-background focus-visible:outline-none">
            Close menu
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
}
