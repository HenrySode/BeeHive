"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { services, getServiceBySlug } from "@/lib/services";
import { addSubmittedRequest } from "@/lib/liveActivity";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  company: string; // honeypot, left blank by real visitors
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  serviceType: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
  company: "",
};

type Errors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.phone.trim()) errors.phone = "Enter a phone number.";
  if (!values.email.trim()) {
    errors.email = "Enter an email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.address.trim()) errors.address = "Enter the service address.";
  if (!values.serviceType) errors.serviceType = "Choose a service.";
  return errors;
}

/**
 * Public service request form. Matches prd.md FR-P3 and FR-P4.
 *
 * The backend does not exist yet (see api-spec.md, POST /service-requests),
 * so submission is simulated on the client: validation, a brief pending
 * state, and the confirmation screen all behave as they will once the form
 * posts to the real endpoint. Wiring the fetch call is a backend task, not
 * a design change.
 *
 * On success, the request is also written to the shared store in
 * lib/liveActivity.ts, so it shows up in the dashboard's Service Requests
 * panel, the notification bell, and the Customers panel in the same
 * browser, standing in for the real request reaching a manager.
 */
export function RequestServiceForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: a real visitor never fills this in. Silently drop the
    // submission rather than showing an error that would help a bot.
    if (values.company.trim()) {
      setStatus("submitted");
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => {
      const service = getServiceBySlug(values.serviceType);
      addSubmittedRequest({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        serviceLabel: service?.name ?? "Not sure yet",
        message: values.message,
        preferredDate: values.preferredDate,
        preferredTime: values.preferredTime,
      });
      setStatus("submitted");
    }, 600);
  }

  if (status === "submitted") {
    return (
      <Card className="flex flex-col items-center gap-4 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-active">
          <CheckCircle2 size={28} aria-hidden="true" />
        </span>
        <h3 className="text-[22px] font-semibold text-ink">Request received</h3>
        <p className="max-w-md text-[16px] text-muted">
          Thank you, {values.name.split(" ")[0] || "there"}. Bee Hive has your request and will
          reach out shortly to confirm the details.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setValues(initialValues);
            setStatus("idle");
          }}
        >
          Submit another request
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
        />
        <Input
          label="Phone number"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          error={errors.phone}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          error={errors.email}
        />
        <Input
          label="Service address"
          name="address"
          autoComplete="street-address"
          required
          value={values.address}
          onChange={(event) => update("address", event.target.value)}
          error={errors.address}
        />
      </div>

      <Select
        label="Service needed"
        name="serviceType"
        required
        value={values.serviceType}
        onChange={(event) => update("serviceType", event.target.value)}
        error={errors.serviceType}
      >
        <option value="">Choose a service</option>
        {services.map((service) => (
          <option key={service.slug} value={service.slug}>
            {service.name}
          </option>
        ))}
        <option value="not-sure">Not sure yet</option>
      </Select>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Preferred date"
          name="preferredDate"
          type="date"
          hint="Optional"
          value={values.preferredDate}
          onChange={(event) => update("preferredDate", event.target.value)}
        />
        <Input
          label="Preferred time"
          name="preferredTime"
          type="time"
          hint="Optional"
          value={values.preferredTime}
          onChange={(event) => update("preferredTime", event.target.value)}
        />
      </div>

      <Textarea
        label="Message"
        name="message"
        hint="Optional. Let us know anything else that would help."
        value={values.message}
        onChange={(event) => update("message", event.target.value)}
      />

      {/* Honeypot field: hidden from sighted users, ignored by screen readers. */}
      <div className="sr-only-input" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      <Button type="submit" disabled={status === "submitting"} className="sm:self-start">
        {status === "submitting" ? "Sending..." : "Request Service"}
      </Button>
    </form>
  );
}
