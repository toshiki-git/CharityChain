"use client";
import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  //スマホのヘッダー
  const menuItems = [
    { name: "おすすめ", path: "/products" },
    { name: "マイリスト", path: "/products" },
    { name: "おもちゃ・ホビー・グッズ", path: "/products" },
    { name: "メンズ", path: "/products" },
    { name: "レディース", path: "/products" },
    { name: "ベビー・キッズ", path: "/products" },
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="/products">
            おすすめ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/products">
            マイリスト
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/products">
            おもちゃ・ホビー・グッズ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/products">
            メンズ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/products">
            レディース
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/products">
            ベビー・キッズ
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link color={"foreground"} href={item.path} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
