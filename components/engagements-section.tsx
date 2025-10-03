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

          <thead className="bg-zinc-900/70">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-cyan-400 border-b border-zinc-800">
                Title
              </th>
              <th className="px-4 py-2 text-left font-medium text-cyan-400 border-b border-zinc-800">
                Organization
              </th>
              <th className="px-4 py-2 text-left font-medium text-cyan-400 border-b border-zinc-800">
                Description
              </th>
              <th className="px-4 py-2 text-right font-medium text-cyan-400 border-b border-zinc-800">
                Year
              </th>
            </tr>
          </thead>

          <tbody>
            {portfolio.engagements.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-transparent even:bg-zinc-900/50 hover:bg-zinc-800/50 transition"
              >
                <td className="px-4 py-3 align-top border-b border-zinc-800">
                  <div className="font-medium">{item.title}</div>
                </td>

                <td className="px-4 py-3 align-top border-b border-zinc-800">
                  <div className="text-sm text-zinc-400">{item.organization}</div>
                </td>

                <td className="px-4 py-3 align-top border-b border-zinc-800 break-words">
                  <div className="text-sm text-zinc-300">{item.description}</div>
                </td>

                <td className="px-4 py-3 align-top border-b border-zinc-800 text-right">
                  <div className="text-sm text-zinc-400">{item.year ?? "—"}</div>
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
            className="p-3 rounded-md bg-zinc-900/70 border border-zinc-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-zinc-400 mt-1">{item.organization}</div>
              </div>
              <div className="text-sm text-zinc-400 ml-4">{item.year ?? "—"}</div>
            </div>
            <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
