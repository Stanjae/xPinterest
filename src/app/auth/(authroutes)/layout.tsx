import AuthNav from "@/app/Ui/Navigation/AuthNav";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <main>
        <AuthNav/>
        {children}
     </main>
    );
  }
  