import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MainNavBar from "../Ui/Navigation/MainNavBar";
import { createProfileIfNotExists } from "../lib/userActions";


export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    
    const createProfile = await createProfileIfNotExists(user);
    return (
      <main>
        <MainNavBar/>
        <div className=" mt-40 md:mt-20">
        {children}
        </div>
      </main> //   </main>
    );
  }
  