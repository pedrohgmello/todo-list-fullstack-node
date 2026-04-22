import LoginForm from "@/components/login-form";
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";


export default function LoginPage(){
    

    return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Digite seu email e senha para fazer login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>    
    </>
  );
    
}