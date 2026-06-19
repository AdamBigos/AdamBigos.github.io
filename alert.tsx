import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TEAL = "#188665";
const FONT_FAMILY = '"Aptos", "Segoe UI", Arial, sans-serif';
const MONO_FONT_FAMILY = '"Cascadia Mono", "Consolas", monospace';

const TABLE_WIDTH = 600;
const LEFT_COL_WIDTH = 190;
const RIGHT_COL_WIDTH = TABLE_WIDTH - LEFT_COL_WIDTH;
const STATUS_COL_WIDTH = Math.floor(RIGHT_COL_WIDTH / 2);
const PRIORITY_COL_WIDTH = RIGHT_COL_WIDTH - STATUS_COL_WIDTH;
const BORDER_WIDTH = 1;

const ROWS = [
  { key: "status", label: "Status Awarii", height: 29 },
  { key: "app", label: "Aplikacja/Usługa", height: 29 },
  { key: "description", label: "Opis incydentu\\Aktualny stan", height: 121 },
  { key: "leader", label: "IT Tribe Leader", height: 29 },
  { key: "team", label: "Zespół zaangażowany w rozwiązanie incydentu", height: 40 },
  { key: "otherTeams", label: "Inne zespoły zaangażowane w rozwiązanie incydentu", height: 40 },
  { key: "nextComm", label: "Następna komunikacja", height: 29 },
  { key: "ticket", label: "Numer zarejestrowanego incydentu w Service Now", height: 40 },
  { key: "pir", label: "PIR [Y/N]", height: 29 },
] as const;

const TABLE_HEIGHT = ROWS.reduce((sum, row) => sum + row.height, 0);

const cellBorder = { border: `1px solid ${TEAL}` };
const headerCellStyle: React.CSSProperties = {
  ...cellBorder,
  backgroundColor: TEAL,
  color: "white",
  fontWeight: 700,
  padding: "4px 8px",
  verticalAlign: "middle",
  width: "190px",
  fontSize: "12px",
  fontFamily: FONT_FAMILY,
  lineHeight: 1.3,
  height: "29px",
};
const dataCellStyle: React.CSSProperties = {
  ...cellBorder,
  padding: 0,
  verticalAlign: "middle",
  backgroundColor: "white",
  fontSize: "12px",
  fontFamily: FONT_FAMILY,
};

const flushInput =
  "border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-7 w-full bg-transparent px-2 py-1 text-[12px] leading-normal";
const flushTrigger =
  "border-0 shadow-none focus:ring-0 focus:ring-offset-0 rounded-none h-7 w-full px-2 py-1 text-[12px] leading-normal";
const centerTrigger = `${flushTrigger} justify-center`;

type FormState = {
  status: string;
  priorityLevel: string;
  app: string;
  description: string;
  leader: string;
  team: string;
  otherTeams: string;
  nextComm: string;
  ticket: string;
  pir: string;
};

const initial: FormState = {
  status: "",
  priorityLevel: "",
  app: "",
  description: "",
  leader: "",
  team: "",
  otherTeams: "",
  nextComm: "W momencie otrzymania aktualizacji",
  ticket: "TBD",
  pir: "NIE",
};

const tribeLeaderMap: Record<string, string> = {
  "OMR/EL/xRDJ/IKS": "Joanna Ostrowska-Szajnfeld, Krzysztof Król",
  "Register DataHub": "Krzysztof Król, Dariusz Flisiak",
  "Poczta Outlook": "Krzysztof Król",
  GOdealer: "Joanna Ostrowska-Szajnfeld, Krzysztof Król",
};

const APP_OPTIONS = ["OMR/EL/xRDJ/IKS", "Register DataHub", "Poczta Outlook", "GOdealer"];

function getStatusColor(status: string): string {
  if (status === "ROZWIĄZANY") return "#22c55e";
  if (status === "W TRAKCIE") return "#ef4444";
  return "#000000";
}

function getPriorityStyle(priorityLevel: string): { backgroundColor: string; color: string } {
  if (priorityLevel === "KRYTYCZNY - P1") return { backgroundColor: "#000000", color: "#ffffff" };
  if (priorityLevel === "ZNACZĄCY - P2") return { backgroundColor: "#ef4444", color: "#000000" };
  if (priorityLevel === "ZWYCZAJNY - P3") return { backgroundColor: "#facc15", color: "#000000" };
  return { backgroundColor: "white", color: "inherit" };
}

const ROW_HEIGHT = 28;
const DESC_HEIGHT = ROWS[2].height;

type TextOptions = {
  font?: string;
  color?: string;
  align?: CanvasTextAlign;
  paddingX?: number;
  lineHeight?: number;
  maxLines?: number;
};

function normalizeDescription(description: string) {
  if (!description.trim()) return "";
  return description.trimStart().startsWith("•") ? description : `• ${description}`;
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const wrapped: string[] = [];
  const paragraphs = text.split("\n");

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(" ");
    let line = "";

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        wrapped.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });

    wrapped.push(line || "");
  });

  return wrapped;
}

function drawCenteredLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
  options: TextOptions = {},
) {
  const {
    font = `400 12px ${FONT_FAMILY}`,
    color = "#000000",
    align = "left",
    paddingX = 8,
    lineHeight = 16,
    maxLines,
  } = options;
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";

  const rawLines = wrapCanvasText(ctx, text || "\u00A0", width - paddingX * 2);
  const lines = maxLines ? rawLines.slice(0, maxLines) : rawLines;
  const metrics = ctx.measureText("Mg");
  const ascent = metrics.actualBoundingBoxAscent || 9;
  const descent = metrics.actualBoundingBoxDescent || 3;
  const blockHeight = lines.length * lineHeight;
  const firstLineCenter = y + (height - blockHeight) / 2 + lineHeight / 2;
  const baselineOffset = (ascent - descent) / 2;
  const textX = align === "center" ? x + width / 2 : x + paddingX;

  lines.forEach((line, index) => {
    ctx.fillText(line, textX, firstLineCenter + baselineOffset + index * lineHeight);
  });

  ctx.restore();
}

function fillCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, height);
}

function drawGridLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  ctx.fillStyle = TEAL;
  ctx.fillRect(x, y, width, height);
}

function CloneCell({
  value,
  placeholder = "",
  height = ROW_HEIGHT,
  multiline = false,
  align = "left",
  bg = "#ffffff",
  color = "#000000",
  bold = false,
}: {
  value: string;
  placeholder?: string;
  height?: number;
  multiline?: boolean;
  align?: "left" | "center";
  bg?: string;
  color?: string;
  bold?: boolean;
}) {
  return (
    <div
      style={{
        display: "table-cell",
        verticalAlign: "middle",
        width: "100%",
        height: `${height}px`,
        padding: "0 8px",
        backgroundColor: bg,
        color,
        textAlign: align,
        fontFamily: multiline ? MONO_FONT_FAMILY : FONT_FAMILY,
        fontSize: "12px",
        fontWeight: bold ? 700 : 400,
        lineHeight: multiline ? "17px" : `${height}px`,
        whiteSpace: multiline ? "pre-wrap" : "normal",
        boxSizing: "border-box",
      }}
    >
      {value || placeholder || "\u00A0"}
    </div>
  );
}

export function IncidentReport() {
  const [data, setData] = useState<FormState>(initial);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const exportPng = async () => {
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = TABLE_WIDTH * scale;
    canvas.height = TABLE_HEIGHT * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scale, scale);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

    let y = 0;
    ROWS.forEach((row) => {
      fillCell(ctx, 0, y, LEFT_COL_WIDTH, row.height, TEAL);
      fillCell(ctx, LEFT_COL_WIDTH, y, RIGHT_COL_WIDTH, row.height, "#ffffff");

      if (row.key === "status") {
        fillCell(ctx, LEFT_COL_WIDTH, y, STATUS_COL_WIDTH, row.height, "#ffffff");
        fillCell(
          ctx,
          LEFT_COL_WIDTH + STATUS_COL_WIDTH,
          y,
          PRIORITY_COL_WIDTH,
          row.height,
          priorityStyle.backgroundColor,
        );
      }

      y += row.height;
    });

    y = 0;
    ROWS.forEach((row) => {
      drawGridLine(ctx, 0, y, TABLE_WIDTH, BORDER_WIDTH);
      drawGridLine(ctx, 0, y, BORDER_WIDTH, row.height);
      drawGridLine(ctx, LEFT_COL_WIDTH, y, BORDER_WIDTH, row.height);
      drawGridLine(ctx, TABLE_WIDTH - BORDER_WIDTH, y, BORDER_WIDTH, row.height);

      if (row.key === "status") {
        drawGridLine(ctx, LEFT_COL_WIDTH + STATUS_COL_WIDTH, y, BORDER_WIDTH, row.height);
      }

      y += row.height;
    });
    drawGridLine(ctx, 0, TABLE_HEIGHT - BORDER_WIDTH, TABLE_WIDTH, BORDER_WIDTH);

    y = 0;
    ROWS.forEach((row) => {
      drawCenteredLines(ctx, row.label, 0, y, LEFT_COL_WIDTH, row.height, {
        font: `700 12px ${FONT_FAMILY}`,
        color: "#ffffff",
        lineHeight: 16,
        paddingX: 8,
      });

      const rightX = LEFT_COL_WIDTH;
      if (row.key === "status") {
        drawCenteredLines(ctx, data.status || "Wybierz status", rightX, y, STATUS_COL_WIDTH, row.height, {
          font: `700 12px ${FONT_FAMILY}`,
          color: statusColor,
          align: "center",
          lineHeight: 14,
        });
        drawCenteredLines(
          ctx,
          data.priorityLevel || "Wybierz priorytet",
          rightX + STATUS_COL_WIDTH,
          y,
          PRIORITY_COL_WIDTH,
          row.height,
          {
            font: `700 12px ${FONT_FAMILY}`,
            color: priorityStyle.color === "inherit" ? "#000000" : priorityStyle.color,
            align: "center",
            lineHeight: 14,
            paddingX: 4,
          },
        );
      } else if (row.key === "app") {
        drawCenteredLines(ctx, data.app || "Wybierz aplikację", rightX, y, RIGHT_COL_WIDTH, row.height, {
          font: `700 12px ${FONT_FAMILY}`,
          color: "#1e3a8a",
          lineHeight: 14,
        });
      } else if (row.key === "description") {
        drawCenteredLines(
          ctx,
          normalizeDescription(data.description) || "• 10:00 — wykryto problem\n• 10:15 — eskalacja\n...",
          rightX,
          y,
          RIGHT_COL_WIDTH,
          row.height,
          {
            font: `400 12px ${MONO_FONT_FAMILY}`,
            color: "#000000",
            lineHeight: 17,
          },
        );
      } else {
        const valueByKey: Record<keyof FormState, string> = {
          status: data.status,
          priorityLevel: data.priorityLevel,
          app: data.app,
          description: data.description,
          leader: data.leader || "Imię i nazwisko",
          team: data.team,
          otherTeams: data.otherTeams,
          nextComm: data.nextComm || "Wybierz",
          ticket: data.ticket,
          pir: data.pir || "Wybierz",
        };
        drawCenteredLines(ctx, valueByKey[row.key], rightX, y, RIGHT_COL_WIDTH, row.height, {
          font: `400 12px ${FONT_FAMILY}`,
          color: "#000000",
          lineHeight: 14,
        });
      }

      y += row.height;
    });

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `incident-report-${Date.now()}.png`;
    a.click();
  };

  const sendEmail = () => {
    const lines = [
      `Status Awarii: ${data.status} | ${data.priorityLevel}`,
      `Aplikacja/Usługa: ${data.app}`,
      ``,
      `Opis incydentu / Aktualny stan:`,
      data.description || "-",
      ``,
      `IT Tribe Leader: ${data.leader}`,
      `Zespół zaangażowany w rozwiązanie incydentu: ${data.team}`,
      `Inne zespoły zaangażowane w rozwiązanie incydentu: ${data.otherTeams}`,
      `Następna komunikacja: ${data.nextComm}`,
      `Numer zarejestrowanego incydentu w Service Now: ${data.ticket}`,
      `PIR [Y/N]: ${data.pir}`,
    ];
    const subject = `Incident Report: ${data.app || "—"} - ${data.status || "—"}`;
    const body = lines.join("\n");
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const statusColor = getStatusColor(data.status);
  const priorityStyle = getPriorityStyle(data.priorityLevel);

  const renderTable = (mode: "live" | "clone") => (
    <table
      style={{
        borderCollapse: "collapse",
        width: "600px",
        tableLayout: "fixed",
        fontFamily: FONT_FAMILY,
      }}
    >
      <colgroup>
        <col style={{ width: "190px" }} />
        <col style={{ width: "410px" }} />
      </colgroup>
      <tbody>
        <tr>
          <td style={headerCellStyle}>Status Awarii</td>
          <td style={{ ...dataCellStyle, padding: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ borderRight: `1px solid ${TEAL}` }}>
                {mode === "clone" ? (
                  <CloneCell
                    value={data.status}
                    placeholder="Wybierz status"
                    align="center"
                    color={statusColor}
                    bold
                  />
                ) : (
                  <Select value={data.status} onValueChange={(v) => set("status", v)}>
                    <SelectTrigger
                      className={centerTrigger}
                      style={{ backgroundColor: "white", color: statusColor, fontWeight: 700 }}
                    >
                      <SelectValue placeholder="Wybierz status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ROZWIĄZANY">ROZWIĄZANY</SelectItem>
                      <SelectItem value="W TRAKCIE">W TRAKCIE</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                {mode === "clone" ? (
                  <CloneCell
                    value={data.priorityLevel}
                    placeholder="Wybierz priorytet"
                    align="center"
                    bg={priorityStyle.backgroundColor}
                    color={priorityStyle.color}
                    bold
                  />
                ) : (
                  <Select
                    value={data.priorityLevel}
                    onValueChange={(v) => set("priorityLevel", v)}
                  >
                    <SelectTrigger
                      className={centerTrigger}
                      style={{
                        backgroundColor: priorityStyle.backgroundColor,
                        color: priorityStyle.color,
                        fontWeight: 700,
                      }}
                    >
                      <SelectValue placeholder="Wybierz priorytet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KRYTYCZNY - P1">KRYTYCZNY - P1</SelectItem>
                      <SelectItem value="ZNACZĄCY - P2">ZNACZĄCY - P2</SelectItem>
                      <SelectItem value="ZWYCZAJNY - P3">ZWYCZAJNY - P3</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>Aplikacja/Usługa</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell value={data.app} placeholder="Wybierz aplikację" color="#1e3a8a" bold />
            ) : (
              <>
                <input
                  type="text"
                  list="app-options"
                  value={data.app}
                  onChange={(e) => {
                    const v = e.target.value;
                    set("app", v);
                    if (tribeLeaderMap[v]) set("leader", tribeLeaderMap[v]);
                  }}
                  placeholder="Wybierz lub wpisz aplikację"
                  className={flushInput}
                  style={{ backgroundColor: "white", color: "#1e3a8a", fontWeight: 700 }}
                />
                <datalist id="app-options">
                  {APP_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </>
            )}
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>{"Opis incydentu\\Aktualny stan"}</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell
                value={data.description}
                placeholder={"• 10:00 — wykryto problem\n• 10:15 — eskalacja\n..."}
                height={DESC_HEIGHT}
                multiline
                align="left"
              />
            ) : (
              <Textarea
                value={data.description}
                onChange={(e) => set("description", e.target.value)}
                onFocus={() => {
                  if (!data.description) set("description", "• ");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const target = e.currentTarget;
                    const start = target.selectionStart ?? data.description.length;
                    const end = target.selectionEnd ?? data.description.length;
                    const next =
                      data.description.slice(0, start) + "\n• " + data.description.slice(end);
                    set("description", next);
                    requestAnimationFrame(() => {
                      target.selectionStart = target.selectionEnd = start + 3;
                    });
                  }
                }}
                placeholder={"• 10:00 — wykryto problem\n• 10:15 — eskalacja\n..."}
                className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full bg-transparent px-2 py-1 min-h-[120px] font-mono text-[12px] leading-normal"
              />
            )}
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>IT Tribe Leader</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell value={data.leader} placeholder="Imię i nazwisko" />
            ) : (
              <Input
                value={data.leader}
                onChange={(e) => set("leader", e.target.value)}
                className={flushInput}
                placeholder="Imię i nazwisko"
              />
            )}
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>Zespół zaangażowany w rozwiązanie incydentu</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell value={data.team} />
            ) : (
              <Input
                value={data.team}
                onChange={(e) => set("team", e.target.value)}
                className={flushInput}
              />
            )}
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>Inne zespoły zaangażowane w rozwiązanie incydentu</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell value={data.otherTeams} />
            ) : (
              <Input
                value={data.otherTeams}
                onChange={(e) => set("otherTeams", e.target.value)}
                className={flushInput}
              />
            )}
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>Następna komunikacja</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell value={data.nextComm} placeholder="Wybierz" />
            ) : (
              <Select value={data.nextComm} onValueChange={(v) => set("nextComm", v)}>
                <SelectTrigger className={flushTrigger} style={{ backgroundColor: "white" }}>
                  <SelectValue placeholder="Wybierz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="W momencie otrzymania aktualizacji">
                    W momencie otrzymania aktualizacji
                  </SelectItem>
                  <SelectItem value="NIE">NIE</SelectItem>
                </SelectContent>
              </Select>
            )}
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>Numer zarejestrowanego incydentu w Service Now</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell value={data.ticket} />
            ) : (
              <Input
                value={data.ticket}
                onChange={(e) => set("ticket", e.target.value)}
                className={flushInput}
              />
            )}
          </td>
        </tr>

        <tr>
          <td style={headerCellStyle}>PIR [Y/N]</td>
          <td style={dataCellStyle}>
            {mode === "clone" ? (
              <CloneCell value={data.pir} placeholder="Wybierz" />
            ) : (
              <Select value={data.pir} onValueChange={(v) => set("pir", v)}>
                <SelectTrigger className={flushTrigger} style={{ backgroundColor: "white" }}>
                  <SelectValue placeholder="Wybierz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TAK">TAK</SelectItem>
                  <SelectItem value="NIE">NIE</SelectItem>
                </SelectContent>
              </Select>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold" style={{ color: TEAL }}>
        Powiadomienie o Awarii
      </h1>

      {/* Live, interactive table */}
      <div className="bg-white w-fit">{renderTable("live")}</div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={exportPng} style={{ backgroundColor: TEAL, color: "white" }}>
          Eksportuj do PNG
        </Button>
        <Button onClick={sendEmail} variant="outline" style={{ borderColor: TEAL, color: TEAL }}>
          Wyślij e-mailem
        </Button>
      </div>
    </div>
  );
}
