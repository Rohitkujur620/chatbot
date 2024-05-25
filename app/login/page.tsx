import Image from "next/image";
import Link from "next/link";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <div className="grid w-full h-[100vh] grid-cols-1 md:grid-cols-3">
      <LoginForm />
      {/* Gradient */}
      <div className="relative hidden w-full overflow-hidden md:col-span-2 rounded-l-2xl md:block">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-lg" />
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <div>
            
            <div className="mt-4">
              <div className="text-2xl font-medium text-neutral-900">
                A ChatGPT clone with enhanced features.
              </div>
            </div>
          </div>
        </div>
        <Image
          priority
          sizes="50vw"
          className="z-0"
          alt="gradient"
          fill
          src="/login-gradient.jpg"
        />
      </div>
    </div>
  );
};

export default LoginPage;
