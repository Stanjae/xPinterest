import MainNavBar from "../Ui/Navigation/MainNavBar";


export default function ProtectedRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main>
        <MainNavBar/>
        <div className=" pt-20">
          {children}
        </div>
      </main>
    );
  }
  