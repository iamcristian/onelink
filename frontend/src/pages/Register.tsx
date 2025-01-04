import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerUserSchema } from "@/schemas/userSchema";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import { isAxiosError } from "axios";
import api from "@/config/axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RegisterFormValues = z.infer<typeof registerUserSchema>;

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultValues = {
    handle: location.state?.handle || "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerUserSchema),
    defaultValues,
  });

  const handleRegister = async (formData: RegisterFormValues) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      toast.success(data.message);
      form.reset();
      navigate("/auth/login");
    } catch (error) {
      if (isAxiosError(error) && error.response)
        toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your username" />
                    </FormControl>
                    <FormDescription>Choose a unique username</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Confirm your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
