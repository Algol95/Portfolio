import { useEffect, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  User,
  Building2,
  MessageSquare,
  Hourglass,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { sendContactMessage } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useRecaptchaToken } from "@/hooks/use-recaptcha-token";

const subjectOptions = [
  { value: "web", label: "Página Web" },
  { value: "app", label: "Aplicación Web" },
  { value: "mobile", label: "App Móvil" },
  { value: "hire", label: "Contratación" },
  { value: "consulting", label: "Consultoría" },
  { value: "other", label: "Otro" },
];

const genericSubmitErrorMessage =
  "No se ha podido enviar el mensaje. Inténtalo de nuevo más tarde.";

const FIELD_MAX_LENGTHS = {
  name: 100,
  email: 150,
  company: 150,
  message: 2000,
};

/**
 * Componente de contacto que permite a los usuarios enviar mensajes a través de un formulario. El componente maneja el estado del formulario, la validación de los campos y el envío de los datos. También muestra un mensaje de confirmación cuando el mensaje se envía correctamente. El formulario incluye campos para el nombre, correo electrónico, empresa, tipo de proyecto y mensaje, y utiliza componentes personalizados para mejorar la experiencia del usuario. Además, proporciona información de contacto adicional y enlaces a redes sociales.
 * @returns {JSX.Element} Componente de contacto.
 */
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { getRecaptchaToken, isRecaptchaEnabled, isRecaptchaReady } =
    useRecaptchaToken();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const messageValue = watch("message");
  const messageLength = messageValue.length;

  useEffect(() => {
    if (!submitted) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setSubmitted(false), 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [submitted]);

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      const recaptchaToken = await getRecaptchaToken("contact_form_submit");

      if (isRecaptchaEnabled && !recaptchaToken) {
        setSubmitError(genericSubmitErrorMessage);
        return;
      }

      const response = await sendContactMessage({
        ...data,
        recaptchaToken,
      });

      if (!response?.ok) {
        setSubmitError(genericSubmitErrorMessage);
        return;
      }

      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(genericSubmitErrorMessage);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">
            Contacto
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Trabajemos Juntos</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto text-pretty">
            ¿Tienes un proyecto en mente? ¿Buscas un desarrollador para tu
            equipo? Cuéntame sobre tu idea y te responderé lo antes posible.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  ¡Mensaje Enviado!
                </h3>
                <p className="text-muted-foreground">
                  Gracias por contactarme. Te responderé pronto.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      Nombre
                    </label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      maxLength={FIELD_MAX_LENGTHS.name}
                      aria-invalid={errors.name ? "true" : "false"}
                      className="bg-background/50"
                      {...register("name", {
                        required: "El nombre es obligatorio.",
                        maxLength: {
                          value: FIELD_MAX_LENGTHS.name,
                          message: `El nombre no puede superar los ${FIELD_MAX_LENGTHS.name} caracteres.`,
                        },
                      })}
                    />
                    {errors.name ? (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      maxLength={FIELD_MAX_LENGTHS.email}
                      aria-invalid={errors.email ? "true" : "false"}
                      className="bg-background/50"
                      {...register("email", {
                        required: "El email es obligatorio.",
                        maxLength: {
                          value: FIELD_MAX_LENGTHS.email,
                          message: `El email no puede superar los ${FIELD_MAX_LENGTHS.email} caracteres.`,
                        },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Introduce un email válido.",
                        },
                      })}
                    />
                    {errors.email ? (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Empresa{" "}
                      <span className="text-muted-foreground">(opcional)</span>
                    </label>
                    <Input
                      id="company"
                      placeholder="Nombre de tu empresa"
                      maxLength={FIELD_MAX_LENGTHS.company}
                      className="bg-background/50"
                      {...register("company", {
                        maxLength: {
                          value: FIELD_MAX_LENGTHS.company,
                          message: `La compañía no puede superar los ${FIELD_MAX_LENGTHS.company} caracteres.`,
                        },
                      })}
                    />
                    {errors.company ? (
                      <p className="text-sm text-destructive">
                        {errors.company.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Tipo de Proyecto
                    </label>
                    <Controller
                      name="subject"
                      control={control}
                      rules={{
                        required: "Selecciona un tipo de proyecto.",
                      }}
                      render={({ field }) => (
                        <Select
                          id="subject"
                          value={field.value}
                          onValueChange={field.onChange}
                          options={subjectOptions}
                          placeholder="Selecciona una opción"
                          invalid={Boolean(errors.subject)}
                        />
                      )}
                    />
                    {errors.subject ? (
                      <p className="text-sm text-destructive">
                        {errors.subject.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntame sobre tu proyecto o lo que necesitas..."
                    rows={4}
                    maxLength={FIELD_MAX_LENGTHS.message}
                    aria-describedby="message-character-count"
                    aria-invalid={errors.message ? "true" : "false"}
                    className="bg-background/50 resize-none"
                    {...register("message", {
                      required: "El mensaje es obligatorio.",
                      minLength: {
                        value: 10,
                        message: "Cuéntame un poco más sobre lo que necesitas.",
                      },
                      maxLength: {
                        value: FIELD_MAX_LENGTHS.message,
                        message: `El mensaje no puede superar los ${FIELD_MAX_LENGTHS.message} caracteres.`,
                      },
                    })}
                  />
                  <div className="flex items-center justify-between gap-3 text-sm">
                    {errors.message ? (
                      <p className="text-destructive">
                        {errors.message.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p
                      id="message-character-count"
                      className="text-muted-foreground"
                    >
                      {messageLength}/{FIELD_MAX_LENGTHS.message}
                    </p>
                  </div>
                </div>

                {submitError ? (
                  <div
                    className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    role="alert"
                  >
                    {submitError}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={
                    isSubmitting || (isRecaptchaEnabled && !isRecaptchaReady)
                  }
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">
                        <Hourglass className="h-5 w-5" />
                      </span>
                      Enviando...
                    </>
                  ) : isRecaptchaEnabled && !isRecaptchaReady ? (
                    <>Preparando verificación...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Sígueme en:</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/Algol95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Github className="h-5 w-5" />
                  </div>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/angel-dev-aragon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
