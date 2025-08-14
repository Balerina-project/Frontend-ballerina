import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">EventHub</h1>
          <p className="text-muted-foreground">Join Your Community</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
