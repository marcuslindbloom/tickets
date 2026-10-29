// What a merged ticket turned out to hold: one problem per fix. Pages explain it; this file is what runs.
import { causeOf, type Report, type Tenant } from '#lib/kb/causes';

// `parser` and `hint` come from causes.ts. `shift` is a report the desk read as a one-day move
// (desk-notes.json): not a swap, so neither the parser fix nor the hint fix touches it.
export type Problem = 'parser' | 'hint' | 'shift';
export const PROBLEMS: readonly Problem[] = ['parser', 'hint', 'shift'];

export function problemOf(r: Report, t: Tenant | undefined, oneDayMove: readonly string[]): Problem | null {
  if (oneDayMove.includes(r.id)) return 'shift';
  return causeOf(r, t);
}

export type ProblemGroup = {
  problem: Problem | 'unplaced';
  reports: Report[];
  tenants: number;
  firstSeen: string;
  lastSeen: string;
};

export function groupByProblem(
  reports: Report[],
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): ProblemGroup[] {
  const byProblem = new Map<ProblemGroup['problem'], Report[]>();
  for (const r of reports) {
    const problem = problemOf(r, tenantOf(r), oneDayMove) ?? 'unplaced';
    byProblem.set(problem, [...(byProblem.get(problem) ?? []), r]);
  }
  return [...byProblem.entries()]
    .map(([problem, rs]) => {
      const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
      return {
        problem,
        reports: rs,
        tenants: new Set(rs.map((r) => r.tenant)).size,
        firstSeen: days[0],
        lastSeen: days[days.length - 1],
      };
    })
    .sort((a, b) => b.reports.length - a.reports.length);
}
