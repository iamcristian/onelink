import { updateProfile, uploadImage } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, ProfileForm } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Profile() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: data.handle,
      description: data.description,
      profileTheme: data.profileTheme || "midnight",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    const user = queryClient.getQueryData<User>(["user"])!;
    const updatedUser = {
      ...user,
      description: formData.description,
      handle: formData.handle,
      profileTheme: formData.profileTheme,
    };
    updateProfileMutation.mutate(updatedUser);
  };

  return (
    <form
      className="p-5 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-center">Edit Profile</legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Username:</label>
        <Input
          type="text"
          className="border-none rounded-lg p-2"
          placeholder="username"
          {...register("handle", { required: "Username is required" })}
        />

        {errors.handle && <p className="text-red">{errors.handle.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <Textarea
          className="border-none rounded-lg p-2"
          placeholder="Your description"
          {...register("description", {
            required: "Description is required",
          })}
        />

        {errors.description && (
          <p className="text-red">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Image:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label className="font-semibold">Profile Theme:</label>
        <div className="grid grid-cols-2 gap-3 mt-1">
          {[
            { id: "midnight", name: "Midnight Sky", class: "bg-slate-900 text-white border-slate-700" },
            { id: "sunset", name: "Sunset Rose", class: "bg-gradient-to-br from-pink-400 to-orange-400 text-slate-900 border-orange-300" },
            { id: "neobrutalism", name: "Neo-Brutalism", class: "bg-yellow-300 text-black border-black border-2" },
            { id: "minimalist", name: "Minimalist", class: "bg-white text-black border-neutral-300" },
          ].map((t) => (
            <label
              key={t.id}
              className={`cursor-pointer rounded-lg p-3 flex flex-col justify-between h-20 border-2 transition-all ${
                watch("profileTheme") === t.id
                  ? "border-blue-600 ring-2 ring-blue-600/30 scale-[1.03]"
                  : "border-transparent opacity-85 hover:opacity-100"
              } ${t.class}`}
            >
              <input
                type="radio"
                value={t.id}
                className="sr-only"
                {...register("profileTheme")}
              />
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.name}
              </span>
              <span className="text-[10px] opacity-75">Sample Link</span>
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" className="p-2 text-lg w-full">
        Save Changes
      </Button>
    </form>
  );
}
