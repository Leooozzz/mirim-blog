"use client";

import { EditPost } from "@/actions/editPost";
import { GetCategories } from "@/actions/getCategory";
import { GetPostBySlug } from "@/actions/getPostBySlug";
import { EditPostSchema, ErrorStructure } from "@/schemas/postSchema";
import { Category } from "@/types/category";
import { EditPostFormData } from "@/types/post";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { redirect } from "next/navigation";

type Props = {
  slug: string;
};

const INITIAL_FORM: EditPostFormData = {
  title: "",
  tags: "",
  body: "",
  categoryId: undefined,
  cover: null,
  status: "PUBLISHED",
};

export const EditPostComponent = ({ slug }: Props) => {
  const [form, setForm] = useState<EditPostFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    GetPostBySlug(slug).then((post) => {

      setForm({
        title: post?.title ?? "",
        body: post?.body ?? "",
        tags: post?.tags ?? "",
        categoryId: post?.category ? Number(post.category) : undefined,
        status: post?.status ? 'PUBLISHED' : 'DRAFT',
        cover: null,
      });
    });
  }, [slug]);

  useEffect(() => {
    GetCategories().then(setCategories);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({ ...prev, categoryId: Number(value) }));
    setErrors((prev) => ({ ...prev, categoryId: undefined }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, cover: file }));
  };

  const handleSubmit = () => {
    const result = EditPostSchema.safeParse(form);
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
        if (value === undefined || value === null) return;
        if (value instanceof File) data.append(key, value);
        else data.append(key, value.toString());
      });

      const res = await EditPost({ slug, data });

      if (res?.error) {
        setErrors({ form: res.error });
        return;
      }else{
        redirect ('/admin/listar-post')
      }
    });
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-background p-6 shadow-sm mt-5 mb-5">
      <h2 className="text-2xl font-semibold tracking-tight">Editar post</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Atualize os campos abaixo para editar o conteúdo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
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
                "border-destructive focus-visible:ring-destructive",
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
                "border-destructive focus-visible:ring-destructive",
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
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          {errors.body && (
            <p className="text-xs text-destructive">{errors.body}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Categoria</Label>
          <Select
            value={form.categoryId === 0 ? "" : String(form.categoryId)}
            onValueChange={handleCategoryChange}
            disabled={pending}
          >
            <SelectTrigger
              className={cn(
                errors.categoryId &&
                  "border-destructive focus:ring-destructive",
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
            <p className="text-xs text-destructive">{errors.categoryId}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            Status do post
          </Label>

          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">Status</Label>

            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  status: value as "DRAFT" | "PUBLISHED",
                }))
              }
              disabled={pending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="DRAFT">Rascunho</SelectItem>
                <SelectItem value="PUBLISHED">Publicado</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              className="w-full gap-2 text-base cursor-pointer"
              disabled={pending}
            >
              Editar Post
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Editar post?</AlertDialogTitle>
              <AlertDialogDescription>
                O post será atualizado. Você
                pode editá-lo novamente depois.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancelar</AlertDialogCancel>

              <AlertDialogAction
                type="submit"
                disabled={pending}
                onClick={() => {
                  setOpen(false);
                  handleSubmit();
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {pending ? "Editando..." : "Confirmar edição"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
};
