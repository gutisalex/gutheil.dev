"use client";

import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useEffect, useActionState, useState } from "react";
import {
  type ContactFormState,
  submitContactForm,
} from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = {
  message: "",
  errors: undefined,
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  // Local state to preserve form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Clear form only on successful submission
  const isSuccess = state.message && !state.errors && !state.isError;
  useEffect(() => {
    if (isSuccess) {
      setFormData({ name: "", email: "", message: "" });
    }
  }, [isSuccess]);

  return (
    <form
      action={formAction}
      className="w-full max-w-2xl mx-auto space-y-4 text-left"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          disabled={pending}
          className="w-full"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          aria-invalid={state.errors?.name ? true : undefined}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        {state.errors?.name && (
          <p id="name-error" className="text-sm text-destructive">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          required
          disabled={pending}
          className="w-full"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-destructive">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message..."
          required
          disabled={pending}
          className="w-full min-h-32"
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="text-sm text-destructive">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {state.message && (
        <div
          className={`flex items-center gap-2 text-sm ${
            state.errors || state.isError
              ? "text-destructive"
              : "text-green-600 dark:text-green-400"
          }`}
          aria-live="polite"
        >
          {state.errors || state.isError ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full sm:w-auto flex items-center gap-2"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
