import Reveal from "../ui/Reveal";
import LiquidButton from "../ui/LiquidButton";
import { contactFormUrl, profile } from "../../data/site";

export default function CtaBand() {
  return (
    <Reveal as="section" className="mt-40">
      <div className="glass-strong relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-drift rounded-full bg-ion/20 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 animate-drift-slow rounded-full bg-nebula/20 blur-3xl"
        />

        <p className="eyebrow">{profile.status}</p>
        <h2 className="mx-auto mt-6 max-w-2xl text-title font-semibold text-gradient">
          Have something that needs building properly?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lead text-dust">
          Tell me what you are working on. I read every message and reply to all of them.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LiquidButton href={contactFormUrl} external>
            Send a message
          </LiquidButton>
        </div>
      </div>
    </Reveal>
  );
}
