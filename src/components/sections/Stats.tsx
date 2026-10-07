import { stats } from "../../data/stats";
import { Stagger, StaggerItem } from "../motion/Stagger";
import CountUp from "../motion/CountUp";

export default function Stats() {
  return (
    <section aria-label="Studio highlights" className="px-3 sm:px-4">
      <div className="rounded-card-lg bg-ink py-16 text-cream sm:py-20">
        <div className="container-x">
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.id} className="border-t border-cream/15 pt-6">
                <CountUp
                  to={s.value}
                  suffix={s.suffix}
                  className="block font-serif text-display-lg tracking-display"
                />
                <p className="mt-2 max-w-[14rem] text-sm text-cream/65">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
