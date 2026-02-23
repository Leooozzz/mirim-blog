"use client";

import {
  useEffect,
  useState,
  useTransition,
  ChangeEvent,
  FormEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CreatePost } from "@/actions/createPost";
import { GetCategories } from "@/actions/getCategory";
import { ErrorStructure, PostSchema } from "@/schemas/postSchema";
import { Category } from "@/types/category";
import { CreatePostFormData } from "@/types/post";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { redirect } from "next/navigation";


const INITIAL_FORM: CreatePostFormData = {
  title: "",
  tags: "",
  body: "",
  categoryId: 0,
  cover: null,
};

export const CreatePostForm = () => {
  const [form, setForm] = useState<CreatePostFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);  

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({ ...prev, categoryId: Number(value) }));
    setErrors((prev) => ({ ...prev, categoryId: undefined, form: undefined }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, cover: file }));
  };

  const handleSubmit = () => {


    const result = PostSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: ErrorStructure = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ErrorStructure;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) data.append(key, String(value));
      });

      if (form.cover) {
        data.set("cover", form.cover);
      }

      const res = await CreatePost(data);

      if (res?.error) {
        setErrors({ form: res.error });
        return;
      }

      setForm(INITIAL_FORM);
      redirect('/admin/listar-post')
    });
  
  };

  useEffect(() => {
    GetCategories().then(setCategories);
  }, []);

 return (
  <div className="mx-auto max-w-2xl rounded-xl border bg-background p-6 shadow-sm mt-5 mb-5">
    <h2 className="text-2xl font-semibold tracking-tight">
      Criar novo post
    </h2>
    <p className="mb-6 text-sm text-muted-foreground">
      Preencha os campos abaixo para publicar um novo conteúdo.
    </p>

    <form className="space-y-5">
  
      <div className="space-y-1.5">
        <Label className="text-sm text-muted-foreground">Título</Label>
        <Input
          name="title"
          value={form.title}
          onChange={handleInputChange}
          disabled={pending}
          className={cn(
            "transition focus-visible:ring-2",
            errors.title &&
              "border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors.title && (
          <p className="text-xs text-destructive animate-in fade-in">
            {errors.title}
          </p>
        )}
      </div>

      
      <div className="space-y-1.5">
        <Label className="text-sm text-muted-foreground">Tags</Label>
        <Input
          name="tags"
          placeholder="noticias, banda"
          value={form.tags}
          onChange={handleInputChange}
          disabled={pending}
          className={cn(
            errors.tags &&
              "border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors.tags && (
          <p className="text-xs text-destructive">{errors.tags}</p>
        )}
      </div>

      
      <div className="space-y-1.5">
        <Label className="text-sm text-muted-foreground">Conteúdo</Label>
        <Textarea
          name="body"
          rows={6}
          value={form.body}
          onChange={handleInputChange}
          disabled={pending}
          className={cn(
            errors.body &&
              "border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors.body && (
          <p className="text-xs text-destructive">{errors.body}</p>
        )}
      </div>

      
      <div className="space-y-1.5">
        <Label className="text-sm text-muted-foreground">Categoria</Label>
        <Select
          value={form.categoryId ? String(form.categoryId) : ""}
          onValueChange={handleCategoryChange}
          disabled={pending}
        >
          <SelectTrigger
            className={cn(
              errors.categoryId &&
                "border-destructive focus:ring-destructive"
            )}
          >
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-xs text-destructive">
            {errors.categoryId}
          </p>
        )}
      </div>


      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">
          Imagem de capa
        </Label>

        <label
          htmlFor="cover"
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-sm text-muted-foreground transition hover:bg-muted"
        >
          <span>Clique para enviar ou arraste a imagem</span>
          <span className="text-xs">(PNG, JPG, até 5MB)</span>
        </label>

        <Input
          id="cover"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

    
      {errors.form && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {errors.form}
        </div>
      )}
 <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="w-full gap-2 text-base cursor-pointer"
          disabled={pending}
        >
          Publicar post
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>Publicar post?</AlertDialogTitle>
          <AlertDialogDescription>
            O post será publicado e ficará visível para os leitores.
            Você pode editá-lo depois.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            type="submit"
            disabled={pending}
            onClick={()=>{setOpen(false);handleSubmit()}}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {pending ? "Publicando..." : "Confirmar publicação"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </form>
  </div>
);

};
