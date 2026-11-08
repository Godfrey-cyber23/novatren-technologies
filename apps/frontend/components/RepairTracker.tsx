"use client";

import { useState, type FormEvent } from "react";
import { Check, CircleDot, LoaderCircle, Search, Wrench } from "lucide-react";

type RepairStatus =
  | "DIAGNOSING"
  | "AWAITING_PARTS"
  | "IN_REPAIR"
  | "READY_FOR_PICKUP";

interface RepairRecord {
  ticketNumber: string;
  phoneNumber: string;
  device: string;
  status: RepairStatus;
  lastUpdate: string;
  estimatedCompletion: string;
}

const steps: { label: string; status: RepairStatus }[] = [
  { label: "Diagnosing", status: "DIAGNOSING" },
  { label: "Awaiting Parts", status: "AWAITING_PARTS" },
  { label: "In Repair", status: "IN_REPAIR" },
  { label: "Ready for Pickup", status: "READY_FOR_PICKUP" },
];

const mockRepairs: RepairRecord[] = [
  {
    ticketNumber: "NT-2048",
    phoneNumber: "2025550147",
    device: "MacBook Pro 14-inch",
    status: "IN_REPAIR",
    lastUpdate: "Today, 10:42 AM",
    estimatedCompletion: "Within 2 business days",
  },
  {
    ticketNumber: "NT-2051",
    phoneNumber: "2025550192",
    device: "iPhone 15 Pro",
    status: "AWAITING_PARTS",
    lastUpdate: "Yesterday, 3:18 PM",
    estimatedCompletion: "Parts arrival pending",
  },
  {
    ticketNumber: "NT-2039",
    phoneNumber: "2025550164",
    device: "Dell XPS 13",
    status: "READY_FOR_PICKUP",
    lastUpdate: "Today, 9:05 AM",
    estimatedCompletion: "Ready now",
  },
  {
    ticketNumber: "NT-2057",
    phoneNumber: "2025550181",
    device: "iPad Air",
    status: "DIAGNOSING",
    lastUpdate: "Today, 11:20 AM",
    estimatedCompletion: "Estimate after diagnosis",
  },
];

function fetchMockRepair(identifier: string): Promise<RepairRecord | null> {
  const searchValue = identifier.trim();
  const isPhoneNumber = !/[a-z]/i.test(searchValue);
  const normalizedValue = searchValue.replace(/\D/g, "");
  const phoneLookupValue =
    normalizedValue.length === 11 && normalizedValue.startsWith("1")
      ? normalizedValue.slice(1)
      : normalizedValue;

  return new Promise((resolve) => {
    window.setTimeout(() => {
      const repair = mockRepairs.find((item) =>
        isPhoneNumber
          ? item.phoneNumber === phoneLookupValue
          : item.ticketNumber.toLowerCase() === searchValue.toLowerCase(),
      );
      resolve(repair ?? null);
    }, 450);
  });
}

export default function RepairTracker() {
  const [query, setQuery] = useState("");
  const [repair, setRepair] = useState<RepairRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setRepair(null);
    setIsLoading(true);

    try {
      const match = await fetchMockRepair(query);
      if (match) {
        setRepair(match);
      } else {
        setErrorMessage("No repair matched that ticket ID or phone number.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const activeStep = repair
    ? steps.findIndex((step) => step.status === repair.status)
    : -1;

  return (
    <section className="section-rule utility-section" id="tracker">
      <div className="page-shell">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">HARDWARE REPAIR TRACKER</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-normal text-brand-white sm:text-4xl">
            Know where your repair stands.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-brand-muted sm:text-base">
            Check the latest service update and see what comes next.
          </p>
        </div>

        <div className="overflow-hidden rounded border border-brand-line bg-brand-deep/70">
          <form
            className="grid gap-4 border-b border-brand-line p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:p-7"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-brand-white"
                htmlFor="repair-lookup"
              >
                Ticket ID or Phone Number
              </label>
              <input
                autoComplete="off"
                className="min-h-12 w-full rounded border border-brand-line bg-brand-navy px-4 text-base text-brand-white outline-none transition placeholder:text-brand-muted/60 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20"
                id="repair-lookup"
                name="repair-lookup"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="NT-2048 or 2025550147"
                required
                type="search"
                value={query}
              />
              <p className="mt-2 text-xs text-brand-muted">
                Demo lookup: NT-2048 or 2025550147
              </p>
            </div>
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-brand-cyan px-5 font-semibold text-brand-deep transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan disabled:cursor-wait disabled:opacity-70"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
              ) : (
                <Search aria-hidden="true" size={18} />
              )}
              {isLoading ? "Searching" : "Find repair"}
            </button>
          </form>

          <div aria-live="polite" className="p-5 sm:p-7">
            {errorMessage && (
              <p className="rounded border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100" role="alert">
                {errorMessage}
              </p>
            )}

            {repair && (
              <div>
                <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                      Repair ticket
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-brand-white">
                      {repair.ticketNumber}
                    </h3>
                    <p className="mt-1 text-sm text-brand-muted">{repair.device}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1.5 text-sm font-semibold text-brand-cyan">
                    <Wrench aria-hidden="true" size={15} />
                    {steps[activeStep]?.label}
                  </div>
                </div>

                <ol
                  aria-label="Repair progress"
                  className="grid grid-cols-4 gap-1"
                >
                  {steps.map((step, index) => {
                    const isComplete = index < activeStep;
                    const isCurrent = index === activeStep;

                    return (
                      <li
                        aria-current={isCurrent ? "step" : undefined}
                        className="relative flex min-w-0 flex-col items-center text-center"
                        key={step.status}
                      >
                        {index < steps.length - 1 && (
                          <span
                            aria-hidden="true"
                            className={`absolute left-1/2 top-5 h-px w-full ${
                              isComplete ? "bg-brand-cyan" : "bg-brand-line"
                            }`}
                          />
                        )}
                        <span
                          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border ${
                            isComplete
                              ? "border-brand-cyan bg-brand-cyan text-brand-deep"
                              : isCurrent
                                ? "border-brand-cyan bg-brand-navy text-brand-cyan shadow-glow"
                                : "border-brand-line bg-brand-navy text-brand-muted"
                          }`}
                        >
                          {isComplete ? (
                            <Check aria-hidden="true" size={18} strokeWidth={2.5} />
                          ) : isCurrent ? (
                            <CircleDot aria-hidden="true" size={18} />
                          ) : (
                            <span className="text-xs font-semibold">{index + 1}</span>
                          )}
                        </span>
                        <span
                          className={`mt-3 max-w-24 text-[11px] leading-4 sm:max-w-none sm:text-xs ${
                            isComplete || isCurrent
                              ? "font-semibold text-brand-white"
                              : "text-brand-muted"
                          }`}
                        >
                          {step.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-8 grid gap-4 border-t border-brand-line pt-5 text-sm sm:grid-cols-2">
                  <p className="text-brand-muted">
                    Last update <span className="ml-2 font-medium text-brand-white">{repair.lastUpdate}</span>
                  </p>
                  <p className="text-brand-muted sm:text-right">
                    Estimated completion <span className="ml-2 font-medium text-brand-white">{repair.estimatedCompletion}</span>
                  </p>
                </div>
              </div>
            )}

            {!repair && !errorMessage && !isLoading && (
              <p className="flex items-center gap-2 text-sm text-brand-muted">
                <CircleDot aria-hidden="true" className="text-brand-cyan" size={16} />
                Enter a ticket ID or phone number to view repair progress.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}