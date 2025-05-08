import type { HeaderLink } from "@/components/organisms/types/header-types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderNavigationMenuProps {
  headerLinks: HeaderLink[];
}

export function HeaderNavigationMenu({
  headerLinks,
}: HeaderNavigationMenuProps) {
  return (
    <NavigationMenu className="flex items-center justify-center gap-1">
      <NavigationMenuList className="h-full">
        {headerLinks.map((headerLink) => {
          if (!headerLink.content)
            return (
              <NavigationMenuItem key={headerLink.href}>
                <NavigationMenuLink href={headerLink.href}>
                  {headerLink.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );

          return (
            <NavigationMenuItem
              key={headerLink.href}
              className="flex items-center"
            >
              <NavigationMenuLink href={headerLink.href}>
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
