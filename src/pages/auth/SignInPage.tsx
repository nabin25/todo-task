import { z } from "zod";
import { loginSchema } from "../../schemas/login.schema";
import { useForm } from "react-hook-form";
import { useAuth } from "../../providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { AlertCircle, CheckCircle, Loader2, WandSparkles } from "lucide-react";
import loginUser from "../../services/auth/loginUser";

type ILoginData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const form = useForm<ILoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    document.title = "SignIn-Todo Dashboard";
  }, []);

  const { login } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await loginUser({ ...data });

      if (response && response.length > 0) {
        const userData = response[0];
        login(
          {
            full_name: userData?.full_name,
            email: userData?.email,
            avatar: userData?.avatar,
          },
          userData?.token
        );
        toast.success("Logged In Successfully");
      } else {
        toast.error("Invalid Login Credentials");
      }
    } catch (err) {
      toast.error("Error Logging In!");
    }
  };
  return (
    <>
      <div className="w-full h-[100svh] flex items-center justify-center animate-in">
        <div className="max-w-[500px] md:min-w-[500px] w-full p-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 rounded-lg justify-center"
            >
              <div className="flex gap-2 text-xl justify-center mb-2">
                <WandSparkles className="text-[#94288d]" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94288d] to-[#ff4504] font-bold">
                  Todo Dashboard
                </span>
              </div>
              <h3 className="text-2xl text-center">Welcome Back</h3>
              <p className="text-center mb-2">
                Enter your credentials to login !
              </p>
              <div className="flex flex-col gap-5 py-3 lg:py-6 px-5 lg:px-10 rounded-lg  bg-[#fdfaf7] dark:bg-[#242424] border border-black/20 dark:border-white/20 border-solid shadow-lg">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email" {...field} />
                      </FormControl>
                      {form?.formState?.errors?.email && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {form?.formState?.errors?.email?.message}
                        </p>
                      )}
                      {form?.formState?.dirtyFields?.email &&
                        !form?.formState?.errors.email && (
                          <p className="text-sm text-green-500 flex items-center mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Valid email format!
                          </p>
                        )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      {form?.formState?.errors?.password && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {form?.formState?.errors?.password?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  Submit
                  {/* {isLoading ? <Loader2 className="animate-spin" /> : "Submit"} */}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
