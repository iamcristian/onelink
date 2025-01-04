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

  const handle = form.watch("handle");

  const handleSearch = () => {
    mutation.mutate(handle);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-8">
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-center space-x-2 mb-2">
            <div className="flex flex-col sm:flex-row items-center w-full border rounded-lg">
              <span className="p-2">onelink.app/</span>
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="username"
                        className="w-full border-none focus:!ring-transparent focus:!border-none text-center sm:text-left"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size="lg" className="m-2 sm:m-0">
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
                state={{ handle }}
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
