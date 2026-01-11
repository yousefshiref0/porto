import { CheckCircle2, UserCheck, Radio, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

/**
 * Design System Showcase
 * 
 * This component demonstrates the complete design system for SmartAttend.
 * It's meant for developer reference and can be removed in production.
 * 
 * Design Tokens:
 * - Color Palette: Primary (Indigo), Secondary (Emerald), Accent (Orange)
 * - Spacing: 8pt grid system
 * - Border Radius: 16-24px for premium look
 * - Typography: Inter font family
 */

export function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">Design System</h1>
          <p className="text-muted-foreground">SmartAttend component library</p>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <div className="w-full h-20 bg-primary rounded-2xl" />
              <p className="text-sm text-center">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-secondary rounded-2xl" />
              <p className="text-sm text-center">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-accent rounded-2xl" />
              <p className="text-sm text-center">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-card border border-border rounded-2xl" />
              <p className="text-sm text-center">Card</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-muted rounded-2xl" />
              <p className="text-sm text-center">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-20 bg-destructive rounded-2xl" />
              <p className="text-sm text-center">Destructive</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Typography</h2>
          <div className="bg-card rounded-3xl p-6 border border-border space-y-3">
            <h1>Heading 1 - Inter Medium</h1>
            <h2>Heading 2 - Inter Medium</h2>
            <h3>Heading 3 - Inter Medium</h3>
            <p>Body text - Inter Regular</p>
            <p className="text-sm text-muted-foreground">Caption text - Muted</p>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="bg-card rounded-3xl p-6 border border-border space-y-3">
            <Button className="w-full h-14 rounded-2xl bg-primary">Primary Button</Button>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-2">Outline Button</Button>
            <Button variant="ghost" className="w-full h-14 rounded-2xl">Ghost Button</Button>
            <Button className="w-full h-14 rounded-2xl bg-destructive">Destructive Button</Button>
          </div>
        </section>

        {/* Cards & Elevation */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Cards & Elevation</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
              <p className="font-medium mb-1">Standard Card</p>
              <p className="text-sm text-muted-foreground">Subtle shadow with border</p>
            </div>
            <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
              <p className="font-medium mb-1">Elevated Card</p>
              <p className="text-sm text-muted-foreground">Larger shadow, 24px radius</p>
            </div>
          </div>
        </section>

        {/* Icons & Status Indicators */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Status Indicators</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <UserCheck className="w-7 h-7 text-secondary" />
              </div>
              <p className="text-sm font-medium">Present</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
              <p className="text-sm font-medium">Absent</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Radio className="w-7 h-7 text-accent" />
              </div>
              <p className="text-sm font-medium">Scanning</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-medium">Analytics</p>
            </div>
          </div>
        </section>

        {/* Spacing System */}
        <section>
          <h2 className="text-xl font-semibold mb-4">8pt Spacing System</h2>
          <div className="bg-card rounded-3xl p-6 border border-border">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary" />
                <span className="text-sm">2px - Minimal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary" />
                <span className="text-sm">4px - Extra Small</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded" />
                <span className="text-sm">8px - Small</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg" />
                <span className="text-sm">16px - Medium</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-primary rounded-xl" />
                <span className="text-sm">24px - Large</span>
              </div>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Border Radius Scale</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary h-20 rounded-lg flex items-center justify-center text-white">
              <span className="text-sm">12px - lg</span>
            </div>
            <div className="bg-primary h-20 rounded-xl flex items-center justify-center text-white">
              <span className="text-sm">16px - xl</span>
            </div>
            <div className="bg-primary h-20 rounded-2xl flex items-center justify-center text-white">
              <span className="text-sm">20px - 2xl</span>
            </div>
            <div className="bg-primary h-20 rounded-3xl flex items-center justify-center text-white">
              <span className="text-sm">24px - 3xl</span>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Badges & Labels</h2>
          <div className="bg-card rounded-3xl p-6 border border-border flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-xl text-sm">Present</span>
            <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-xl text-sm">Absent</span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-xl text-sm">Duplicate</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-sm">Active</span>
            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-xl text-sm">Inactive</span>
          </div>
        </section>
      </div>
    </div>
  );
}
