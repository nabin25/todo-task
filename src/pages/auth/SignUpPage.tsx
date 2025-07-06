import { useForm } from "react-hook-form";
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
import {
  signUpSchema,
  type ISignUpFormValues,
} from "../../schemas/signUp.schema";
import { hashPassword } from "../../utils/hashPassword";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
import {
  useCheckAccountAvailabilityMutation,
  useCreateAccountMutation,
} from "../../services/auth/signUserApi";

const SignUpPage = () => {
  const form = useForm<ISignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const [checkAccountAvailability, { isLoading: isCheckingAvailability }] =
    useCheckAccountAvailabilityMutation();
  const [createAccount, { isLoading: isCreatingAccount }] =
    useCreateAccountMutation();

  useEffect(() => {
    document.title = "SignUp-Todo Dashboard";
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (data: ISignUpFormValues) => {
    try {
      const existingUsers = await checkAccountAvailability({
        email: data.email,
      }).unwrap();

      if (existingUsers && existingUsers.length > 0) {
        toast.error("Email already in use!");
        return;
      }

      const hashed = await hashPassword(data.password);
      await createAccount({
        email: data.email,
        full_name: data.full_name,
        password: hashed,
      }).unwrap();

      toast.success("Account created successfully");
      navigate(routes.auth.signIn);
    } catch (err: any) {
      const hashed = await hashPassword(data.password);

      try {
        await createAccount({
          email: data.email,
          full_name: data.full_name,
          password: hashed,
        }).unwrap();

        toast.success("Account created successfully");
        navigate(routes.auth.signIn);
      } catch (e) {
        toast.error("Error creating user");
      }
    }
  };

  const getStrength = () => {
    const password = form.watch("password");
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const strengthMap = [
      { text: "Very weak", color: "bg-red-500" },
      { text: "Weak", color: "bg-orange-500" },
      { text: "Medium", color: "bg-yellow-500" },
      { text: "Strong", color: "bg-blue-500" },
      { text: "Very strong", color: "bg-green-500" },
    ];

    return {
      strength: (strength / 5) * 100,
      text: strengthMap[strength - 1]?.text || "",
      color: strengthMap[strength - 1]?.color || "",
    };
  };

  const passwordStrength = getStrength();

  return (
    <>
      <div className="w-full h-[100svh] flex items-center justify-center">
        <div className="max-w-[500px] md:min-w-[500px] w-full p-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 rounded-lg justify-center"
            >
              <div className="flex gap-2 text-xl justify-center mb-2">
                <WandSparkles className="text-[#ff6013]" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-[#ff6013] dark:to-[#ff9259] from-[#ff6013] to-[#ff874a] font-bold">
                  Todo Dashboard
                </span>
              </div>
              <h3 className="text-2xl text-center">Create an Account</h3>
              <p className="text-center mb-2">
                Enter your details to setup an account.
              </p>
              <div className="flex flex-col gap-5 py-3 lg:py-6 px-5 lg:px-10 rounded-lg  bg-[#fdfaf7] dark:bg-[#242424] border border-black/20 dark:border-white/20 border-solid shadow-lg">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      {form?.formState?.errors?.full_name && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {form?.formState?.errors?.full_name?.message}
                        </p>
                      )}
                      {form?.formState?.dirtyFields?.full_name &&
                        !form?.formState?.errors.full_name && (
                          <p className="text-sm text-green-500 flex items-center mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Name looks good!
                          </p>
                        )}
                    </FormItem>
                  )}
                />

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
                      {form?.formState?.dirtyFields.password &&
                        form.watch("password") && (
                          <div className="mt-2">
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${passwordStrength.color}`}
                                style={{
                                  width: `${passwordStrength.strength}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-xs mt-1">
                              {passwordStrength.text || "Password strength"}
                            </p>
                          </div>
                        )}

                      <ul className="text-xs text-gray-500 mt-1 space-y-1">
                        <li
                          className={
                            form.watch("password")?.length >= 8
                              ? "text-green-500"
                              : ""
                          }
                        >
                          • At least 8 characters
                        </li>
                        <li
                          className={
                            /[A-Z]/.test(form.watch("password") || "")
                              ? "text-green-500"
                              : ""
                          }
                        >
                          • At least one uppercase letter
                        </li>
                        <li
                          className={
                            /[a-z]/.test(form.watch("password") || "")
                              ? "text-green-500"
                              : ""
                          }
                        >
                          • At least one lowercase letter
                        </li>
                        <li
                          className={
                            /[0-9]/.test(form.watch("password") || "")
                              ? "text-green-500"
                              : ""
                          }
                        >
                          • At least one number
                        </li>
                      </ul>
                      {form?.formState?.errors?.password && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {form?.formState?.errors?.password?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm your password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      {form?.formState?.errors?.confirmPassword && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {form?.formState?.errors?.confirmPassword?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isCheckingAvailability || isCreatingAccount}
                >
                  {isCheckingAvailability || isCreatingAccount ? (
                    <>
                      {isCheckingAvailability
                        ? "Checking account availability"
                        : "Creating Account"}
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>

              <p className="text-center">
                Already have an account.{" "}
                <a
                  className="text-[#ff6013] cursor-pointer "
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(routes.auth.signIn);
                  }}
                >
                  Login{" "}
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
