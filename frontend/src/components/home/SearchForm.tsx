import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { searchByHandleSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "@/api/user";
import { Link } from "react-router";

type SearchByHandleFormData = z.infer<typeof searchByHandleSchema>;

function SearchForm() {
  const form = useForm<SearchByHandleFormData>({
    resolver: zodResolver(searchByHandleSchema),
    defaultValues: {
      handle: "",
    },
  });

  const mutation = useMutation({
    mutationFn: searchByHandle,
  });

  const handleSearch = (data: SearchByHandleFormData) => {
    mutation.mutate(data.handle);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4">
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
            <div className="flex items-center flex-1 px-3 py-1">
              <span className="text-zinc-400 dark:text-zinc-500 font-semibold select-none">onelink.app/</span>
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <input
                        type="text"
                        placeholder="username"
                        className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-zinc-900 dark:text-zinc-50 font-bold ml-0.5 placeholder:font-normal placeholder:text-zinc-400 dark:placeholder:text-zinc-650"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size="lg" className="rounded-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all">
              Claim your Onelink
            </Button>
          </div>
          {form.formState.errors.handle && (
            <FormMessage>{form.formState.errors.handle.message}</FormMessage>
          )}
          {mutation.isPending && (
            <p className="text-sm text-secondary py-2">Searching...</p>
          )}
          {mutation.isError && (
            <p className="text-sm text-red-500 py-2">
              {mutation.error.message}
            </p>
          )}
          {mutation.data && (
            <p className="text-sm py-2">
              Username is available. Go to{" "}
              <Link
                to="/auth/register"
                state={{ handle: form.getValues("handle") }}
                className="text-blue-500 underline hover:text-blue-700"
              >
                Register
              </Link>
            </p>
          )}
          <p className="text-sm text-secondary py-2">
            Start your personalized link page for free!
          </p>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
