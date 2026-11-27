import { z } from "zod";

const baseUser = z.object({
  name: z
    .string({ error: "الاسم مطلوب" })
    .trim()
    .min(2, "الاسم يجب ألا يقل عن حرفين")
    .max(100, "الاسم يجب ألا يزيد عن 100 حرف"),

  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "البريد الإلكتروني مطلوب"
          : "البريد الإلكتروني غير صالح",
    })
    .trim()
    .toLowerCase()
    .pipe(
      z
        .email({ error: "البريد الإلكتروني غير صالح" })
        .max(100, "البريد الإلكتروني طويل جدًا"),
    ),

  password: z
    .string({ error: "كلمة المرور مطلوبة" })
    .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
    .max(64, "كلمة المرور يجب ألا تزيد عن 64 حرفًا")
    .regex(
      /[A-Z]/,
      "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل (A-Z)",
    )
    .regex(
      /[a-z]/,
      "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل (a-z)",
    )
    .regex(/[0-9]/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل (0-9)")
    .regex(
      /[^A-Za-z0-9]/,
      "يجب أن تحتوي كلمة المرور على رمز واحد على الأقل (مثل @ أو #)",
    ),

  gender: z.enum(["male", "female"], {
    error: "النوع يجب أن يكون male أو female",
  }),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "رقم الهاتف يجب أن يكون بالصيغة 01xxxxxxxxx")
    .optional(),
});

const studentSchema = baseUser.extend({
  role: z.literal("student"),
  college_id: z.uuid({
    error: (issue) =>
      issue.input === undefined
        ? "معرّف الكلية مطلوب"
        : "معرّف الكلية غير صالح",
  }),
  original_government: z
    .string({ error: "المحافظة مطلوبة" })
    .trim()
    .min(2, "اسم المحافظة قصير جدًا")
    .max(100, "اسم المحافظة طويل جدًا"),
});

const ownerSchema = baseUser.extend({
  role: z.literal("owner"),
  owner_address: z
    .string()
    .trim()
    .max(200, "العنوان يجب ألا يزيد عن 200 حرف")
    .optional(),
});

export const registerSchema = z.discriminatedUnion(
  "role",
  [studentSchema, ownerSchema],
  { error: "النوع يجب أن يكون student أو owner" },
);

// Login Schema
export const loginSchema = z.object({
  email: z
    .string({ error: "البريد الإلكتروني مطلوب" })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "البريد الإلكتروني غير صالح" })),
  password: z
    .string({ error: "كلمة المرور مطلوبة" })
    .min(1, "كلمة المرور مطلوبة"),
});
