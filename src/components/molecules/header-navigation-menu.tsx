import type { HeaderLink } from "@/components/organisms/types/header-types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";

interface HeaderNavigationMenuProps {
  headerLinks: HeaderLink[];
  url: string;
}

export function HeaderNavigationMenu({
  headerLinks,
  url,
}: HeaderNavigationMenuProps) {
  // Url
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    function handleUrlChange() {
      const newUrl = window.location.pathname;
      setCurrentUrl(newUrl);
    }

    document.addEventListener("astro:after-swap", handleUrlChange);

    return () =>
      document.removeEventListener("astro:after-swap", handleUrlChange);
  }, []);

  return (
    <NavigationMenu className="flex items-center justify-center gap-1">
      <NavigationMenuList className="h-full">
        {headerLinks.map((headerLink) => {
          if (!headerLink.content)
            return (
              <NavigationMenuItem key={headerLink.href}>
                <NavigationMenuLink
                  href={headerLink.href}
                  data-active={headerLink.href === currentUrl}
                >
                  {headerLink.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );

          return (
            <NavigationMenuItem
              key={headerLink.href}
              className="flex items-center"
            >
              <NavigationMenuLink
                href={headerLink.href}
                data-active={headerLink.href === currentUrl}
              >
                {headerLink.title}
              </NavigationMenuLink>
              <NavigationMenuTrigger className="bg-transparent px-2" />
              <NavigationMenuContent
                forceMount
                className="data-[state=closed]:hidden"
                onClick={(event) => {
                  (event.currentTarget as HTMLElement).setAttribute(
                    "data-state",
                    "closed",
                  );
                }}
              >
                <div
                  className="prose prose-ul:list-none prose-ul:ps-2 prose-a:no-underline prose-sm dark:prose-invert max-h-[calc(var(--spacing-main-h)_-_var(--spacing)_*_24)] w-80 overflow-y-auto md:w-132"
                  dangerouslySetInnerHTML={{ __html: headerLink.content }}
                ></div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
