import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import Container from "@/components/custom/Container";

export default function Navbar() {
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden md:flex">
            <DesktopNav />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <AuthButtons isLoggedIn={isLoggedIn} />
            </div>

            <MobileNav isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </Container>
    </header>
  );
}
