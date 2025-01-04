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
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: data.handle,
      description: data.description,
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
      window.location.reload();
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
    const user: User = queryClient.getQueryData<User>(["user"])!;
    user.description = formData.description;
    user.handle = formData.handle;
    updateProfileMutation.mutate(user);
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

      <Button type="submit" className="p-2 text-lg w-full">
        Save Changes
      </Button>
    </form>
  );
}
