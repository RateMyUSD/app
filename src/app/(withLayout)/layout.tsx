import Footer from '@/components/footer';
import Header from '@/components/header';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container flex-1 py-2">{children}</main>
      <Footer />
    </div>
  );
}
