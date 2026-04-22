import RegisterForm from "@/components/register-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function RegisterPage() {
  
  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Registre-se</CardTitle>
          <CardDescription>
            Digite seu email e senha para se registrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </>
  );
}
