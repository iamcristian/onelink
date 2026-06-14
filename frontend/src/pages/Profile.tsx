import { updateProfile, uploadImage } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, ProfileForm } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Camera, Check, UserCircle, AlignLeft, Palette, Image as ImageIcon } from "lucide-react";

export default function Profile() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

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
      toast.success("Profile saved successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onMutate: () => {
      setIsUploading(true);
    },
    onError: (error) => {
      setIsUploading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsUploading(false);
      toast.success("Image uploaded successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
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

  const currentThemeSelection = watch("profileTheme");

  return (
    <form
      className="space-y-6 max-w-xl mx-auto"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-blue-500" />
          Edit Profile Information
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Customize your username handle, bio description, avatar image, and page design templates.
        </p>
      </div>

      {/* Avatar Image Uploader */}
      <div className="flex flex-col items-center justify-center py-4 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50/55 dark:bg-zinc-950/20">
        <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5" />
          Profile Picture
        </label>
        
        <div 
          onClick={handleAvatarClick}
          className="group relative h-24 w-24 rounded-full overflow-hidden cursor-pointer ring-4 ring-white dark:ring-zinc-900 shadow-md hover:shadow-lg hover:ring-blue-500/35 transition-all duration-200"
        >
          {data.image ? (
            <img
              src={data.image}
              alt="Profile avatar"
              className="h-24 w-24 object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="h-24 w-24 bg-blue-600/10 text-blue-500 flex items-center justify-center font-bold text-3xl">
              {data.handle.charAt(0).toUpperCase()}
            </div>
          )}
          
          {/* Overlay Hover State */}
          <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Camera className="h-5 w-5 mb-1" />
            <span className="text-[9px] font-bold uppercase tracking-wider">
              {isUploading ? "Uploading..." : "Change"}
            </span>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          id="image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isUploading}
        />
        
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-2.5">
          Click image circle to upload. JPEG, PNG, or GIF. Max 5MB.
        </p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4">
        {/* Username field */}
        <div className="space-y-1.5">
          <label htmlFor="handle" className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <UserCircle className="h-3.5 w-3.5 text-zinc-400" />
            Username Handle
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-semibold select-none">
              onelink.me/
            </span>
            <Input
              type="text"
              id="handle"
              className="pl-24 bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-sm font-semibold focus-visible:ring-1 focus-visible:ring-blue-500 dark:text-zinc-100 rounded-lg shadow-none"
              placeholder="username"
              {...register("handle", { 
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+$/,
                  message: "Must only include letters, numbers, periods, hyphens, and underscores"
                }
              })}
            />
          </div>
          {errors.handle && <p className="text-xs text-red-500 font-medium">{errors.handle.message}</p>}
        </div>

        {/* Description/Bio field */}
        <div className="space-y-1.5">
          <label htmlFor="description" className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <AlignLeft className="h-3.5 w-3.5 text-zinc-400" />
            Bio Description
          </label>
          <Textarea
            id="description"
            className="bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 dark:text-zinc-100 rounded-lg shadow-none min-h-[80px]"
            placeholder="Introduce yourself, write a tagline, or list your hobbies..."
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 250,
                message: "Description must be under 250 characters"
              }
            })}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Theme Cards Overhaul */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="h-3.5 w-3.5 text-zinc-400" />
          Choose Profile Theme
        </label>
        
        <div className="grid grid-cols-2 gap-3.5">
          {[
            {
              id: "midnight",
              name: "Midnight Sky",
              bg: "bg-slate-950 border-slate-800 text-white",
              miniLinks: ["bg-white/10", "bg-white/10"],
            },
            {
              id: "sunset",
              name: "Sunset Rose",
              bg: "bg-gradient-to-br from-rose-200 to-orange-200 border-orange-200/50 text-slate-800",
              miniLinks: ["bg-white/80", "bg-white/80"],
            },
            {
              id: "neobrutalism",
              name: "Neo-Brutalism",
              bg: "bg-[#dfebf6] border-black text-black",
              miniLinks: ["bg-yellow-300 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]", "bg-yellow-300 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"],
            },
            {
              id: "minimalist",
              name: "Minimalist",
              bg: "bg-white border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50",
              miniLinks: ["border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950", "border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"],
            },
          ].map((t) => {
            const isSelected = currentThemeSelection === t.id;
            return (
              <label
                key={t.id}
                className={`relative cursor-pointer rounded-2xl p-4 flex flex-col justify-between h-28 border-[2px] transition-all duration-200 shadow-xs hover:shadow-md ${
                  isSelected
                    ? "border-blue-600 scale-[1.02] ring-4 ring-blue-500/10"
                    : "border-transparent"
                } ${t.bg}`}
              >
                <input
                  type="radio"
                  value={t.id}
                  className="sr-only"
                  {...register("profileTheme", {
                    onChange: (e) => {
                      const newTheme = e.target.value;
                      queryClient.setQueryData(["user"], (prevData: User | undefined) => {
                        if (!prevData) return prevData;
                        return {
                          ...prevData,
                          profileTheme: newTheme,
                        };
                      });
                    }
                  })}
                />

                {/* Checked Icon overlay */}
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 p-0.5 bg-blue-600 text-white rounded-full">
                    <Check className="h-3 w-3 font-bold" />
                  </span>
                )}

                {/* Theme name */}
                <span className="text-[11px] font-black uppercase tracking-wider block">
                  {t.name}
                </span>

                {/* Mini mockup links inside cards */}
                <div className="space-y-1.5 mt-2 flex-grow flex flex-col justify-end">
                  {t.miniLinks.map((linkStyle, index) => (
                    <div
                      key={index}
                      className={`h-2.5 w-full rounded-md ${linkStyle}`}
                    />
                  ))}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Submit */}
      <Button
        type="submit"
        disabled={updateProfileMutation.isPending}
        className="w-full font-semibold shadow-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 hover:shadow-lg h-10 rounded-lg"
      >
        {updateProfileMutation.isPending ? "Saving Changes..." : "Save Profile Settings"}
      </Button>
    </form>
  );
}
