import { AppSidebar } from "@/components/app-sidebar"
import { CriticalBanner } from "@/components/critical-banner"
import { GlobalSearch } from "@/components/global-search"
import { UrgencyCards } from "@/components/urgency-cards"
import { StatusBar } from "@/components/status-bar"
import { DeadlinesTimeline } from "@/components/deadlines-timeline"
import { ActivityFeed } from "@/components/activity-feed"
import { InactiveCasesAlert } from "@/components/inactive-cases-alert"
import { QuickActions } from "@/components/quick-actions"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// Mock data - in real app this would come from the database
const mockData = {
  criticalDeadline: {
    id: "1",
    caseName: "Sentencia García vs. Ayuntamiento",
    status: "plazo vencido hace 2 días",
    asuntoId: "asunto-1",
  },
  urgencyCounts: {
    today: 3,
    next48h: 7,
    thisWeek: 12,
    pendingTasks: 8,
  },
  statusStats: {
    activeAsuntos: 24,
    urgent: 3,
    pendingTasks: 8,
    inactive30Days: 2,
  },
}

export default function OverviewPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        {/* 1. Critical Banner - sticky at top */}
        <CriticalBanner deadline={mockData.criticalDeadline} />
        
        <SiteHeader title="Resumen" />
        
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-5 py-5">
            {/* 2. Global Search */}
            <GlobalSearch />
            
            {/* 3. Urgency Cards Row */}
            <UrgencyCards data={mockData.urgencyCounts} />
            
            {/* 4. Status Bar */}
            <StatusBar stats={mockData.statusStats} />
            
            {/* 5. Main Content Grid - 60/40 split */}
            <div className="grid gap-5 px-4 lg:grid-cols-5 lg:px-6">
              {/* Left Column - Deadlines Timeline (60%) */}
              <div className="lg:col-span-3">
                <DeadlinesTimeline />
              </div>
              
              {/* Right Column - Activity Feed (40%) */}
              <div className="lg:col-span-2">
                <ActivityFeed />
              </div>
            </div>
            
            {/* 6. Inactive Cases Alert */}
            <InactiveCasesAlert />
            
            {/* 7. Quick Actions */}
            <QuickActions />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
