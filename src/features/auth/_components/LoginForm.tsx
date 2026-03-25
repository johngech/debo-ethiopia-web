import { LuLock, LuMail } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormField, SubmitButton } from "@/components/forms";
import { useAuthStore } from "@/store/useAuthStore";
import { type LoginFormData, loginSchema } from "@/validation";

const LoginForm = () => {
  const login = useAuthStore((selector) => selector.login);
  const navigate = useNavigate();
  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl p-8 mx-auto mt-20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-sm opacity-60">Please enter your details</p>
      </div>

      <Form
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <div className="space-y-4">
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            leftIcon={<LuMail size={18} />}
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<LuLock size={18} />}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="link link-hover text-xs text-primary"
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton title="Log In" variant="primary" className="w-full" />
        </div>
      </Form>

      <div className="divider text-xs opacity-50 uppercase mt-8">Or</div>

      <p className="flex justify-center gap-2 text-sm mt-4">
        <span className="opacity-70">New here?</span>
        <Link to="/register" className="link link-primary font-semibold">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
