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
import { useUserStore } from "@/Store";

const LoginSchema = z.object({
  email: z.string().email().min(1, "email required"),
  password: z.string().min(1, "password required"),
});

type TloginSchema = z.infer<typeof LoginSchema>;

export const Signin = () => {
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<TloginSchema>({
    resolver: zodResolver(LoginSchema),
  });
  return (
    <section className="grid  h-[80dvh] place-items-center py-4 sm:container sm:px-1">
      <div className="m-auto w-full rounded-sm p-4 md:w-[750px]">
        <h1 className="text-center text-2xl font-bold">User Signin</h1>
        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(async (data) => {
              try {
                const user = {
                  email: data.email,
                  password: data.password,
                };
                const res = await axios.post(
                  "http://localhost:8000/login",
                  user,
                );
                const token = res.data.token;
                const recievedUser = res.data.user;

                localStorage.setItem("token", token);
                addUser(recievedUser.username, recievedUser.email);
                navigate({ to: "/createWhiteBoard" });
              } catch (error) {
                if (error instanceof Error)
                  toast({
                    description: error.message,
                  });
              }
            })}
          >
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

            <Button type="submit" className="w-full">
              Signin
            </Button>
          </form>
        </Form>
        <h1 className="mt-2 text-sm text-muted-foreground">
          Click here to{" "}
          <Link to="/signup" className="hover:underline">
            Register
          </Link>
        </h1>
      </div>
    </section>
  );
};
