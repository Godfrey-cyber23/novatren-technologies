"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cloud,
  CreditCard,
  Globe,
  LayoutDashboard,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

type ProjectType = "WEB_APP" | "MOBILE_APP" | "CLOUD_SETUP";
type Feature = "AUTH" | "PAYMENTS" | "ADMIN_PANEL";

const projectOptions = [
  {
    id: "WEB_APP",
    label: "Web App",
    description: "A responsive product for browsers and teams.",
    icon: Globe,
    range: [12000, 30000],
  },
  {
    id: "MOBILE_APP",
    label: "Mobile App",
    description: "A native-feeling experience for iOS and Android.",
    icon: Smartphone,
    range: [18000, 45000],
  },
  {
    id: "CLOUD_SETUP",
    label: "Cloud Setup",
    description: "Secure infrastructure, migration, and deployment.",
    icon: Cloud,
    range: [5000, 18000],
  },
] as const;

const featureOptions = [
  {
    id: "AUTH",
    label: "Authentication",
    description: "Accounts, sign-in, and access controls.",
    icon: ShieldCheck,
    range: [1500, 3500],
  },
  {
    id: "PAYMENTS",
    label: "Payments",
    description: "Checkout and payment provider integration.",
    icon: CreditCard,
    range: [2500, 6500],
  },
  {
    id: "ADMIN_PANEL",
    label: "Admin Panel",
    description: "Tools to manage users, content, and operations.",
    icon: LayoutDashboard,
    range: [3000, 8500],
  },
] as const;

const steps = ["Project type", "Features", "Your email"];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProjectEstimator() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedProject = projectOptions.find((option) => option.id === projectType);
  const estimate = selectedProject
    ? featureOptions
        .filter((feature) => selectedFeatures.includes(feature.id))
        .reduce<[number, number]>(
          (total, feature) => [
            total[0] + feature.range[0],
            total[1] + feature.range[1],
          ],
          [selectedProject.range[0], selectedProject.range[1]],
        )
    : null;

  function toggleFeature(feature: Feature) {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature],
    );
    setIsSubmitted(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  function resetEstimator() {
    setStep(0);
    setProjectType(null);
    setSelectedFeatures([]);
    setEmail("");
    setIsSubmitted(false);
  }

  return (
    <section className="section-rule estimator-section" id="estimator">
      <div className="page-shell">
        <div className="mb-9 max-w-2xl">
          <p className="eyebrow">PROJECT ESTIMATOR</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-brand-white sm:text-4xl">
            Start with a clearer scope.
          </h2>
          <p className="mt-3 text-sm leading-6 text-brand-muted sm:text-base">
            Shape an initial budget range around the work you have in mind.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] lg:gap-10">
          <div>
            <ol aria-label="Estimate steps" className="mb-7 grid grid-cols-3">
              {steps.map((label, index) => {
                const isComplete = index < step;
                const isCurrent = index === step;

                return (
                  <li
                    aria-current={isCurrent ? "step" : undefined}
                    className="flex items-center gap-2 border-b-2 pb-3 text-xs sm:gap-3 sm:text-sm"
                    key={label}
                    style={{
                      borderColor: isComplete || isCurrent ? "#22D3EE" : "#203650",
                      color: isComplete || isCurrent ? "#F8FAFC" : "#9AAEC5",
                    }}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        isComplete || isCurrent
                          ? "bg-brand-cyan text-brand-deep"
                          : "border border-brand-line text-brand-muted"
                      }`}
                    >
                      {isComplete ? <Check aria-hidden="true" size={14} /> : index + 1}
                    </span>
                    <span className="truncate">{label}</span>
                  </li>
                );
              })}
            </ol>

            <form
              className="min-h-[25rem] rounded border border-brand-line bg-brand-deep/70 p-5 sm:p-7"
              onSubmit={handleSubmit}
            >
              {isSubmitted ? (
                <div
                  aria-live="polite"
                  className="flex min-h-[21rem] flex-col items-start justify-center"
                  role="status"
                >
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">
                    <Check aria-hidden="true" size={24} />
                  </span>
                  <p className="eyebrow">ESTIMATE PREPARED</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-brand-white">
                    Thanks for the details.
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-brand-muted">
                    Your project summary for {email} is ready. This demo does not send or store the request.
                  </p>
                  <button
                    className="quiet-link mt-5"
                    onClick={resetEstimator}
                    type="button"
                  >
                    Start another estimate <ArrowRight aria-hidden="true" size={17} />
                  </button>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <fieldset>
                      <legend className="font-display text-xl font-semibold text-brand-white sm:text-2xl">
                        What are you planning to build?
                      </legend>
                      <p className="mb-5 mt-2 text-sm text-brand-muted">
                        Choose the project type that best fits your goal.
                      </p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {projectOptions.map((option) => {
                          const Icon = option.icon;
                          const isSelected = projectType === option.id;

                          return (
                            <label
                              className={`relative flex min-h-40 cursor-pointer flex-col rounded border p-4 transition focus-within:ring-2 focus-within:ring-brand-cyan/40 ${
                                isSelected
                                  ? "border-brand-cyan bg-brand-cyan/10"
                                  : "border-brand-line bg-brand-navy hover:border-brand-muted/60"
                              }`}
                              key={option.id}
                            >
                              <input
                                checked={isSelected}
                                className="sr-only"
                                name="project-type"
                                onChange={() => {
                                  setProjectType(option.id);
                                  setIsSubmitted(false);
                                }}
                                type="radio"
                                value={option.id}
                              />
                              <Icon aria-hidden="true" className="mb-4 text-brand-cyan" size={22} strokeWidth={1.7} />
                              <span className="text-sm font-semibold text-brand-white">{option.label}</span>
                              <span className="mt-1 text-xs leading-5 text-brand-muted">{option.description}</span>
                              {isSelected && (
                                <Check aria-hidden="true" className="absolute right-3 top-3 text-brand-cyan" size={16} />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset>
                      <legend className="font-display text-xl font-semibold text-brand-white sm:text-2xl">
                        Which features do you need?
                      </legend>
                      <p className="mb-5 mt-2 text-sm text-brand-muted">
                        Select all that apply. You can continue without add-ons.
                      </p>
                      <div className="grid gap-3">
                        {featureOptions.map((feature) => {
                          const Icon = feature.icon;
                          const isSelected = selectedFeatures.includes(feature.id);

                          return (
                            <label
                              className={`flex cursor-pointer items-start gap-4 rounded border p-4 transition focus-within:ring-2 focus-within:ring-brand-cyan/40 ${
                                isSelected
                                  ? "border-brand-cyan bg-brand-cyan/10"
                                  : "border-brand-line bg-brand-navy hover:border-brand-muted/60"
                              }`}
                              key={feature.id}
                            >
                              <input
                                checked={isSelected}
                                className="sr-only"
                                onChange={() => toggleFeature(feature.id)}
                                type="checkbox"
                              />
                              <span className="mt-0.5 text-brand-cyan">
                                <Icon aria-hidden="true" size={21} strokeWidth={1.7} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-brand-white">{feature.label}</span>
                                <span className="mt-1 block text-xs leading-5 text-brand-muted">{feature.description}</span>
                              </span>
                              <span
                                aria-hidden="true"
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                  isSelected
                                    ? "border-brand-cyan bg-brand-cyan text-brand-deep"
                                    : "border-brand-line text-transparent"
                                }`}
                              >
                                <Check size={13} strokeWidth={3} />
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-display text-xl font-semibold text-brand-white sm:text-2xl">
                        Where should we send your quote?
                      </h3>
                      <p className="mb-6 mt-2 text-sm text-brand-muted">
                        Share your email with the project summary.
                      </p>
                      <label
                        className="mb-2 block text-sm font-semibold text-brand-white"
                        htmlFor="estimate-email"
                      >
                        Work email
                      </label>
                      <div className="relative max-w-lg">
                        <Mail aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                        <input
                          autoComplete="email"
                          className="min-h-12 w-full rounded border border-brand-line bg-brand-navy pl-11 pr-4 text-base text-brand-white outline-none transition placeholder:text-brand-muted/60 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20"
                          id="estimate-email"
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@company.com"
                          required
                          type="email"
                          value={email}
                        />
                      </div>
                      <p className="mt-5 border-l-2 border-brand-cyan pl-3 text-sm leading-6 text-brand-muted">
                        Initial budget ranges are directional and may change after scope review.
                      </p>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-brand-line pt-5">
                    <button
                      className="quiet-link disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={step === 0}
                      onClick={() => setStep((current) => Math.max(0, current - 1))}
                      type="button"
                    >
                      <ArrowLeft aria-hidden="true" size={17} /> Back
                    </button>
                    {step < 2 ? (
                      <button
                        className="action-link disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={step === 0 && !projectType}
                        onClick={() => setStep((current) => Math.min(2, current + 1))}
                        type="button"
                      >
                        Continue <ArrowRight aria-hidden="true" size={17} />
                      </button>
                    ) : (
                      <button
                        className="action-link disabled:cursor-wait disabled:opacity-70"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? "Preparing quote..." : "Request a quote"}
                        <ArrowRight aria-hidden="true" size={17} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>

          <aside className="h-fit rounded border border-brand-line bg-brand-deep/70 p-5 sm:p-6 lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Live estimate
            </p>
            {estimate ? (
              <p className="mt-3 font-display text-3xl font-semibold text-brand-white sm:text-4xl">
                {formatCurrency(estimate[0])}
                <span className="mx-2 text-xl font-normal text-brand-muted">–</span>
                {formatCurrency(estimate[1])}
              </p>
            ) : (
              <p className="mt-3 font-display text-2xl font-semibold text-brand-muted">
                Choose a project type
              </p>
            )}
            <p className="mt-2 text-xs text-brand-muted">USD · preliminary range</p>

            <div className="mt-6 space-y-3 border-t border-brand-line pt-5 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-brand-muted">Project</span>
                <span className="text-right font-medium text-brand-white">
                  {selectedProject?.label ?? "Not selected"}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-brand-muted">Features</span>
                <span className="text-right font-medium text-brand-white">
                  {selectedFeatures.length === 0
                    ? "Core scope"
                    : `${selectedFeatures.length} selected`}
                </span>
              </div>
            </div>

            {selectedFeatures.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-brand-line pt-4">
                {featureOptions
                  .filter((feature) => selectedFeatures.includes(feature.id))
                  .map((feature) => (
                    <li className="flex justify-between gap-3 text-xs" key={feature.id}>
                      <span className="text-brand-muted">{feature.label}</span>
                      <span className="shrink-0 text-brand-white">
                        +{formatCurrency(feature.range[0])}–{formatCurrency(feature.range[1])}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}