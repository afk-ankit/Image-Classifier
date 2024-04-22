import { z } from "zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const RegisterSchema = z.object({
  username: z
    .string()
    .min(1, "username required")
    .max(30, "username can't be more than 30 characters"),
  email: z.string().email().min(1, "email required"),
  password: z.string().min(1, "password required"),
  confirm_password: z.string().min(1, "password required"),
});

type TRegisterSchema = z.infer<typeof RegisterSchema>;

export const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });
  return (
    <section className="grid  min-h-[80dvh] place-items-center py-4 sm:container sm:px-1">
      <div className="m-auto w-full rounded-sm p-4 md:w-[750px]">
        <h1 className="text-center text-2xl font-bold">User Signup</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              try {
                const user = {
                  username: data.username,
                  email: data.email,
                  password: data.password,
                };
                await axios.post("http://localhost:8000/register", user);
                navigate({ to: "/classifier" });
              } catch (error) {
                if (error instanceof Error)
                  toast({
                    description: error.message,
                  });
              }
            })}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full">
              Signup
            </Button>
            <h1 className="mt-2 text-sm text-muted-foreground">
              Click here to{" "}
              <Link to="/signin" className="hover:underline">
                login
              </Link>
            </h1>
          </form>
        </Form>
      </div>
    </section>
  );
};
