import LoginForm from '@/app/Ui/authForms/LoginForm'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React from 'react'



//#039be5

const FacebookIcon =(style:any)=>{ 
    return (<svg className={'h-6 w-6'} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 48 48">
<path fill="#0074E8" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
</svg>)
}

const LoginPage = async() => {
    const { isAuthenticated } = getKindeServerSession();
    const getAuthStatus = await isAuthenticated()

    if(getAuthStatus){
        redirect("/watch")
    }
  return (
    <section>
        <div className=' mt-5 mx-auto max-w-md p-4'>
            <LoginForm/>
        </div>
      
    </section>
  )
}

export default LoginPage
