import type { ReactNode } from "react";
import { Bell, Check, FileText, GitBranch, Layers, MessageCircle, Rocket, ShoppingCart, Workflow } from "lucide-react";

function Panel({ title, note, badge, children }: { title: string; note: string; badge?: string; children: ReactNode }) {
  return (
    <div className="glass w-[19rem] shrink-0 rounded-2xl p-5 text-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-medium">{title}</p>
          <p className="mt-0.5 text-xs text-white/55">{note}</p>
        </div>
        {badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[0.65rem] font-semibold">
            <span className="size-1.5 rounded-full bg-white" />
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Row({ icon, label, meta, done = true }: { icon: ReactNode; label: string; meta: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.07] p-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white/80">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{label}</span>
        <span className="block text-[0.7rem] text-white/50">{meta}</span>
      </span>
      <span className={`grid size-5 shrink-0 place-items-center rounded-full ${done ? "bg-brand" : "border border-white/30"}`}>{done && <Check className="size-3" strokeWidth={3} />}</span>
    </div>
  );
}

const icon = "size-4";

/** The set of product-style panels shown along the bottom of the home hero. */
function Panels() {
  return (
    <>
      <Panel title="Delivery pipeline" note="Runs on every release" badge="Live">
        <div className="space-y-2">
          <Row icon={<GitBranch className={icon} />} label="Code review" meta="Approved" />
          <Row icon={<Layers className={icon} />} label="Automated tests" meta="All passing" />
          <Row icon={<Rocket className={icon} />} label="Deploy to production" meta="In progress" done={false} />
        </div>
      </Panel>

      <Panel title="API monitor" note="orders-service">
        <div className="space-y-2 font-mono text-xs">
          {[
            ["GET", "/api/orders", "200"],
            ["POST", "/api/invoices", "201"],
            ["GET", "/api/customers", "200"],
            ["PATCH", "/api/stock", "200"],
          ].map(([method, path, status]) => (
            <div key={path} className="flex items-center justify-between rounded-lg bg-white/[0.07] px-3 py-2.5">
              <span>
                <span className="mr-2 font-semibold text-brand">{method}</span>
                <span className="text-white/75">{path}</span>
              </span>
              <span className="text-white/50">{status}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Operations dashboard" note="This week">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white p-3 text-ink">
            <p className="text-[0.65rem] text-muted">Orders</p>
            <p className="font-display text-xl font-medium">Up</p>
          </div>
          <div className="rounded-xl bg-white/[0.07] p-3">
            <p className="text-[0.65rem] text-white/50">Manual steps</p>
            <p className="font-display text-xl font-medium">Down</p>
          </div>
        </div>
        <div className="mt-2 flex h-[5.4rem] items-end gap-1.5 rounded-xl bg-white/[0.07] p-3">
          {[34, 48, 42, 60, 54, 76, 68, 92].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-sm ${i === 7 ? "bg-brand" : "bg-white/25"}`} />
          ))}
        </div>
      </Panel>

      <Panel title="Order automation" note="No manual entry" badge="Running">
        <div className="space-y-2">
          <Row icon={<ShoppingCart className={icon} />} label="New order received" meta="Trigger" />
          <Row icon={<FileText className={icon} />} label="Invoice generated" meta="Automatic" />
          <Row icon={<MessageCircle className={icon} />} label="Customer notified" meta="WhatsApp" />
        </div>
      </Panel>

      <Panel title="Connected systems" note="One source of truth">
        <div className="relative grid h-[10.6rem] place-items-center rounded-xl bg-white/[0.07]">
          <span className="absolute size-28 rounded-full border border-dashed border-white/20" />
          <span className="grid size-12 place-items-center rounded-full bg-brand">
            <Workflow className="size-5" />
          </span>
          {[
            ["left-5 top-4", <FileText key="a" className={icon} />],
            ["right-5 top-4", <ShoppingCart key="b" className={icon} />],
            ["left-5 bottom-4", <Bell key="c" className={icon} />],
            ["right-5 bottom-4", <MessageCircle key="d" className={icon} />],
          ].map(([pos, node], i) => (
            <span key={i} className={`absolute grid size-9 place-items-center rounded-lg bg-white/10 text-white/80 ${pos}`}>
              {node}
            </span>
          ))}
        </div>
      </Panel>
    </>
  );
}

/** A slow, continuous strip of panels. The second copy makes the loop seamless and is hidden from assistive tech. */
export function HeroPanels() {
  return (
    <div aria-hidden className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="flex w-max animate-marquee gap-4 pr-4 hover:[animation-play-state:paused]">
        <Panels />
        <Panels />
      </div>
    </div>
  );
}
