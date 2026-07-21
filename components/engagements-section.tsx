import React from "react"
import portfolio from "@/data/portfolio-data.json"

export function EngagementsSection() {
  return (
    <div className="w-full">
      {/* Desktop / tablet: fixed table for consistent column alignment */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-fixed text-sm border-collapse">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>

          <thead className="bg-card/90">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-primary border-b border-border">
                Title
              </th>
              <th className="px-4 py-2 text-left font-medium text-primary border-b border-border">
                Organization
              </th>
              <th className="px-4 py-2 text-left font-medium text-primary border-b border-border">
                Description
              </th>
              <th className="px-4 py-2 text-right font-medium text-primary border-b border-border">
                Year
              </th>
            </tr>
          </thead>

          <tbody>
            {portfolio.engagements.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-transparent even:bg-background-elevated/60 hover:bg-surface-inset/80 transition"
              >
                <td className="px-4 py-3 align-top border-b border-border">
                  <div className="font-medium">{item.title}</div>
                </td>

                <td className="px-4 py-3 align-top border-b border-border">
                  <div className="text-sm text-muted-foreground">{item.organization}</div>
                </td>

                <td className="px-4 py-3 align-top border-b border-border break-words">
                  <div className="text-sm text-foreground-secondary">{item.description}</div>
                </td>

                <td className="px-4 py-3 align-top border-b border-border text-right">
                  <div className="text-sm text-muted-foreground">{item.year ?? "—"}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked compact cards for readability */}
      <div className="md:hidden space-y-3">
        {portfolio.engagements.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-md bg-card/90 border border-border"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{item.organization}</div>
              </div>
              <div className="text-sm text-muted-foreground ml-4">{item.year ?? "—"}</div>
            </div>
            <p className="mt-2 text-sm text-foreground-secondary">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
