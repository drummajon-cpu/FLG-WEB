import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Text Messaging Terms & Privacy — FLG Technics",
  description:
    "FLG Technics SMS text messaging terms and privacy policy for internal operational notifications.",
};

export default function SmsPrivacyPage() {
  return (
    <main className="min-h-screen bg-ink-950 text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="font-display text-2xl md:text-3xl text-slate-100">
          FLG Technics — SMS Text Messaging Terms &amp; Privacy
        </h1>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          Last updated: June 30, 2026
        </p>

        <div className="mt-10 space-y-8 leading-relaxed text-slate-300">
          <section>
            <h2 className="text-lg text-slate-100 mb-2">1. Program description</h2>
            <p>
              FLG Technics, INC operates an internal, transactional SMS notification
              program. It sends operational alert text messages to FLG Technics
              employees who opt in — specifically mechanic performance report
              summaries and work-order AOG (Aircraft on Ground) status changes. This
              is an operational/informational program. It is{" "}
              <strong className="text-slate-100">not</strong> a marketing,
              promotional, affiliate-marketing, or lead-generation program.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">2. Consent &amp; opt-in</h2>
            <p>
              Employees opt in by entering their own mobile number and selecting the
              &ldquo;text me&rdquo; option on their report-recipient profile within
              FLG Technics&rsquo; internal administrative system. By opting in, the
              employee expressly consents to receive{" "}
              <strong className="text-slate-100">recurring</strong> SMS messages
              from FLG Technics related to the operational alerts described above.
              Consent is obtained directly by FLG Technics; no third party collects
              it, and consent is not a condition of employment or any purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">3. Message frequency</h2>
            <p>Message frequency varies based on operational activity.</p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">4. Cost</h2>
            <p>
              <strong className="text-slate-100">Message and data rates may apply</strong>,
              depending on your mobile carrier and plan.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">5. Opt-out</h2>
            <p>
              Reply <strong className="text-slate-100">STOP</strong> to any message
              to unsubscribe at any time. You will receive one confirmation message
              and then no further messages.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">6. Help</h2>
            <p>
              Reply <strong className="text-slate-100">HELP</strong> for help, or
              contact us at{" "}
              <a
                href="mailto:info@flgtechnics.com"
                className="text-accent hover:underline"
              >
                info@flgtechnics.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">
              7. Privacy — no sharing with third parties
            </h2>
            <p>
              <strong className="text-slate-100">
                FLG Technics does not sell, rent, or share mobile phone numbers, SMS
                opt-in information, or messaging consent with any third parties or
                affiliates for marketing, promotional, affiliate-marketing, or
                lead-generation purposes.
              </strong>{" "}
              Mobile information may be shared only with service providers strictly
              to deliver these messages (for example, the messaging carrier), and
              never for their own marketing. This program is not used for marketing,
              affiliate marketing, or lead generation.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">8. Data we collect</h2>
            <p>
              We collect only the employee&rsquo;s mobile number and opt-in status,
              used solely to send the operational alerts described above.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-slate-100 mb-2">9. Contact</h2>
            <p>
              FLG Technics, INC · 2701 SW 145th Ave, Ste 250, Miramar, FL 33027 ·{" "}
              <a
                href="mailto:info@flgtechnics.com"
                className="text-accent hover:underline"
              >
                info@flgtechnics.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
